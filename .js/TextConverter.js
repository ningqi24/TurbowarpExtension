(function(Scratch) {
    'use strict';

    class TextConverter {
        constructor() {
            this.validateInput = 'true';
        }
        getInfo() {
            return {
                id: 'textconverter',
                name: '文本格式转换',
                blocks: [
                    {
                        opcode: 'convert',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '将[type1]格式的[input]转换为[type2]',
                        arguments: {
                            input: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, World!'
                            },
                            type1: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'types',
                                defaultValue: 'text'
                            },
                            type2: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'types',
                                defaultValue: 'base64'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getBase64OfDataURL',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'DataURL [dataURL] 的Base64部分',
                        arguments: {
                            dataURL: {
                                type: Scratch.ArgumentType.STRING,
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'set',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置 [settings] 为 [value]',
                        arguments: {
                            settings: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settings',
                                defaultValue: 'validateInput'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'boolean',
                                defaultValue: 'true'
                            }
                        }
                    },
                    {
                        opcode: 'get',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[settings]的状态',
                        arguments: {
                            settings: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settings',
                                defaultValue: 'validateInput'
                            }
                        }
                    }
                ],
                menus: {
                    types: {
                        acceptReporters: true,
                        items: [
                            { text: 'Base64', value: 'base64' },
                            { text: 'Hex', value: 'hex' },
                            { text: 'UTF-8 文本', value: 'text' },
                            { text: '二进制', value: 'binary' }
                        ]
                    },
                    settings: {
                        acceptReporters: true,
                        items: [
                            { text: '转换时验证输入', value: 'validateInput' }
                        ]
                    },
                    boolean: {
                        acceptReporters: true,
                        items: ['true','false']
                    }
                },
            };
        }

        set(args) {
            if (args.settings === 'validateInput') {
                this.validateInput = args.value
            }
        }

        get(args) {
            if (args.settings === 'validateInput') {
                return this.validateInput
            }
        }

        //内部: 转换
        _base64ToBinaryString(base64) {
            return atob(base64);
        }
        _binaryStringToBase64(binaryString) {
            return btoa(binaryString);
        }
        _hexToBinaryString(hex) {
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            return String.fromCharCode(...bytes);
        }
        _binaryStringToHex(binaryString) {
            let hex = '';
            for (let i = 0; i < binaryString.length; i++) {
                const hexChar = binaryString.charCodeAt(i).toString(16).padStart(2, '0');
                hex += hexChar;
            }
            return hex;
        }
        _textToBinaryString(text) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            let binaryString = '';
            for (let i = 0; i < data.length; i++) {
                binaryString += String.fromCharCode(data[i]);
            }
            return binaryString;
        }
        _binaryStringToText(binaryString) {
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(bytes);
        }
        _binaryStringToBinary(binaryString) {
            let binary = '';
            for (let i = 0; i < binaryString.length; i++) {
                const byte = binaryString.charCodeAt(i);
                binary += byte.toString(2).padStart(8, '0');
            }
            return binary;
        }
        _binaryToBinaryString(binary) {
            const bytes = [];
            for (let i = 0; i < binary.length; i += 8) {
                const byteStr = binary.substr(i, 8);
                bytes.push(parseInt(byteStr, 2));
            }
            return String.fromCharCode(...bytes);
        }

        //转换
        convert(args) {
            const inputType = args.type1;
            const outputType = args.type2;
            const input = args.input;
            try {

                if (inputType === 'base64') {
                    if (this.get({settings: 'validateInput'}) === 'true') {
                        if (!this._isValidBase64String(input)) {
                        return '无效的Base64输入.';
                        }
                    }
                    if (inputType === outputType) {
                        return input;
                    }

                    const binaryString = this._base64ToBinaryString(input);

                    if (outputType === 'hex') {
                        return this._binaryStringToHex(binaryString);
                    } else if (outputType === 'text') {
                        return this._binaryStringToText(binaryString);
                    } else if (outputType === 'binary') {
                        return this._binaryStringToBinary(binaryString);
                    }
                }

                else if (inputType === 'hex') {
                    if (this.get({settings: 'validateInput'}) === 'true') {
                        if (!this._isValidHexString(input)) {
                            return '无效的Hex输入.';
                        }
                    }
                    if (inputType === outputType) {
                        return input;
                    }

                    const binaryString = this._hexToBinaryString(input);

                    if (outputType === 'base64') {
                        return this._binaryStringToBase64(binaryString);
                    } else if (outputType === 'text') {
                        return this._binaryStringToText(binaryString);
                    } else if (outputType === 'binary') {
                        return this._binaryStringToBinary(binaryString);
                    }
                }

                else if (inputType === 'text') {
                    if (inputType === outputType) {
                        return input;
                    }
                    
                    const binaryString = this._textToBinaryString(input);
                    
                    if (outputType === 'base64') {
                        return this._binaryStringToBase64(binaryString);
                    } else if (outputType === 'hex') {
                        return this._binaryStringToHex(binaryString);
                    } else if (outputType === 'binary') {
                        return this._binaryStringToBinary(binaryString);
                    }
                }

                else if (inputType === 'binary') {
                    if (this.get({settings: 'validateInput'}) === 'true') {
                        if (!this._isValidBinaryString(input)) {
                            return '无效的二进制输入';
                        }
                    }
                    if (inputType === outputType) {
                        return input;
                    }
                    
                    const binaryString = this._binaryToBinaryString(input);
                    
                    if (outputType === 'base64') {
                        return this._binaryStringToBase64(binaryString);
                    } else if (outputType === 'hex') {
                        return this._binaryStringToHex(binaryString);
                    } else if (outputType === 'text') {
                        return this._binaryStringToText(binaryString);
                    }
                }

                return '不支持的转换类型.'
            } catch (error) {
                return '转换错误: ' + error.message;
            }
        }

        //验证
        _isValidBase64(str) {//验证Base64字符串的有效性
            const base64 = str.input.toString().trim();
            return this._isValidBase64String(base64);
        }
        _isValidBase64String(str) {
            if (str === '') return false;
            try {
                const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
                if (!base64Regex.test(str)) return false;
                if (str.length % 4 !== 0) return false;
                atob(str);
                return true
            } catch (e) {
                return false;
            }
        }
        _isValidHex(str) {//验证Hex字符串的有效性
            const hex = str.input.toString().trim().toLowerCase();
            return this._isValidHexString(hex);
        }
        _isValidHexString(str) {
            const hexRegex = /^[0-9a-fA-F]+$/;
            return hexRegex.test(str) && str.length % 2 === 0;
        }
        _isValidBinary(str) {//验证二进制字符串的有效性
            const binary = str.input.toString().trim();
            return this._isValidBinaryString(binary);
        }
        _isValidBinaryString(str) {
            const binaryRegex = /^[01]+$/;
            return binaryRegex.test(str) && str.length % 8 === 0;
        }


        getBase64OfDataURL(str) {
            const dataURL = str.dataURL.toString().trim();
            const match = dataURL.match(/^data:.*;base64,(.*)$/);
            if (match) {
                return match[1];
            } else {
                return '无效的DataURL输入';
            }
        }
    }
    Scratch.extensions.register(new TextConverter());
})(Scratch);    