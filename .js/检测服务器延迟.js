(function(Scratch) {
    'use strict';
    
    class ServerLatency {
        constructor() {
            this.isMeasuring = false;
        }
        
        getInfo() {
            return {
                id: 'serverlatency',
                name: '服务器延迟检测',
                color1: '#29beb8',
                color2: '#1f8c87',
                blocks: [
                    {
                        opcode: 'getLatency',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [SERVER] 的延迟(ms)',
                        arguments: {
                            SERVER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'wss://clouddata.turbowarp.org'
                            }
                        }
                    }
                ]
            };
        }
        
        async getLatency(args) {
            if (this.isMeasuring) {
                return -2; // 正在测量中
            }
            
            const serverUrl = args.SERVER;
            
            return new Promise((resolve) => {
                this.isMeasuring = true;
                const startTime = performance.now();
                
                try {
                    const ws = new WebSocket(serverUrl);
                    const timeout = setTimeout(() => {
                        ws.close();
                        this.isMeasuring = false;
                        resolve(-1); // 超时
                    }, 5000);
                    
                    ws.onopen = () => {
                        clearTimeout(timeout);
                        const latency = Math.round(performance.now() - startTime);
                        ws.close();
                        this.isMeasuring = false;
                        resolve(latency);
                    };
                    
                    ws.onerror = () => {
                        clearTimeout(timeout);
                        this.isMeasuring = false;
                        resolve(-1); // 连接失败
                    };
                    
                } catch (error) {
                    this.isMeasuring = false;
                    resolve(-1); // 其他错误
                }
            });
        }
    }
    
    // 注册扩展 - 这次不会忘了！🚀
    Scratch.extensions.register(new ServerLatency());
})(Scratch);