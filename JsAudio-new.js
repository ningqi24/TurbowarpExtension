(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must be run unsandboxed');
    }

    class JsAudio {
        constructor() {
            // 获取音频上下文
            this.audioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new this.audioContext();
            // 创建增益节点和脚本处理节点
            this.gainNode = this.ctx.createGain();
            this.gainNode.gain.value = 1;
            // 缓冲区大小
            const bufferSize = this.ctx.sampleRate < 64000 ? 2048 : this.ctx.sampleRate < 128000 ? 4096 : 8192;
            // 创建音频处理节点
            this.jsNode = this.ctx.createScriptProcessor(bufferSize, 0, 2);
            // 初始化样本列表
            this.sampleListL = [];
            this.sampleListR = [];
            // 初始化已播放样本缓存（用于支持负数索引）
            this.playedSamplesL = [];
            this.playedSamplesR = [];
            // 最大缓存样本数
            this.maxCacheSize = 48000;
            // 播放状态控制
            this.isPlaying = true;

            this.handleAudioProcess = this.handleAudioProcess.bind(this);
            // 音频处理函数
            this.jsNode.onaudioprocess = this.handleAudioProcess;
            // 连接节点
            this.jsNode.connect(this.gainNode);
            this.gainNode.connect(this.ctx.destination);

            this.cSampleRate = 48000; // 默认采样率
            this.pan = 128; // 默认声道平衡

            this.time = Date.now();
        }
        
        handleAudioProcess(e) {
            // 如果没有样本可播放，输出静音
            if (this.sampleListL.length === 0 || !this.isPlaying) {
                const outputL = e.outputBuffer.getChannelData(0);
                const outputR = e.outputBuffer.getChannelData(1);
                outputL.fill(0);
                outputR.fill(0);
                return;
            }
            
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);
            const buflen = outputL.length;
            // 获取输入样本
            const inputL = this.sampleListL;
            const inputR = this.sampleListR;
            const inlen = inputL.length;
            
            // 重采样并填充输出缓冲区
            var c = this.cSampleRate / this.ctx.sampleRate;
            // 临时存储要播放的样本（用于缓存）
            const playedL = [];
            const playedR = [];
            
            // 填充输出缓冲区
            for (var k = 0, l = 0; k < buflen && l < inlen; k++, l += c) {
                const sampleIndex = Math.floor(l);
                if (sampleIndex < inlen) {
                    // 获取样本值并应用声道平衡
                    const sampleL = inputL[sampleIndex] / 32768 * (this.pan > 128 ? (128 - (this.pan - 128)) / 128 : 1);
                    const sampleR = inputR[sampleIndex] / 32768 * (this.pan < 128 ? (128 + (this.pan - 128)) / 128 : 1);
                    
                    outputL[k] = sampleL;
                    outputR[k] = sampleR;
                    
                    // 记录已播放样本
                    playedL.push(inputL[sampleIndex]);
                    playedR.push(inputR[sampleIndex]);
                }
            }
            
            // 将播放的样本添加到缓存
            this.addToPlayedCache(playedL, playedR);
            
            // 移除已处理的样本
            const removeCount = Math.min(Math.floor(l), inlen);
            inputL.splice(0, removeCount);
            inputR.splice(0, removeCount);
        }
        
        // 添加已播放样本到缓存
        addToPlayedCache(samplesL, samplesR) {
            // 将新样本添加到缓存数组
            this.playedSamplesL.push(...samplesL);
            this.playedSamplesR.push(...samplesR);
            
            // 如果缓存超过最大大小，移除最旧的部分
            if (this.playedSamplesL.length > this.maxCacheSize) {
                const removeCount = this.playedSamplesL.length - this.maxCacheSize;
                this.playedSamplesL.splice(0, removeCount);
                this.playedSamplesR.splice(0, removeCount);
            }
        }
        
        getInfo() {
            return {
                id: 'jsAudio',
                name: 'JS Audio',
                color1: '#CF63CF',
                description: '用JavaScript播放音频.',
                blocks: [
                    {
                        opcode: 'setPlaybackState',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '[state]播放',
                        arguments: {
                            state: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'playbackStates'
                            }
                        }
                    },
                    {
                        opcode: 'getPlaybackState',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '正在播放?'
                    },
                    '---',
                    {
                        opcode: 'addSample',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '添加样本 L:[sampleLeft] R:[sampleRight]',
                        arguments: {
                            sampleLeft: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            sampleRight: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'insertSample',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '在第[index]个样本前插入 L:[sampleLeft] R:[sampleRight]',
                        arguments: {
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            sampleLeft: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            sampleRight: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'replaceSample',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '将第[index]个样本替换为 L:[sampleLeft] R:[sampleRight]',
                        arguments: {
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            sampleLeft: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            sampleRight: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'changeSample',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '将第[index]个样本的振幅值增加 L:[deltaLeft] R:[deltaRight]',
                        arguments: {
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            deltaLeft: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            deltaRight: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                        }
                    },
                    {
                        opcode: 'deleteSample',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '删除第[index]个样本',
                        arguments: {
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'clearBuffer',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '清空样本列表'
                    },
                    '---',
                    {
                        opcode: 'reset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '重置所有设置为默认值'
                    },
                    {
                        opcode: 'setBufferSize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置缓冲区大小为 [size]',
                        arguments: {
                            size: {
                                type: Scratch.ArgumentType.NUMBER,
                                menu: 'BufferSizes',
                                defaultValue: 2048
                            }
                        }
                    },
                    {
                        opcode: 'getBufferSize',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '当前缓冲区大小'
                    },
                    {
                        opcode: 'set',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置[menu]为 [value]',
                        arguments: {
                            value: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 128
                            },
                            menu: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settings'
                            }
                        }
                    },
                    {
                        opcode: 'get',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '当前[menu]',
                        arguments: {
                            menu: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settings'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setCacheSize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置缓存样本数为[size]',
                        arguments: {
                            size: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 48000
                            }
                        }
                    },
                    {
                        opcode: 'getCacheSize',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '当前缓存样本数'
                    },
                    '---',
                    {
                        opcode: 'getSamplesLength',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '当前样本列表长度'
                    },
                    {
                        opcode: 'getIndexOfSamples',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[channel]的第[index]个样本',
                        arguments: {
                            channel: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'channels'
                            },
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'getIndexOfSamplesSmoothed',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '(平滑)[channel]的第[index]个样本',
                        arguments: {
                            channel: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'channels'
                            },
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getSamplesPerFrame',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[fps]帧下 [rate]Hz的每帧样本数',
                        arguments: {
                            fps: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 30
                            },
                            rate: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 48000
                            }
                        }
                    }
                ],
                menus: {
                    channels: {
                        acceptReporters: true,
                        items: [
                            { text: '左声道', value: '0' },
                            { text: '右声道', value: '1' }
                        ]
                    },
                    settings: {
                        acceptReporters: true,
                        items: [
                            { text: '音量', value: 'gain' },
                            { text: '声道平衡', value: 'pan' },
                            { text: '采样率', value: 'sampleRate' }
                        ]
                    },
                    playbackStates: {
                        acceptReporters: true,
                        items: [
                            { text: '暂停', value: 0 },
                            { text: '恢复', value: 1 }
                        ]
                    },
                    BufferSizes: {
                        acceptReporters: true,
                        items: [
                            '256', '512', '1024', '2048', '4096', '8192', '16384'
                        ]
                    }
                }
            };
        }
        
        addSample(args) {// 添加样本到列表
            this.sampleListL.push(Number(args.sampleLeft));
            this.sampleListR.push(Number(args.sampleRight));
        }
        
        clearBuffer() {// 清空样本列表
            this.sampleListL = [];
            this.sampleListR = [];
        }
        
        deleteSample(args) {// 删除指定索引的样本
            const index = Math.floor(Number(args.index) - 1); // 输入的从1开始的索引
            if (index >= 0 && index < this.sampleListL.length) {
                this.sampleListL.splice(index, 1);
                this.sampleListR.splice(index, 1);
            }
        }
        
        insertSample(args) {// 在指定索引插入样本
            const index = Math.floor(Number(args.index) - 1); // 输入的从1开始的索引
            const sampleL = Number(args.sampleLeft);
            const sampleR = Number(args.sampleRight);
            
            if (index >= 0 && index <= this.sampleListL.length) {
                this.sampleListL.splice(index, 0, sampleL);
                this.sampleListR.splice(index, 0, sampleR);
            }
        }

        changeSample(args) {// 增加指定索引样本的振幅值
            const index = Math.floor(Number(args.index) - 1); // 输入的从1开始的索引
            const deltaL = Number(args.deltaLeft);
            const deltaR = Number(args.deltaRight);
            if (index >= 0 && index < this.sampleListL.length) {
                this.sampleListL[index] += deltaL;
                this.sampleListR[index] += deltaR;
            }
        }
        
        replaceSample(args) {// 替换指定索引的样本
            const index = Math.floor(Number(args.index) - 1); // 输入的从1开始的索引
            const sampleL = Number(args.sampleLeft);
            const sampleR = Number(args.sampleRight);
            
            if (index >= 0 && index < this.sampleListL.length) {
                this.sampleListL[index] = sampleL;
                this.sampleListR[index] = sampleR;
            }
        }
        
        setCacheSize(args) {// 设置缓存样本数
            const newSize = Math.max(0, Math.floor(Number(args.size)));
            this.maxCacheSize = newSize;
            
            // 如果新大小小于当前缓存，截断缓存
            if (this.playedSamplesL.length > newSize) {
                const removeCount = this.playedSamplesL.length - newSize;
                this.playedSamplesL.splice(0, removeCount);
                this.playedSamplesR.splice(0, removeCount);
            }
        }
        
        getCacheSize() {// 获取当前缓存样本数
            return this.maxCacheSize;
        }
        
        setPlaybackState(args) {// 设置播放状态
            const state = Number(args.state);
            if (state === 0) {
                // 暂停播放
                this.isPlaying = false;
            } else if (state === 1) {
                // 恢复播放
                this.isPlaying = true;
            }
        }
        
        getPlaybackState() {// 检查是否正在播放
            return this.isPlaying;
        }
        
        getSamplesLength() {// 获取样本列表长度
            return this.sampleListL.length;
        }
        
        getIndexOfSamples(args) {// 获取指定声道和索引的样本
            const index = Math.floor(Number(args.index));
            const channel = args.channel === 0 ? 
                (index >= 0 ? this.sampleListL : this.playedSamplesL) : 
                (index >= 0 ? this.sampleListR : this.playedSamplesR);
            
            let actualIndex;
            if (index >= 0) {
                // 非负数索引：从当前样本列表获取（从0开始）
                actualIndex = index;
            } else {
                // 负数索引：从已播放样本缓存获取（-1表示最后一个，-2表示倒数第二个，以此类推）
                actualIndex = channel.length + index; // index为负数，所以这里是加法
            }
            
            // 检查索引是否有效
            if (actualIndex >= 0 && actualIndex < channel.length) {
                return channel[actualIndex];
            } else {
                return 0; // 索引无效返回0
            }
        }
        getIndexOfSamplesSmoothed(args) {// (平滑)获取指定声道和索引的样本
            const baseIndex = Number(args.index);
            const timeOffset = (Date.now() - this.time) / 1000 * this.cSampleRate % this.jsNode.bufferSize;
            const smoothIndex = baseIndex + timeOffset;
            const indexFloor = Math.floor(smoothIndex);
            return this.getIndexOfSamples({
                channel: args.channel,
                index: indexFloor
            });
        }
        reset() {// 重置所有设置为默认值
            this.gainNode.gain.value = 1;
            this.cSampleRate = 48000;
            this.pan = 128;
            this.isPlaying = true;
            this.maxCacheSize = 48000;
            this.setBufferSize({ size: 2048 });
            this.playedSamplesL = [];
            this.playedSamplesR = [];
            this.time = Date.now();
        }
        
        setBufferSize(args) {// 设置缓冲区大小
            const newSize = Math.max(256, Math.min(16384, Math.floor(Number(args.size))));
            this.jsNode.disconnect();
            this.jsNode = this.ctx.createScriptProcessor(newSize, 0, 2);
            this.jsNode.onaudioprocess = this.handleAudioProcess;
            this.jsNode.connect(this.gainNode);
            this.time = Date.now();
        }
        
        getBufferSize() {// 获取当前缓冲区大小
            return this.jsNode.bufferSize;
        }
        
        set(args) {// 设置参数
            if (args.menu === 'gain') {// 设置音量
                const gainValue = Number(args.value);
                this.gainNode.gain.value = gainValue / 128;
            }
            else if (args.menu === 'pan') {// 设置声道平衡
                const panValue = Number(args.value);
                this.pan = Math.max(0, Math.min(256, panValue)); // 限制在0-256范围内
            }
            else if (args.menu === 'sampleRate') {// 设置采样率
                const sampleRateValue = Number(args.value);
                this.cSampleRate = sampleRateValue;
            }
        }
        
        get(args) {// 获取参数值
            if (args.menu === 'gain') {// 获取音量
                return this.gainNode.gain.value * 128;
            }
            else if (args.menu === 'pan') {// 获取声道平衡
                return this.pan;
            }
            else if (args.menu === 'sampleRate') {// 获取采样率
                return this.cSampleRate;
            }
        }
        
        getSamplesPerFrame(args) {// 计算每帧样本数
            const fps = Math.max(1, Math.floor(Number(args.fps)));
            const rate = args.rate;
            const deltaframe = Math.floor(1000 / fps);
            return rate / (1000 / deltaframe);
        }
    }
    
    Scratch.extensions.register(new JsAudio());
})(Scratch);