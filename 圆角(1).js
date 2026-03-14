(function(Scratch) {
    'use strict';
    
    class VisualCenterCrop {
        constructor() {
            this.roleX = 0;
            this.roleY = 0;
            this.imageCache = new Map(); // 图片尺寸缓存
            this.svgCache = new Map(); // SVG缓存
            this.loadingQueue = new Map(); // 加载队列
        }

        getInfo() {
            return {
                id: 'visualCenterCrop',
                name: '视觉中心裁切',
                color1: '#e74c3c',
                blocks: [
                    {
                        opcode: 'centerCrop',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '中心裁切：URL[URL] 裁切高[H] 圆角[R]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://picsum.photos/800/600'
                            },
                            H: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 200
                            },
                            R: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 20
                            }
                        }
                    },
                    {
                        opcode: 'preloadImage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '预加载：URL[URL] 裁切高[H] 圆角[R]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://picsum.photos/800/600'
                            },
                            H: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 200
                            },
                            R: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 20
                            }
                        }
                    },
                    {
                        opcode: 'setPosition',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置中心 X:[X] Y:[Y]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'getImageInfo',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取图片信息 URL[URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://picsum.photos/800/600'
                            }
                        }
                    },
                    {
                        opcode: 'clearAllCache',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '清理缓存',
                        arguments: {}
                    }
                ]
            };
        }

        setPosition(args) {
            this.roleX = Number(args.X);
            this.roleY = Number(args.Y);
        }

        clearAllCache() {
            this.imageCache.clear();
            this.svgCache.clear();
            this.loadingQueue.clear();
        }

        // 获取图片信息
        async getImageInfo(args) {
            const url = String(args.URL);
            
            try {
                const size = await this.getImageSize(url);
                return `图片尺寸: ${size.width}×${size.height}`;
            } catch (error) {
                return `获取图片信息失败: ${error.message}`;
            }
        }

        // 预加载图片
        preloadImage(args) {
            const url = String(args.URL);
            const cropH = Math.max(1, Number(args.H));
            const radius = Math.min(Number(args.R), cropH / 2);
            
            // 启动预加载
            this.getImageSize(url, cropH, radius).catch(() => {
                console.log(`预加载失败: ${url}`);
            });
        }

        // 主裁切函数
        async centerCrop(args) {
            const url = String(args.URL);
            const cropH = Math.max(1, Number(args.H));
            const radius = Math.min(Number(args.R), cropH / 2);
            
            try {
                // 获取图片尺寸
                const size = await this.getImageSize(url, cropH, radius);
                
                // 关键：计算裁切位置
                // 裁切区域中心应该对齐到角色位置
                // 裁切区域左上角在 (0, roleY - cropH/2)
                // 这样裁切区域的中心在 (imgW/2, roleY)
                let cropY = this.roleY - cropH / 2;
                
                // 边界限制
                cropY = Math.max(0, Math.min(cropY, size.height - cropH));
                
                // 生成SVG
                const svg = this.generateVisualCenterSVG(url, size.width, size.height, cropH, cropY, radius);
                
                return svg;
                
            } catch (error) {
                console.error('裁切失败:', error);
                return this.generateErrorSVG(400, cropH, '裁切失败');
            }
        }

        // 获取图片尺寸
        async getImageSize(url, cropH = 200, radius = 20) {
            const cacheKey = `${url}_size`;
            
            // 检查缓存
            if (this.imageCache.has(cacheKey)) {
                return this.imageCache.get(cacheKey);
            }
            
            // 检查加载队列
            if (this.loadingQueue.has(url)) {
                return await this.loadingQueue.get(url);
            }
            
            // 创建加载Promise
            const loadPromise = new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                
                img.onload = () => {
                    const size = {
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        cropH: cropH,
                        radius: radius
                    };
                    
                    // 缓存
                    this.imageCache.set(cacheKey, size);
                    this.loadingQueue.delete(url);
                    
                    resolve(size);
                };
                
                img.onerror = () => {
                    this.loadingQueue.delete(url);
                    
                    // 从URL推测尺寸
                    const guessed = this.guessSizeFromURL(url);
                    guessed.cropH = cropH;
                    guessed.radius = radius;
                    this.imageCache.set(cacheKey, guessed);
                    
                    resolve(guessed);
                };
                
                img.src = url;
            });
            
            this.loadingQueue.set(url, loadPromise);
            return await loadPromise;
        }

        // 生成视觉中心对齐的SVG（关键实现）
        generateVisualCenterSVG(url, imgW, imgH, cropH, cropY, radius) {
            const safeUrl = url.replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/"/g, '&quot;');
            
            const clipId = 'clip-' + Date.now();
            
            // 核心：SVG的viewBox设置为裁切区域
            // 使裁切区域的中心位于SVG的中心
            return [
                '<svg width="', imgW, '" height="', cropH, '" ',
                'viewBox="0 0 ', imgW, ' ', cropH, '" ',
                'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
                '<defs>',
                '<clipPath id="', clipId, '">',
                '<rect width="', imgW, '" height="', cropH, '" ',
                radius > 0 ? 'rx="' + radius + '" ry="' + radius + '"' : '',
                '/>',
                '</clipPath>',
                '</defs>',
                '<!-- 视觉中心裁切：裁切区域中心对齐角色位置 -->',
                '<image x="0" y="', -cropY, '" ',
                'width="', imgW, '" height="', imgH, '" ',
                'xlink:href="', safeUrl, '" ',
                'clip-path="url(#', clipId, ')"/>',
                '</svg>'
            ].join('');
        }

        // 生成错误SVG
        generateErrorSVG(width, height, message) {
            return [
                '<svg width="', width, '" height="', height, '" ',
                'xmlns="http://www.w3.org/2000/svg">',
                '<rect width="100%" height="100%" fill="#ffebee"/>',
                '<text x="50%" y="50%" text-anchor="middle" dy=".3em" ',
                'fill="#c62828" font-size="12">', message, '</text>',
                '</svg>'
            ].join('');
        }

        // 从URL推测尺寸
        guessSizeFromURL(url) {
            const patterns = [
                /\/(\d+)[x×](\d+)\//i,
                /\/(\d+)\/(\d+)\//,
                /width=(\d+).*height=(\d+)/i,
                /w=(\d+).*h=(\d+)/i,
                /(\d+)x(\d+)\.(jpg|png|gif|webp)/i
            ];
            
            for (const pattern of patterns) {
                const match = url.match(pattern);
                if (match) {
                    return {
                        width: parseInt(match[1]),
                        height: parseInt(match[2]),
                        cropH: 200,
                        radius: 20
                    };
                }
            }
            
            return { width: 800, height: 600, cropH: 200, radius: 20 };
        }
    }

    Scratch.extensions.register(new VisualCenterCrop());
})(Scratch);