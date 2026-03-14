(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must be run unsandboxed');
    }

    class FontBuilder {
        constructor() {
            this.fonts = {};
            this.currentFontId = null;

            this.fontSize = 16;
            this.fontStyle = 'normal';
            this.fontPosition = { x: 0, y: 0 };
            this.pictureSize = { width: 32, height: 32 };
            this.fontColor = '#ff0000ff';
            this.backgroundColor = '#00000000';
            this.strokeWidth = 0;
            this.strokeColor = '#000000ff';
        }

        getInfo() {
            return {
                id: 'fontbuilder',
                name: '字体构建器',
                blocks: [
                    {
                        opcode: 'loadFont',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '从 [URL] 加载字体 作为ID [ID]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'myFont',
                            },
                        },
                    },
                    '---',
                    {
                        opcode: 'selectFont',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '选择字体 ID 为 [ID]',
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'myFont',
                            },
                        },
                    },
                    {
                        opcode: 'setFontSize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置字体大小为 [SIZE] 像素',
                        arguments: {
                            SIZE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 16,
                            },
                        },
                    },
                    {
                        opcode: 'setFontStyle',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置字体样式为 [STYLE]',
                        arguments: {
                            STYLE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'fontStyles',
                                defaultValue: 'normal',
                            },
                        },
                    },
                    '---',
                    {
                        opcode: 'setFontPosition',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置文字位置 X: [X] Y: [Y]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: 'setPictureSize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置图片尺寸 宽: [WIDTH] 高: [HEIGHT]',
                        arguments: {
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 32,
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 32,
                            },
                        },
                    },
                    '---',
                    {
                        opcode: 'setFontColor',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置文字颜色 [COLOR]',
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#ff0000ff',
                            },
                        },
                    },
                    {
                        opcode: 'setBackgroundColor',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置背景颜色 [COLOR]',
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#00000000',
                            },
                        },
                    },
                    {
                        opcode: 'setStrokeWidth',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置描边粗细为 [WIDTH] 像素',
                        arguments: {
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: 'setStrokeColor',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置描边颜色为 [COLOR]',
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#000000ff',
                            },
                        },
                    },
                    '---',
                    {
                        opcode: 'exportText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '导出字符 [CHAR] 为图片 DataURL',
                        arguments: {
                            CHAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'A',
                            },
                        },
                    },
                    {
                        opcode: 'isFontLoaded',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '字体 [ID] 已加载？',
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'myFont',
                            },
                        },
                    },
                    {
                        opcode: 'getCurrentFontId',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '当前字体 ID',
                    },
                    {
                        opcode: 'getFontList',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '已加载字体列表',
                    },
                    {
                        opcode: 'getSettings',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '当前[SETTING]设置',
                        arguments: {
                            SETTING: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settingsMenu',
                                defaultValue: 'fontSize',
                            },
                        },
                    }
                ],
                menus: {
                    fontStyles: {
                        acceptReporters: true,
                        items: [
                            { text: '正常', value: 'normal' },
                            { text: '粗体', value: 'bold' },
                            { text: '斜体', value: 'italic' },
                            { text: '粗斜体', value: 'bold italic' }
                        ],
                    },
                    settingsMenu: {
                        acceptReporters: true,
                        items: [
                            { text: '字体大小', value: 'fontSize' },
                            { text: '字体样式', value: 'fontStyle' },
                            { text: 'X位置', value: 'fontPositionX' },
                            { text: 'Y位置', value: 'fontPositionY' },
                            { text: '图片宽度', value: 'pictureWidth' },
                            { text: '图片高度', value: 'pictureHeight' },
                            { text: '字体颜色', value: 'fontColor' },
                            { text: '背景颜色', value: 'backgroundColor' },
                            { text: '描边粗细', value: 'strokeWidth' },
                            { text: '描边颜色', value: 'strokeColor' }
                        ],
                    },
                },
            };
        }

        async loadFont(args) {
            const url = args.URL;
            const id = args.ID;
            
            if (!url || !id) {
                throw new Error('URL和ID不能为空');
            }
            
            if (this.fonts[id]) {
                console.warn(`字体ID "${id}" 已存在，将被覆盖`);
            }
            
            try {
                // 创建字体face
                const font = new FontFace(id, `url(${url})`);
                
                // 加载字体
                const loadedFont = await font.load();
                
                // 添加到文档字体库
                document.fonts.add(loadedFont);
                
                // 存储字体信息
                this.fonts[id] = {
                    fontFace: loadedFont,
                    url: url,
                    loaded: true
                };
                
                console.log(`字体 "${id}" 加载成功`);

                this.currentFontId = id;
                
            } catch (error) {
                console.error(`字体加载失败: ${error.message}`);
                throw new Error(`字体加载失败: ${error.message}`);
            }
        }

        selectFont(args) {
            const id = args.ID;
            
            if (!this.fonts[id]) {
                throw new Error(`字体ID "${id}" 未找到，请先加载字体`);
            }
            
            if (!this.fonts[id].loaded) {
                throw new Error(`字体 "${id}" 尚未加载完成`);
            }
            
            this.currentFontId = id;
        }

        setFontSize(args) {
            const size = Number(args.SIZE);
            if (isNaN(size) || size <= 0) {
                throw new Error('字体大小必须为正数');
            }
            this.fontSize = size;
        }

        setFontStyle(args) {
            const validStyles = ['normal', 'bold', 'italic', 'bold italic'];
            const style = args.STYLE;
            
            if (!validStyles.includes(style)) {
                throw new Error(`字体样式必须是: ${validStyles.join(', ')}`);
            }
            
            this.fontStyle = style;
        }

        setFontPosition(args) {
            const x = Number(args.X);
            const y = Number(args.Y);
            
            if (isNaN(x) || isNaN(y)) {
                throw new Error('位置坐标必须是数字');
            }
            
            this.fontPosition = { x, y };
        }

        setPictureSize(args) {
            const width = Number(args.WIDTH);
            const height = Number(args.HEIGHT);
            
            if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
                throw new Error('图片尺寸必须为正数');
            }
            
            this.pictureSize = { width, height };
        }

        setFontColor(args) {
            const color = args.COLOR;
            if (!this._isValidColor(color)) {
                throw new Error('字体颜色格式无效，请使用#RRGGBBAA格式');
            }
            this.fontColor = color;
        }

        setBackgroundColor(args) {
            const color = args.COLOR;
            if (!this._isValidColor(color)) {
                throw new Error('背景颜色格式无效，请使用#RRGGBBAA格式');
            }
            this.backgroundColor = color;
        }

        setStrokeWidth(args) {
            const width = Number(args.WIDTH);
            if (isNaN(width) || width < 0) {
                throw new Error('描边粗细必须为非负数');
            }
            this.strokeWidth = width;
        }

        setStrokeColor(args) {
            const color = args.COLOR;
            if (!this._isValidColor(color)) {
                throw new Error('描边颜色格式无效，请使用#RRGGBBAA格式');
            }
            this.strokeColor = color;
        }

        exportText(args) {
            if (!this.currentFontId) {
                throw new Error('请先选择字体');
            }
            
            const char = args.CHAR;
            if (!char) {
                throw new Error('字符不能为空');
            }
            
            // 创建canvas
            const canvas = document.createElement('canvas');
            canvas.width = this.pictureSize.width;
            canvas.height = this.pictureSize.height;
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                throw new Error('无法创建canvas上下文');
            }
            
            // 绘制背景
            ctx.fillStyle = this._convertColor(this.backgroundColor);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 设置字体
            const fontFamily = this.currentFontId;
            ctx.font = `${this.fontStyle} ${this.fontSize}px "${fontFamily}"`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            
            const x = this.fontPosition.x;
            const y = this.fontPosition.y;
            
            // 如果有描边，先绘制描边
            if (this.strokeWidth > 0) {
                ctx.strokeStyle = this._convertColor(this.strokeColor);
                ctx.lineWidth = this.strokeWidth;
                ctx.lineJoin = 'round';
                ctx.strokeText(char, x, y);
            }
            
            // 绘制填充文字
            ctx.fillStyle = this._convertColor(this.fontColor);
            ctx.fillText(char, x, y);
            
            // 返回DataURL
            return canvas.toDataURL('image/png');
        }

        isFontLoaded(args) {
            const id = args.ID;
            return !!this.fonts[id] && this.fonts[id].loaded;
        }

        getCurrentFontId() {
            return this.currentFontId || '未选择字体';
        }

        getFontList() {
            return JSON.stringify(Object.keys(this.fonts));
        }

        getSettings(args) {
            const setting = args.SETTING;
            
            switch (setting) {
                case 'fontSize':
                    return this.fontSize;
                case 'fontStyle':
                    return this.fontStyle;
                case 'fontPositionX':
                    return this.fontPosition.x;
                case 'fontPositionY':
                    return this.fontPosition.y;
                case 'pictureWidth':
                    return this.pictureSize.width;
                case 'pictureHeight':
                    return this.pictureSize.height;
                case 'fontColor':
                    return this.fontColor;
                case 'backgroundColor':
                    return this.backgroundColor;
                case 'strokeWidth':
                    return this.strokeWidth;
                case 'strokeColor':
                    return this.strokeColor;
                default:
                    return '未知设置';
            }
        }

        // 辅助方法：验证颜色格式
        _isValidColor(color) {
            return /^#[0-9A-Fa-f]{8}$/.test(color);
        }

        // 辅助方法：转换颜色格式 #RRGGBBAA 为 rgba()
        _convertColor(hexColor) {
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            const a = parseInt(hexColor.slice(7, 9), 16) / 255;
            
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
    }

    Scratch.extensions.register(new FontBuilder());
})(Scratch);