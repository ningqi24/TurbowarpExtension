// file.js - 简化版文件操作扩展
(function(Scratch) {
    'use strict';
    
    class FileExtension {
        constructor() {
            this.serverUrl = 'http://localhost:5000';
            this.connected = false;
            this.lastRefresh = Date.now();
            this.autoConnect();
        }
        
        getInfo() {
            return {
                id: 'fileOperations',
                name: '文件操作',
                color1: '#4D97FF',
                color2: '#3D7DD9',
                color3: '#2D5DB6',
                blocks: [
                    {
                        opcode: 'serverConnected',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '服务器已连接？'
                    },
                    {
                        opcode: 'refreshStatus',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '刷新服务器状态'
                    },
                    '---',
                    {
                        opcode: 'writeFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '将 [CONTENT] 以 [FORMAT] 写入 [PATH]',
                        arguments: {
                            CONTENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello World!'
                            },
                            FORMAT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'formatMenu'
                            },
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/test.txt'
                            }
                        }
                    },
                    {
                        opcode: 'createFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '在 [PATH] 中创建 [NAME] 文件夹',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/'
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'new_folder'
                            }
                        }
                    },
                    {
                        opcode: 'deleteFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '删除 [PATH] 的文件',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/test.txt'
                            }
                        }
                    },
                    {
                        opcode: 'deleteFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '删除 [PATH] 中 [NAME] 文件夹',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/'
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'folder_to_delete'
                            }
                        }
                    },
                    {
                        opcode: 'copyFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '复制 [SRC] 的文件到 [DEST]',
                        arguments: {
                            SRC: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/source.txt'
                            },
                            DEST: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/destination.txt'
                            }
                        }
                    },
                    {
                        opcode: 'moveFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '移动 [SRC] 的文件到 [DEST]',
                        arguments: {
                            SRC: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/source.txt'
                            },
                            DEST: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/destination.txt'
                            }
                        }
                    },
                    {
                        opcode: 'copyFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '复制 [SRC] 的文件夹到 [DEST]',
                        arguments: {
                            SRC: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/source_folder'
                            },
                            DEST: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/destination_folder'
                            }
                        }
                    },
                    {
                        opcode: 'moveFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '移动 [SRC] 的文件夹到 [DEST]',
                        arguments: {
                            SRC: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/source_folder'
                            },
                            DEST: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/destination_folder'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'fileExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[PATH] 的文件存在吗',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/test.txt'
                            }
                        }
                    },
                    {
                        opcode: 'folderExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[PATH] 的文件夹存在吗',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/test_folder'
                            }
                        }
                    },
                    {
                        opcode: 'readFile',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '读取 [PATH] 的文件输出 [FORMAT]',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/test.txt'
                            },
                            FORMAT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'formatMenu'
                            }
                        }
                    },
                    {
                        opcode: 'readFileData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '读取 [PATH] 的文件数据',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/test.txt'
                            }
                        }
                    },
                    {
                        opcode: 'listFiles',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '读取 [PATH] 的文件夹中的文件',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/'
                            }
                        }
                    },
                    {
                        opcode: 'listFolderData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '读取 [PATH] 的文件夹 数据',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/'
                            }
                        }
                    },
                    {
                        opcode: 'getDriveInfo',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [DRIVE] 磁盘数据',
                        arguments: {
                            DRIVE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:'
                            }
                        }
                    },
                    {
                        opcode: 'searchFiles',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '搜索 [PATH] 里 [KEYWORD] 的文件',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'C:/'
                            },
                            KEYWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '*.txt'
                            }
                        }
                    },
                    {
                        opcode: 'testConnection',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '测试服务器连接'
                    }
                ],
                menus: {
                    formatMenu: {
                        acceptReporters: true,
                        items: ['文本', 'dataurl']
                    }
                }
            };
        }
        
        async autoConnect() {
            console.log('尝试自动连接服务器...');
            await this.checkConnection();
        }
        
        // 检查服务器连接
        async checkConnection() {
            try {
                console.log(`检查连接: ${this.serverUrl}/test`);
                const response = await fetch(`${this.serverUrl}/test`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP错误: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status === 'ok') {
                    this.connected = true;
                    this.lastRefresh = Date.now();
                    console.log('服务器连接成功!');
                    return true;
                } else {
                    throw new Error('服务器返回异常状态');
                }
            } catch (error) {
                this.connected = false;
                console.warn('服务器连接失败:', error.message);
                return false;
            }
        }
        
        // 发送请求到服务器
        async sendRequest(endpoint, data = {}) {
            // 如果未连接，先尝试连接
            if (!this.connected) {
                await this.checkConnection();
                if (!this.connected) {
                    throw new Error('服务器未连接，请先刷新服务器状态');
                }
            }
            
            try {
                console.log(`发送请求到: ${endpoint}`, data);
                const response = await fetch(`${this.serverUrl}/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                console.log(`响应结果:`, result);
                return result;
            } catch (error) {
                console.error('请求失败:', error);
                throw error;
            }
        }
        
        // 积木实现
        serverConnected() {
            return this.connected;
        }
        
        async refreshStatus() {
            this.connected = false;
            const success = await this.checkConnection();
            // 触发Scratch界面更新
            Scratch.vm.runtime.requestRedraw();
            return success;
        }
        
        async testConnection() {
            return await this.refreshStatus();
        }
        
        async writeFile(args) {
            const { CONTENT, FORMAT, PATH } = args;
            try {
                const result = await this.sendRequest('write_file', {
                    path: PATH,
                    content: CONTENT,
                    format: FORMAT
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async createFolder(args) {
            const { PATH, NAME } = args;
            try {
                const result = await this.sendRequest('create_folder', {
                    path: PATH,
                    name: NAME
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async deleteFile(args) {
            const { PATH } = args;
            try {
                const result = await this.sendRequest('delete_file', {
                    path: PATH
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async deleteFolder(args) {
            const { PATH, NAME } = args;
            try {
                const result = await this.sendRequest('delete_folder', {
                    path: PATH,
                    name: NAME
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async copyFile(args) {
            const { SRC, DEST } = args;
            try {
                const result = await this.sendRequest('copy_file', {
                    src: SRC,
                    dest: DEST
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async moveFile(args) {
            const { SRC, DEST } = args;
            try {
                const result = await this.sendRequest('move_file', {
                    src: SRC,
                    dest: DEST
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async copyFolder(args) {
            const { SRC, DEST } = args;
            try {
                const result = await this.sendRequest('copy_folder', {
                    src: SRC,
                    dest: DEST
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async moveFolder(args) {
            const { SRC, DEST } = args;
            try {
                const result = await this.sendRequest('move_folder', {
                    src: SRC,
                    dest: DEST
                });
                return result.success || false;
            } catch (error) {
                return false;
            }
        }
        
        async fileExists(args) {
            const { PATH } = args;
            try {
                const result = await this.sendRequest('file_exists', {
                    path: PATH
                });
                return result.exists || false;
            } catch (error) {
                return false;
            }
        }
        
        async folderExists(args) {
            const { PATH } = args;
            try {
                const result = await this.sendRequest('folder_exists', {
                    path: PATH
                });
                return result.exists || false;
            } catch (error) {
                return false;
            }
        }
        
        async readFile(args) {
            const { PATH, FORMAT } = args;
            try {
                const result = await this.sendRequest('read_file', {
                    path: PATH,
                    format: FORMAT
                });
                return result.content || '';
            } catch (error) {
                return '';
            }
        }
        
        async readFileData(args) {
            const { PATH } = args;
            try {
                const result = await this.sendRequest('read_file_data', {
                    path: PATH
                });
                return JSON.stringify(result.data || {});
            } catch (error) {
                return '{}';
            }
        }
        
        async listFiles(args) {
            const { PATH } = args;
            try {
                const result = await this.sendRequest('list_files', {
                    path: PATH
                });
                return JSON.stringify(result.files || []);
            } catch (error) {
                return '[]';
            }
        }
        
        async listFolderData(args) {
            const { PATH } = args;
            try {
                const result = await this.sendRequest('list_folder_data', {
                    path: PATH
                });
                return JSON.stringify(result.data || {});
            } catch (error) {
                return '{}';
            }
        }
        
        async getDriveInfo(args) {
            const { DRIVE } = args;
            try {
                const result = await this.sendRequest('get_drive_info', {
                    drive: DRIVE
                });
                return JSON.stringify(result.info || {});
            } catch (error) {
                return '{}';
            }
        }
        
        async searchFiles(args) {
            const { PATH, KEYWORD } = args;
            try {
                const result = await this.sendRequest('search_files', {
                    path: PATH,
                    keyword: KEYWORD
                });
                return JSON.stringify(result.files || []);
            } catch (error) {
                return '[]';
            }
        }
    }
    
    // 注册扩展
    Scratch.extensions.register(new FileExtension());
})(Scratch);