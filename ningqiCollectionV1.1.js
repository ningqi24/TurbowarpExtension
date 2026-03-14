//ningqiCollect!!
Scratch.translate.setup({
    "zh-cn": {
        "_create input [id] type [type] x [x] y [y] width [width] height [height] content [text] color [color] prompt [texts] size [size]": "创建或修改[type]文本框并命名为[id]，X[x]Y[y]宽[width]高[height]内容[text]颜色[color]提示[texts]字体大小[size]",
        "_delete input [id]": "删除文本框[id]",
        "_get [type] of input [id]": "获得文本框[id]的[type]",
        "_is input [id] focused": "焦点是否在文本框[id]上",
        "_focus on input [id]": "将焦点聚焦在文本框[id]上",
        "_delete all inputs": "删除所有文本框",
        "_[resolution] resolution font size [size]": "[resolution]分辨率下高[size]的字体大小",
        "_input count": "文本框的数量",
        "_input [num] [type]": "第 [num] 个输入框的 [type]",
        "_mouse wheel speed": "鼠标滚轮速度",
        "_set [type] of input [id] to [text]": "设置文本框[id]的[type]为[text]",
        "_set input [id] to [read]": "设置文本框[id]为[read]",
        "_set font weight of input [id] to [text]": "设置文本框[id]的字体粗细为[text]",
        "_set font family of input [id] to [name]": "设置文本框[id]字体为字体名[name]",
        "_set input [id] to [password]": "设置文本框[id]为[password]框",
        "_set text align of input [id] to [ALIGN]": "设置输入框 [id] 的对齐模式为 [ALIGN]",
        "_left": "左对齐",
        "_center": "中对齐",
        "_right": "右对齐",
        "_normal": "常规",
        "_bold": "粗体",
        "_thin": "细体",
        "_content": "内容",
        "_color": "颜色",
        "_prompt": "提示",
        "_font size": "字体大小",
        "_x position": "X坐标",
        "_y position": "y坐标",
        "_width": "宽度",
        "_height": "高度",
        "_background": "背景色",
        "_css": "CSS",
        "_setInputAdaptation [type]": "设置自适应为 [type]",
        "_scrollTop": "滚动位置",
        "_enable": "启用",
        "_disable": "禁用",
        "_single-line": "单行",
        "_multi-line": "多行",
        "_editable": "可编辑",
        "_uneditable": "不可编辑",
        "_textBlock": "文本",
        "_password": "密码"
    },

});
(function (Scratch) {
    'use strict';
    if (!(Scratch && Scratch.extensions && Scratch.extensions.register)) {
        throw new Error('此环境不支持！请在Scratch3+扩展环境中加载');
    }
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("this extension must be run unsandboxed");
    }
    const NC_ICON = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMDkuMTk0NzIiIGhlaWdodD0iMzAyLjUzMzgxIiB2aWV3Qm94PSIwLDAsMzA5LjE5NDcyLDMwMi41MzM4MSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkzLjk5MDQsLTI3LjczMzEpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik05My45OTA0LDE1Ny4zODg3NWMwLC03MS42MDc0NCA1OC4wNDgyMiwtMTI5LjY1NTY1IDEyOS42NTU2NSwtMTI5LjY1NTY1YzcxLjYwNzQ0LDAgMTI5LjY1NTY1LDU4LjA0ODIyIDEyOS42NTU2NSwxMjkuNjU1NjVjMCw3MS42MDc0NCAtNTguMDQ4MjIsMTI5LjY1NTY1IC0xMjkuNjU1NjUsMTI5LjY1NTY1Yy03MS42MDc0NCwwIC0xMjkuNjU1NjUsLTU4LjA0ODIyIC0xMjkuNjU1NjUsLTEyOS42NTU2NXoiIGZpbGw9IiNiN2U4ZmEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIxMC4wNDE0OCwyMDAuMDU3NjJjMCwtNTMuMzkxNzQgNDMuMjM1NzMsLTk2LjY3NDg4IDk2LjU3MTgyLC05Ni42NzQ4OGM1My4zMzYwOSwwIDk2LjU3MTgyLDQzLjI4MzE0IDk2LjU3MTgyLDk2LjY3NDg4YzAsNTMuMzkxNzQgLTQzLjIzNTczLDk2LjY3NDg4IC05Ni41NzE4Miw5Ni42NzQ4OGMtNTMuMzM2MDksMCAtOTYuNTcxODIsLTQzLjI4MzE0IC05Ni41NzE4MiwtOTYuNjc0ODh6IiBmaWxsPSIjYjdlOGZhIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0zNTUuMDczNTEsMjE4LjU4MjIzYy0wLjAzODA5LDEuMDc2MjIgLTMuOTQyMDcsNC42OTAzOCAtOC40MzM5MSw3LjU3MDY3Yy00LjMxMDU2LDIuNzYzOTkgLTkuMjAwNjEsNC44MTQyMiAtOS45NTk4OCw1LjA3MTMzYy00LjI4NzUyLDEuNDUxOTQgLTYuNTg3MSwyLjU3NTUyIC0xMS41Njc5MywzLjMxMDA0Yy0yLjk4Njg5LDAuNDQwMzEgLTYuOTM3ODUsMC43NDA4MSAtMTIuODU5OTksMC44ODc4NWMtMTQuNTYyODUsMC4zNjE2NiAtMzAuODgzNjEsLTguNzYwNjggLTQwLjM4NTExLC0yMC4zMTkxMmMtMTAuMTg4MTcsLTEyLjM5MzkxIC0xMi41NTg5NSwtMjcuMDM1NjQgLTEyLjU0MDU2LC0zNC4wNTAxMWMwLjAwNzczLC0yLjg5OTA2IDAuMjQ0ODgsLTEwLjc2NTIyIDMuMjY4MDcsLTE5LjMxMDQ4YzIuMjkyLC02LjQ3ODM0IDUuNDI3NzMsLTEzLjM0NzI5IDExLjA2NDAxLC0xOC43MzgyMWMyLjY1ODQ0LC0yLjU0MjY5IDUuODgzOSwtNS43MzMxMyA5LjI1MTUxLC04LjE4Njg0YzQuNTI3OTEsLTMuMjk4ODQgOS43OTM2NSwtNS42NTQ1OCAxMy44MDI4MSwtNy4wMDMzN2M5LjE4Njg1LC0zLjA5MDY3IDE5LjcwNzcsLTMuMDA0MzggMjAuMDE3NzIsLTIuOTcwNTJjMC40MTI0LDAuMDQ0OTMgNS40MjYxOSwwLjA0Mzc3IDExLjI0MzUzLDEuMzI2MDFjMi43OTI4NCwwLjYxNTY5IDUuNzcwODQsMS44OTc1MSA4LjUxMzc1LDIuOTIzNjdjNC4yNTM3OSwxLjU5MTU5IDcuNzM3MTIsMy45OTEzOSAxMC45MjgyMSw2LjU2Njc4YzEuNjM2MjYsMS4zMjA1OSAzLjMyMjE0LDIuNjg3MTcgNS4yNTE3MSw0LjAxNDY5IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzYxY2JmZCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTE3Ny40MTUyNiwyMDMuNzU3MTFjMzQuODY0OCwzLjEzOTM2IDYwLjU3OTQ5LDMzLjk0NzUyIDU3LjQ0MDEzLDY4LjgxMDI1Yy0zLjEzOTM2LDM0Ljg2Mjc0IC0zMy45NDc1Miw2MC41Nzk0OSAtNjguODEyMzIsNTcuNDQwMTNjLTM0Ljg2MjEyLC0zLjE0MTQyIC02MC41Nzg2NywtMzMuOTQ5NTggLTU3LjQzODQ4LC02OC44MTIzMmMzLjE0MDM5LC0zNC44NjI3NCAzMy45NDc5MywtNjAuNTc5NDkgNjguODEwNjcsLTU3LjQzODA3eiIgZmlsbD0iI2I3ZThmYSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzYxY2JmZCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJNMTQ0LjkyNjQ5LDEyMi45MjQ3djExNC40NTYyNiIvPjxwYXRoIGQ9Ik0yMjUuMTUyODMsMTIyLjYxOTA0djExNC40NTYyNiIvPjxwYXRoIGQ9Ik0xNTAuMTkwODcsMTI4Ljc2NTZsNzEuNDU0NDYsMTAyLjAwMjA1Ii8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE0Ni4wMDk2OjE1Mi4yNjY5LS0+";
    const INPUT_ICON = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTczIiBoZWlnaHQ9IjE3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgb3ZlcmZsb3c9ImhpZGRlbiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOTAgLTcxNikiPjxwYXRoIGQ9Ik0xMTkwIDc3OS4xMzhDMTE5MCA3NDQuMjY4IDEyMTguMjcgNzE2IDEyNTMuMTQgNzE2TDEyOTkuODYgNzE2QzEzMzQuNzMgNzE2IDEzNjMgNzQ0LjI2OCAxMzYzIDc3OS4xMzhMMTM2MyA4MjQuODYyQzEzNjMgODU5LjczMiAxMzM0LjczIDg4OCAxMjk5Ljg2IDg4OEwxMjUzLjE0IDg4OEMxMjE4LjI3IDg4OCAxMTkwIDg1OS43MzIgMTE5MCA4MjQuODYyWiIgZmlsbD0iI0NBRUVGQiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTEyNzUuOTIgNzY4QzEyNzguMzYgNzY4LjIyMyAxMjc5LjcyIDc2OS41NTcgMTI4MCA3NzIuMDA1IDEyNzkuMjIgNzc1LjAwOSAxMjc1LjgzIDc4NC41NDkgMTI2OS44MyA4MDAuNjI1IDEyNjMuODMgODE2LjcgMTI1OS45NCA4MjcuMTMgMTI1OC4xNyA4MzEuOTE0IDEyNTcuNjEgODMzLjMwNSAxMjU2LjU4IDgzNCAxMjU1LjA4IDgzNCAxMjUyLjY0IDgzMy43NzcgMTI1MS4yOCA4MzIuNDQyIDEyNTEgODI5Ljk5NSAxMjUxLjc4IDgyNi44OCAxMjU1LjE3IDgxNy4zMjYgMTI2MS4xNyA4MDEuMzM0IDEyNjcuMTcgNzg1LjM0MSAxMjcxLjA4IDc3NC45MjUgMTI3Mi45MiA3NzAuMDg2IDEyNzMuNTMgNzY4LjY5NSAxMjc0LjUzIDc2OCAxMjc1LjkyIDc2OFoiIGZpbGw9IiMxMUIwRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xMjQxLjI2IDc4MkMxMjQ0LjExIDc4Mi4zNDUgMTI0NS42OCA3ODQuMDY5IDEyNDYgNzg3LjE3MyAxMjQ1Ljc0IDc5MC4wNDYgMTI0NC4yOSA3OTEuNjU1IDEyNDEuNjYgNzkyIDEyMzguOTIgNzkxLjcxMyAxMjM3LjM3IDc5MC4xMDQgMTIzNyA3ODcuMTczIDEyMzcuMTYgNzg0LjEyNyAxMjM4LjU4IDc4Mi40MDIgMTI0MS4yNiA3ODJaIiBmaWxsPSIjMTFCMEZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTI0MS4yNiA4MTRDMTI0NC4xMSA4MTQuMzExIDEyNDUuNjggODE1Ljg4OCAxMjQ2IDgxOC43MzMgMTI0NS43NCA4MjEuMzE5IDEyNDQuMjkgODIyLjc0MSAxMjQxLjY2IDgyMyAxMjM4Ljk3IDgyMi43OTMgMTIzNy40MiA4MjEuMzcxIDEyMzcgODE4LjczMyAxMjM3LjExIDgxNS45NCAxMjM4LjUzIDgxNC4zNjIgMTI0MS4yNiA4MTRaIiBmaWxsPSIjMTFCMEZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTI4My4xMSA4MjYgMTMxMy4xNSA4MjZDMTMxNS4yOCA4MjYuMTY5IDEzMTYuNTYgODI3LjMyMSAxMzE3IDgyOS40NTggMTMxNyA4MzEuNjUgMTMxNS45NiA4MzIuODMxIDEzMTMuODkgODMzTDEyODMuODUgODMzQzEyODEuNTYgODMyLjc3NSAxMjgwLjI3IDgzMS40NTQgMTI4MCA4MjkuMDM2IDEyODAuMTYgODI3LjEyNSAxMjgxLjIgODI2LjExMyAxMjgzLjExIDgyNloiIGZpbGw9IiMxMUIwRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48L3N2Zz4=";
    const A = Scratch.ArgumentType;
    const B = Scratch.BlockType;
    const Cast = Scratch.Cast || { toString: x => String(x), toNumber: x => Number(x), toBoolean: x => !!x };
    const clampLen = (s, n) => (String(s).length > n ? String(s).slice(0, n) : String(s));
    const isNumStr = (v) => {
        const s = String(v).trim();
        if (!s) return false;
        return /^-?\d+(\.\d+)?$/.test(s) && isFinite(Number(s));
    };
    const nowMs = () => Date.now();
    const PROTOCOL_ID = 'ningqiCollect';
    const NS_PREFIX = `☁ ${PROTOCOL_ID}.`;
    const MANIFEST_NAME = `${NS_PREFIX}_manifest`;
    const VERSION = '2.0.1';
    const MODE_MODAL = "显示确认窗";
    const MODE_IMMEDIATELY_SHOW_SELECTOR = "打开选择器";
    const MODE_ONLY_SELECTOR = "仅显示选择器";
    const ALL_MODES = [MODE_MODAL, MODE_IMMEDIATELY_SHOW_SELECTOR, MODE_ONLY_SELECTOR];
    const AS_TEXT = "txt";
    const AS_DATA_URL = "dataURL";
    let openFileSelectorMode = MODE_MODAL;
    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();
    const encodeBinary = (bytes) => {
        const buffer = new Uint8Array(Math.ceil((bytes.length * 8) / 3));
        let ptr = 0;

        for (var i = 0; i <= bytes.length - 3; i += 3) {
            const a = bytes[i];
            const b = bytes[i + 1];
            const c = bytes[i + 2];
            buffer[ptr++] = 49 + (a >> 5);
            buffer[ptr++] = 49 + ((a >> 2) & 0b111);
            buffer[ptr++] = 49 + (((a & 0b11) << 1) | (b >> 7));
            buffer[ptr++] = 49 + ((b >> 4) & 0b111);
            buffer[ptr++] = 49 + ((b >> 1) & 0b111);
            buffer[ptr++] = 49 + (((b & 0b1) << 2) | (c >> 6));
            buffer[ptr++] = 49 + ((c >> 3) & 0b111);
            buffer[ptr++] = 49 + (c & 0b111);
        }

        switch (bytes.length - i) {
            case 1: {
                const a = bytes[i];
                buffer[ptr++] = 49 + (a >> 5);
                buffer[ptr++] = 49 + ((a >> 2) & 0b111);
                buffer[ptr++] = 49 + ((a & 0b11) << 1);
                break;
            }

            case 2: {
                const a = bytes[i];
                const b = bytes[i + 1];
                buffer[ptr++] = 49 + (a >> 5);
                buffer[ptr++] = 49 + ((a >> 2) & 0b111);
                buffer[ptr++] = 49 + (((a & 0b11) << 1) | (b >> 7));
                buffer[ptr++] = 49 + ((b >> 4) & 0b111);
                buffer[ptr++] = 49 + ((b >> 1) & 0b111);
                buffer[ptr++] = 49 + ((b & 0b1) << 2);
                break;
            }
        }

        return textDecoder.decode(buffer);
    };

    const decodeBinary = (string) => {
        const encodedBytes = Math.floor((string.length * 3) / 8);
        const result = new Uint8Array(encodedBytes);
        let ptr = 0;

        for (var i = 0; i <= string.length - 8; i += 8) {
            const a = string.charCodeAt(i) - 49;
            const b = string.charCodeAt(i + 1) - 49;
            const c = string.charCodeAt(i + 2) - 49;
            const d = string.charCodeAt(i + 3) - 49;
            const e = string.charCodeAt(i + 4) - 49;
            const f = string.charCodeAt(i + 5) - 49;
            const g = string.charCodeAt(i + 6) - 49;
            const h = string.charCodeAt(i + 7) - 49;
            result[ptr++] = (a << 5) | (b << 2) | (c >> 1);
            result[ptr++] = ((c & 0b1) << 7) | (d << 4) | (e << 1) | (f >> 2);
            result[ptr++] = ((f & 0b11) << 6) | (g << 3) | h;
        }

        switch (encodedBytes - ptr) {
            case 1: {
                const a = string.charCodeAt(i) - 49;
                const b = string.charCodeAt(i + 1) - 49;
                const c = string.charCodeAt(i + 2) - 49;
                result[ptr] = (a << 5) | (b << 2) | (c >> 1);
                break;
            }

            case 2: {
                const a = string.charCodeAt(i) - 49;
                const b = string.charCodeAt(i + 1) - 49;
                const c = string.charCodeAt(i + 2) - 49;
                const d = string.charCodeAt(i + 3) - 49;
                const e = string.charCodeAt(i + 4) - 49;
                const f = string.charCodeAt(i + 5) - 49;
                result[ptr++] = (a << 5) | (b << 2) | (c >> 1);
                result[ptr] = ((c & 0b1) << 7) | (d << 4) | (e << 1) | (f >> 2);
                break;
            }
        }

        return result;
    };

    function encodeText(text, salt) {
        return encodeBinary(textEncoder.encode(String(text)));
    }

    function decodeText(numStr, salt) {
        const text = String(numStr);
        for (let i = 0; i < text.length; i++) {
            const ch = text.charCodeAt(i);
            if (ch < 49 || ch > 56) {
                return "";
            }
        }
        return textDecoder.decode(decodeBinary(text));
    }
    function md5(str) {
        function rotl(n, b) { return (n << b) | (n >>> (32 - b)); }
        function toHex(n) {
            let hexChars = '0123456789abcdef';
            let result = '';
            for (let i = 7; i >= 0; i--) {
                result += hexChars.charAt((n >>> (i * 4)) & 0x0f);
            }
            return result;
        }
        let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476;
        let strLen = str.length * 8;
        str += String.fromCharCode(0x80);
        while (str.length % 64 !== 56) str += String.fromCharCode(0x00);
        str += String.fromCharCode((strLen >>> 24) & 0xff, (strLen >>> 16) & 0xff, (strLen >>> 8) & 0xff, strLen & 0xff);
        for (let i = 0; i < str.length; i += 64) {
            let w = new Array(16);
            for (let j = 0; j < 16; j++) {
                w[j] = (str.charCodeAt(i + j * 4) << 24) | (str.charCodeAt(i + j * 4 + 1) << 16) | (str.charCodeAt(i + j * 4 + 2) << 8) | str.charCodeAt(i + j * 4 + 3);
            }
            let a = h0, b = h1, c = h2, d = h3;
            for (let j = 0; j < 64; j++) {
                let f, g;
                if (j < 16) { f = (b & c) | (~b & d); g = j; }
                else if (j < 32) { f = (d & b) | (~d & c); g = (5 * j + 1) % 16; }
                else if (j < 48) { f = b ^ c ^ d; g = (3 * j + 5) % 16; }
                else { f = c ^ (b | ~d); g = (7 * j) % 16; }
                let temp = d; d = c; c = b;
                b = (b + rotl(a + f + 0x5a827999 + w[g], 7)) & 0xffffffff;
                a = temp;
                [a, b, c, d, h0, h1, h2, h3] = [h0, h1, h2, h3, a, b, c, d];
            }
        }
        return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3);
    }
    const isCancelEventSupported = (input) => {
        if ("oncancel" in input) return true;
        return navigator.userAgent.includes("Firefox");
    };
    const showFilePrompt = (accept, as) =>
        new Promise((_resolve) => {
            const callback = (text) => {
                _resolve(text);
                if (Scratch.vm?.renderer) {
                    Scratch.vm.renderer.removeOverlay(outer);
                }
                if (Scratch.vm?.runtime) {
                    Scratch.vm.runtime.off("PROJECT_STOP_ALL", handleProjectStopped);
                }
                document.body.removeEventListener("keydown", handleKeyDown, { capture: true });
            };
            let isReadingFile = false;
            const readFile = (file) => {
                if (isReadingFile) return;
                isReadingFile = true;
                const reader = new FileReader();
                reader.onload = () => callback(reader.result);
                reader.onerror = () => { console.error("Failed to read file as text", reader.error); callback(""); };
                as === AS_TEXT ? reader.readAsText(file) : reader.readAsDataURL(file);
            };
            const handleKeyDown = (e) => {
                if (e.key === "Escape") { e.stopPropagation(); e.preventDefault(); callback(""); }
            };
            document.body.addEventListener("keydown", handleKeyDown, { capture: true });
            const handleProjectStopped = () => callback("");
            if (Scratch.vm?.runtime) {
                Scratch.vm.runtime.on("PROJECT_STOP_ALL", handleProjectStopped);
            }
            const INITIAL_BORDER_COLOR = "#888";
            const DROPPING_BORDER_COLOR = "#03a9fc";
            const outer = document.createElement("div");
            outer.style.pointerEvents = "auto";
            outer.style.width = "95%";
            outer.style.height = "105%";
            outer.style.display = "flex";
            outer.style.alignItems = "center";
            outer.style.justifyContent = "center";
            outer.style.background = "rgba(0, 0, 0, 0.5)";
            outer.style.color = "black";
            outer.style.colorScheme = "light";
            outer.addEventListener("dragover", (e) => {
                if (e.dataTransfer.types.includes("Files")) { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; modal.style.borderColor = DROPPING_BORDER_COLOR; }
            });
            outer.addEventListener("dragleave", () => modal.style.borderColor = INITIAL_BORDER_COLOR);
            outer.addEventListener("drop", (e) => {
                const file = e.dataTransfer.files[0];
                if (file) { e.preventDefault(); readFile(file); }
            });
            outer.addEventListener("click", (e) => { if (e.target === outer) callback(""); });
            const modal = document.createElement("button");
            modal.style.boxShadow = "0 0 10px -5px currentColor";
            modal.style.cursor = "pointer";
            modal.style.font = "inherit";
            modal.style.background = "white";
            modal.style.padding = "16px";
            modal.style.borderRadius = "16px";
            modal.style.border = `8px dashed ${INITIAL_BORDER_COLOR}`;
            modal.style.position = "relative";
            modal.style.textAlign = "center";
            modal.addEventListener("click", () => input.click());
            modal.focus();
            outer.appendChild(modal);
            const input = document.createElement("input");
            input.type = "file";
            input.accept = accept;
            input.addEventListener("change", (e) => { const file = e.target.files[0]; if (file) readFile(file); });
            const title = document.createElement("div");
            title.textContent = "选择或拖放文件";
            title.style.fontSize = "1.5em";
            title.style.marginBottom = "8px";
            modal.appendChild(title);
            const subtitle = document.createElement("div");
            const formattedAccept = accept || "任意格式";
            subtitle.textContent = `支持格式：${formattedAccept}`;
            modal.appendChild(subtitle);
            if (openFileSelectorMode === MODE_ONLY_SELECTOR && !isCancelEventSupported(input)) {
                openFileSelectorMode = MODE_IMMEDIATELY_SHOW_SELECTOR;
            }
            if (openFileSelectorMode !== MODE_ONLY_SELECTOR && Scratch.vm?.renderer) {
                const overlay = Scratch.vm.renderer.addOverlay(outer, "scale");
                overlay.container.style.zIndex = "100";
            }
            if (openFileSelectorMode === MODE_IMMEDIATELY_SHOW_SELECTOR || openFileSelectorMode === MODE_ONLY_SELECTOR) {
                input.click();
            }
            if (openFileSelectorMode === MODE_ONLY_SELECTOR) {
                input.addEventListener("cancel", () => callback(""));
            }
        });
    const downloadBlob = async (blob, file) => {
        const url = URL.createObjectURL(blob);
        try { await Scratch.download(url, file); } catch (e) { console.error(e); }
        URL.revokeObjectURL(url);
    };
    const isDataURL = (url) => {
        try { return new URL(url).protocol === "data:"; } catch (e) { return false; }
    };
    const downloadUntrustedURL = async (url, file) => {
        if (isDataURL(url)) return Scratch.download(url, file);
        const res = await Scratch.fetch(url);
        const blob = await res.blob();
        await downloadBlob(blob, file);
    };
    let count = 0;
    const times = [];
    let fps = Scratch.vm?.runtime?.frameLoop?.framerate || 30;
    if (Scratch.vm?.runtime?._step) {
        const oldStep = Scratch.vm.runtime._step;
        Scratch.vm.runtime._step = function () {
            oldStep.call(this);
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;
        };
    }
    const greenFlagURI = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M8 8L24 8L24 24L8 16Z' fill='%234CAF50'/%3E%3C/svg%3E";
    const TURBO_MODE = "turbo mode";
    const INTERPOLATION = "interpolation";
    const REMOVE_FENCING = "remove fencing";
    const REMOVE_MISC_LIMITS = "remove misc limits";
    const HIGH_QUALITY_PEN = "high quality pen";
    const FRAMERATE = "framerate";
    const CLONE_LIMIT = "clone limit";
    const STAGE_SIZE = "stage size";
    const USERNAME = "username";
    if (Scratch.vm) {
        const emitChanged = (what) => Scratch.vm.runtime?.startHats?.("runtimeoptions_whenChange", { WHAT: what });
        const shallowCopy = (obj) => Object.assign({}, obj);
        let previousRuntimeOptions = shallowCopy(Scratch.vm.runtime.runtimeOptions);
        Scratch.vm.on("TURBO_MODE_OFF", () => emitChanged(TURBO_MODE));
        Scratch.vm.on("TURBO_MODE_ON", () => emitChanged(TURBO_MODE));
        Scratch.vm.on("INTERPOLATION_CHANGED", () => emitChanged(INTERPOLATION));
        Scratch.vm.on("RUNTIME_OPTIONS_CHANGED", (newOptions) => {
            if (newOptions.fencing !== previousRuntimeOptions.fencing) emitChanged(REMOVE_FENCING);
            if (newOptions.miscLimits !== previousRuntimeOptions.miscLimits) emitChanged(REMOVE_MISC_LIMITS);
            if (newOptions.maxClones !== previousRuntimeOptions.maxClones) emitChanged(CLONE_LIMIT);
            previousRuntimeOptions = shallowCopy(newOptions);
        });
        if (Scratch.vm.renderer) {
            Scratch.vm.renderer.on("UseHighQualityRenderChanged", () => emitChanged(HIGH_QUALITY_PEN));
        }
        Scratch.vm.on("FRAMERATE_CHANGED", () => emitChanged(FRAMERATE));
        Scratch.vm.on("STAGE_SIZE_CHANGED", () => emitChanged(STAGE_SIZE));
        const originalPostData = Scratch.vm.runtime.ioDevices.userData.postData;
        Scratch.vm.runtime.ioDevices.userData.postData = function (data) {
            const newUsername = data.username !== this._username;
            originalPostData.call(this, data);
            if (newUsername) emitChanged(USERNAME);
        };
    }
    class Cloud {
        constructor() {
            this.server = 'wss://clouddata.turbowarp.org';
            this.projectId = 'cv-demo';
            this.username = 'Guest';
            this.ws = null;
            this.status = 'disconnected';
            this.values = new Map();
            this.updateFlags = new Map();
            this.lastSendAt = new Map();
            this.seed = 0;
            this._initialTimer = 0;
            this._sawAnyMessage = false;
            this._didInitialEdge = false;
        }
        toCloudName(name) {
            let n = String(name || '').trim();
            if (!n) n = 'var';
            let raw = `${NS_PREFIX}${n}`;
            return clampLen(raw, 128);
        }
        fromCloudName(cloudName) {
            const s = String(cloudName || '');
            return s.startsWith(NS_PREFIX) ? s.slice(NS_PREFIX.length) : null;
        }
        connect(optionalServer) {
            try {
                if (optionalServer) {
                    const s = String(optionalServer).trim();
                    if (/^wss?:\/\//i.test(s)) this.server = s;
                }
                if (this.ws) { try { this.ws.close(); } catch (e) {} this.ws = null; }
                const url = this.server.includes('?') ? this.server : `${this.server.replace(/\/?$/, '/')}?project_id=${encodeURIComponent(this.projectId)}`;
                this.status = 'connecting';
                this.seed = 0;
                this._didInitialEdge = false;
                this.values.clear();
                this.updateFlags.clear();
                this._sawAnyMessage = false;
                this.ws = new WebSocket(url);
                this.ws.onopen = () => {
                    this._send({ method: 'handshake', user: this.username, project_id: this.projectId });
                    this._scheduleInitialScan(600);
                };
                this.ws.onclose = () => { this._clearInitialScan(); if (this.status !== 'legacy-conflict') this.status = 'disconnected'; };
                this.ws.onerror = () => { this._clearInitialScan(); if (this.status !== 'legacy-conflict') this.status = 'error'; };
                this.ws.onmessage = (ev) => {
                    const lines = String(ev.data || '').split('\n').filter(Boolean);
                    if (lines.length) this._onAnyMessage();
                    for (const line of lines) {
                        let msg; try { msg = JSON.parse(line); } catch (e) { continue; }
                        this._handleMessage(msg);
                    }
                };
            } catch (e) {
                this.status = 'error';
            }
        }
        disconnect() {
            if (this.ws) { try { this.ws.close(); } catch (e) {} this.ws = null; }
            this._clearInitialScan();
            this.status = 'disconnected';
        }
        _send(obj) {
            if (!this.ws || this.ws.readyState !== 1) return false;
            try { this.ws.send(JSON.stringify(obj)); return true; } catch (e) { return false; }
        }
        _onAnyMessage() { this._scheduleInitialScan(300); }
        _scheduleInitialScan(ms) {
            if (this._initialTimer) { clearTimeout(this._initialTimer); this._initialTimer = 0; }
            this._initialTimer = setTimeout(() => { this._initialTimer = 0; this._evaluateNamespaceAndManifest(); }, ms);
        }
        _clearInitialScan() {
            if (this._initialTimer) { clearTimeout(this._initialTimer); this._initialTimer = 0; }
        }
        _handleMessage(msg) {
            const method = msg && msg.method;
            if (method === 'set' || method === 'update') {
                const cloudName = String(msg.name || '');
                const value = String(msg.value ?? '');
                if (!cloudName.startsWith('☁')) return;
                this.values.set(cloudName, value);
                const local = this.fromCloudName(cloudName);
                if (local) {
                    if (cloudName === MANIFEST_NAME) {
                        const m = String(value).match(/^2(\d{6})/);
                        if (m) this.seed = Number(m[1]);
                        return;
                    }
                    this._edge(local);
                }
            }
        }
        _evaluateNamespaceAndManifest() {
            if (!this.ws) return;
            let hasManifest = false;
            let cvCount = 0;
            let legacyCount = 0;
            for (const k of this.values.keys()) {
                if (k === MANIFEST_NAME) hasManifest = true;
                if (k.startsWith(NS_PREFIX)) cvCount++;
                else if (k.startsWith('☁')) legacyCount++;
            }
            if (legacyCount > 0 && !hasManifest) {
                this.status = 'legacy-conflict';
                try { this.ws.close(); } catch (e) {}
                this.ws = null;
                return;
            }
            if (!hasManifest && cvCount === 0 && legacyCount === 0) {
                const seed = Math.floor(100000 + Math.random() * 900000);
                this.seed = seed;
                const manifestVal = `2${String(seed).padStart(6, '0')}`;
                this._send({ method: 'set', name: MANIFEST_NAME, value: manifestVal });
                this.values.set(MANIFEST_NAME, manifestVal);
            }
            if (hasManifest && !this.seed) {
                const v = this.values.get(MANIFEST_NAME) || '';
                const m = String(v).match(/^2(\d{6})/);
                if (m) this.seed = Number(m[1]);
            }
            if (this.status === 'connecting' || this.status === 'disconnected' || this.status === 'error') {
                this.status = 'connected';
            }
            if (!this._didInitialEdge) {
                this._didInitialEdge = true;
                for (const k of this.values.keys()) {
                    if (k.startsWith(NS_PREFIX) && k !== MANIFEST_NAME) {
                        const local = this.fromCloudName(k);
                        if (local) this._edge(local);
                    }
                }
            }
        }
        _guard() { return this.status !== 'legacy-conflict' && this.ws && this.ws.readyState === 1; }
        createVar(name) {
            if (this.status === 'legacy-conflict') return;
            const cloudName = this.toCloudName(name);
            if (!this.values.has(cloudName)) this.values.set(cloudName, '0');
            this._send({ method: 'set', name: cloudName, value: String(this.values.get(cloudName)) });
            const local = this.fromCloudName(cloudName);
            if (local) this._edge(local);
        }
        deleteVar(name) {
            if (this.status === 'legacy-conflict') return;
            const cloudName = this.toCloudName(name);
            this.values.delete(cloudName);
        }
        setVar(name, value) {
            const cloudName = this.toCloudName(name);
            let v = String(value);
            if (!isNumStr(v)) v = encodeText(v, this.seed);
            if (v.length > 900) v = v.slice(0, 900);
            const now = nowMs();
            const last = this.lastSendAt.get(cloudName) || 0;
            if (now - last < 100) {
                this.values.set(cloudName, v);
                const local = this.fromCloudName(cloudName);
                if (local) this._edge(local);
                return;
            }
            if (this._guard()) {
                this.lastSendAt.set(cloudName, now);
                this.values.set(cloudName, v);
                this._send({ method: 'set', name: cloudName, value: String(v) });
            } else {
                this.values.set(cloudName, v);
            }
            const local = this.fromCloudName(cloudName);
            if (local) this._edge(local);
        }
        changeVar(name, delta) {
            const cloudName = this.toCloudName(name);
            const cur = Number(this.values.get(cloudName) || '0');
            const d = Cast.toNumber(delta) || 0;
            this.setVar(name, String(cur + d));
        }
        getVar(name) {
            const cloudName = this.toCloudName(name);
            return this.values.get(cloudName) ?? '0';
        }
        listNames() {
            const out = [];
            for (const k of this.values.keys()) {
                if (!k.startsWith(NS_PREFIX) || k === MANIFEST_NAME) continue;
                const short = this.fromCloudName(k);
                if (short) out.push(short);
            }
            out.sort((a, b) => a.localeCompare(b));
            return out.length ? out : ['(无)'];
        }
        _edge(localName) {
            const n = String(localName || '').trim();
            if (!n || n === '(无)') return;
            this.updateFlags.set(n, true);
        }
        pollUpdatedFlag(name) {
            const n = String(name || '').trim();
            if (!n || n === '(无)') return false;
            if (this.updateFlags.get(n)) {
                this.updateFlags.set(n, false);
                return true;
            }
            return false;
        }
    }
    const cloudRuntime = new Cloud();
    function makeIconURI() {
            return `data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMDkuMTk0NzIiIGhlaWdodD0iMzA0LjUzMzgxIiB2aWV3Qm94PSIwLDAsMzA5LjE5NDcyLDMwNC41MzM4MSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg0Ljk5MDQsLTI3LjczMzEpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik04NC45OTA0LDE1Ny4zODg3NWMwLC03MS42MDc0NCA1OC4wNDgyMiwtMTI5LjY1NTY1IDEyOS42NTU2NSwtMTI5LjY1NTY1YzcxLjYwNzQ0LDAgMTI5LjY1NTY1LDU4LjA0ODIyIDEyOS42NTU2NSwxMjkuNjU1NjVjMCw3MS42MDc0NCAtNTguMDQ4MjIsMTI5LjY1NTY1IC0xMjkuNjU1NjUsMTI5LjY1NTY1Yy03MS42MDc0NCwwIC0xMjkuNjU1NjUsLTU4LjA0ODIyIC0xMjkuNjU1NjUsLTEyOS42NTU2NXoiIGZpbGwtb3BhY2l0eT0iMC41ODAzOSIgZmlsbD0iIzAwOTlmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjAxLjA0MTQ4LDIwMC4wNTc2MmMwLC01My4zOTE3NCA0My4yMzU3MywtOTYuNjc0ODggOTYuNTcxODIsLTk2LjY3NDg4YzUzLjMzNjA5LDAgOTYuNTcxODIsNDMuMjgzMTQgOTYuNTcxODIsOTYuNjc0ODhjMCw1My4zOTE3NCAtNDMuMjM1NzMsOTYuNjc0ODggLTk2LjU3MTgyLDk2LjY3NDg4Yy01My4zMzYwOSwwIC05Ni41NzE4MiwtNDMuMjgzMTQgLTk2LjU3MTgyLC05Ni42NzQ4OHoiIGZpbGwtb3BhY2l0eT0iMC41ODAzOSIgZmlsbD0iIzAwOTlmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTY4LjQxNTI2LDIwNS43NTcxMWMzNC44NjQ4LDMuMTM5MzYgNjAuNTc5NDksMzMuOTQ3NTIgNTcuNDQwMTMsNjguODEwMjVjLTMuMTM5MzYsMzQuODYyNzQgLTMzLjk0NzUyLDYwLjU3OTQ5IC02OC44MTIzMiw1Ny40NDAxM2MtMzQuODYyMTIsLTMuMTQxNDIgLTYwLjU3ODY3LC0zMy45NDk1OCAtNTcuNDM4NDgsLTY4LjgxMjMyYzMuMTQwMzksLTM0Ljg2Mjc0IDMzLjk0NzkzLC02MC41Nzk0OSA2OC44MTA2NywtNTcuNDM4MDd6IiBmaWxsLW9wYWNpdHk9IjAuNTgwMzkiIGZpbGw9IiMwMDk5ZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTM0NS4wNzM1MSwyMTguNTgyMjNjLTAuMDM4MDksMS4wNzYyMiAtMy45NDIwNyw0LjY5MDM4IC04LjQzMzkxLDcuNTcwNjdjLTQuMzEwNTYsMi43NjM5OSAtOS4yMDA2MSw0LjgxNDIyIC05Ljk1OTg4LDUuMDcxMzNjLTQuMjg3NTIsMS40NTE5NCAtNi41ODcxLDIuNTc1NTIgLTExLjU2NzkzLDMuMzEwMDRjLTIuOTg2ODksMC40NDAzMSAtNi45Mzc4NSwwLjc0MDgxIC0xMi44NTk5OSwwLjg4Nzg1Yy0xNC41NjI4NSwwLjM2MTY2IC0zMC44ODM2MSwtOC43NjA2OCAtNDAuMzg1MTEsLTIwLjMxOTEyYy0xMC4xODgxNywtMTIuMzkzOTEgLTEyLjU1ODk1LC0yNy4wMzU2NCAtMTIuNTQwNTYsLTM0LjA1MDExYzAuMDA3NzMsLTIuODk5MDYgMC4yNDQ4OCwtMTAuNzY1MjIgMy4yNjgwNywtMTkuMzEwNDhjMi4yOTIsLTYuNDc4MzQgNS40Mjc3MywtMTMuMzQ3MjkgMTEuMDY0MDEsLTE4LjczODIxYzIuNjU4NDQsLTIuNTQyNjkgNS44ODM5LC01LjczMzEzIDkuMjUxNTEsLTguMTg2ODRjNC41Mjc5MSwtMy4yOTg4NCA5Ljc5MzY1LC01LjY1NDU4IDEzLjgwMjgxLC03LjAwMzM3YzkuMTg2ODUsLTMuMDkwNjcgMTkuNzA3NywtMy4wMDQzOCAyMC4wMTc3MiwtMi45NzA1MmMwLjQxMjQsMC4wNDQ5MyA1LjQyNjE5LDAuMDQzNzcgMTEuMjQzNTMsMS4zMjYwMWMyLjc5Mjg0LDAuNjE1NjkgNS43NzA4NCwxLjg5NzUxIDguNTEzNzUsMi45MjM2N2M0LjI1Mzc5LDEuNTkxNTkgNy43MzcxMiwzLjk5MTM5IDEwLjkyODIxLDYuNTY2NzhjMS42MzYyNiwxLjMyMDU5IDMuMzIyMTQsMi42ODcxNyA1LjI1MTcxLDQuMDE0NjkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJNMTM0LjkyNjQ5LDEyMi45MjQ3djExNC40NTYyNiIvPjxwYXRoIGQ9Ik0yMTUuMTUyODMsMTIyLjYxOTA0djExNC40NTYyNiIvPjxwYXRoIGQ9Ik0xNDAuMTkwODcsMTI4Ljc2NTZsNzEuNDU0NDYsMTAyLjAwMjA1Ii8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE1NS4wMDk2OjE1Mi4yNjY5MDAwMDAwMDAwNS0tPg==`
    }
    class ningqiCollectExtension {
        constructor() {
            this.isMeasuring = false;
            this.scratchRuntime = Scratch.vm?.runtime || null;
            this.MouseWheelSpeed = 0;
            this.wheelTimer = null;
            this.keypresslist = {};
            this.adaptive = false;
            this.observer = null;
            this._addevent();
            if (this.scratchRuntime) {
                this.scratchRuntime.on("BEFORE_EXECUTE", () => {
                    this.scratchRuntime.startHats("ningqiCollect_whileTrueFalse");
                });
            }
        }
        getInfo() {
            const icon = makeIconURI();
            return {
                id: 'ningqiCollect',
                name: 'ningqiCollection',
                color1: '#42A5F5',
                color2: '#2196F3',
                color3: '#1976D2',
                menuIconURI: icon,
                categories: [
                    { name: '工具集', color: '#2196F3' },
                    { id: 'cyberInputCategory',  color: '#2D82FF' }
                ],
                blocks: [
                    { opcode: 'labelCondition', blockType: B.LABEL, text: 'All in the Collection is ningqi [Collect]!!!', category: '工具集' },
                    { opcode: 'labelCollection', blockType: B.LABEL, text: 'Under "TW-A" mean is：', category: '工具集' },
                    { opcode: 'labelCondition', blockType: B.LABEL, text: 'Author in TurboWarp Expansion', category: '工具集' },

                    { opcode: 'labelCondition', blockType: B.LABEL, text: '条件交互 × TW-A', category: '工具集' },
                    { opcode: 'whenKeyString', blockType: B.HAT, blockIconURI: NC_ICON, text: '当按下[KEY_OPTION]键', arguments: { KEY_OPTION: { type: A.STRING, defaultValue: 'enter' } }, category: '工具集' },
                    { opcode: 'keyStringPressed', blockType: B.BOOLEAN, blockIconURI: NC_ICON,  text: '按下[KEY_OPTION]键?', arguments: { KEY_OPTION: { type: A.STRING, defaultValue: 'enter' } }, category: '工具集' },
                    { opcode: 'alertBlock', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: '弹出提示[STRING]', arguments: { STRING: { type: A.STRING, defaultValue: '即将加载！' } }, category: '工具集' },
                    { opcode: 'confirmationBlock', blockType: B.BOOLEAN, blockIconURI: NC_ICON,  text: '弹出确认框[STRING]', arguments: { STRING: { type: A.STRING, defaultValue: '是否加载？' } }, category: '工具集' },
                    { opcode: 'inputPromptBlock', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '弹出输入框[PROMPT] 默认值 [DEFAULT]', arguments: { PROMPT: { type: A.STRING, defaultValue: '请输入内容' }, DEFAULT: { type: A.STRING, defaultValue: '默认文本' } }, category: '工具集' },
                    { opcode: 'isPackaged', blockType: B.REPORTER,  blockIconURI: NC_ICON, text: '是打包作品？', category: '工具集' },
                    { opcode: 'returnCount', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '计数器', arguments: {}, category: '工具集' },
                    { opcode: 'incrementCountByNum', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将计数器增加[NUM]', arguments: { NUM: { type: A.NUMBER, defaultValue: 1 } }, category: '工具集' },
                    { opcode: 'decrementCountByNum', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将计数器减少[NUM]', arguments: { NUM: { type: A.NUMBER, defaultValue: 1 } }, category: '工具集' },
                    { opcode: 'setCount', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将计数器设为[NUM]', arguments: { NUM: { type: A.NUMBER, defaultValue: 0 } }, category: '工具集' },
                    { opcode: 'stringNotEqual', blockType: B.BOOLEAN, blockIconURI: NC_ICON, text: '[TEXT1]≠[TEXT2]', arguments: { TEXT1: { type: A.STRING, defaultValue: 'hi' }, TEXT2: { type: A.STRING, defaultValue: 'hi2' } }, category: '工具集' },
                    { opcode: 'whenTrueFalse', blockType: B.HAT, blockIconURI: NC_ICON, text: '当 [CONDITION] 变为 [STATE] ', isEdgeActivated: true, arguments: { CONDITION: { type: A.BOOLEAN }, STATE: { type: A.STRING, menu: 'boolean' } }, category: '工具集' },
                    { opcode: 'whileTrueFalse', blockType: B.HAT, blockIconURI: NC_ICON, text: '只要 [CONDITION] 为 [STATE]', isEdgeActivated: false, arguments: { CONDITION: { type: A.BOOLEAN }, STATE: { type: A.STRING, menu: 'boolean' } }, category: '工具集' },
                    { opcode: 'broadcastData', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '广播 [BROADCAST_OPTION] 并携带数据 [DATA]', arguments: { BROADCAST_OPTION: { type: null }, DATA: { type: A.STRING, defaultValue: '' } }, hideFromPalette: true, category: '工具集' },
                    { opcode: 'broadcastDataAndWait', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '广播 [BROADCAST_OPTION] 并携带数据 [DATA] 并等待', arguments: { BROADCAST_OPTION: { type: null }, DATA: { type: A.STRING, defaultValue: '' } }, hideFromPalette: true, category: '工具集' },
                    { blockType: B.XML, xml: '<block type="ningqiCollect_broadcastData"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block><block type="ningqiCollect_broadcastDataAndWait"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block>', category: '工具集' },
                    { opcode: 'receivedData', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '收到的数据', disableMonitor: true, allowDropAnywhere: true, category: '工具集' },
                    '---',
                    { opcode: 'labelString', blockType: B.LABEL, text: '字符串处理 × TW-A', category: '工具集' },
                    { opcode: 'lettersToOf', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '[STRING]的第[INPUTA]到第[INPUTB]个字符', arguments: { INPUTA: { type: A.NUMBER, defaultValue: '1' }, INPUTB: { type: A.NUMBER, defaultValue: '3' }, STRING: { type: A.STRING, defaultValue: '114514' } }, category: '工具集' },
                    { opcode: 'newlineCharacter', blockType: B.REPORTER,  blockIconURI: NC_ICON, text: '换行符', category: '工具集' },
                    { opcode: 'stringIfElse', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '如果[BOOLEAN]则[INPUTA]否则[INPUTB]', arguments: { BOOLEAN: { type: A.BOOLEAN, defaultValue: '' }, INPUTA: { type: A.STRING, defaultValue: '1' }, INPUTB: { type: A.STRING, defaultValue: '0' } }, category: '工具集' },
                    { opcode: 'encodeText', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '编码[TEXT]为数字', arguments: { TEXT: { type: A.STRING, defaultValue: 'Hi' } }, category: '工具集' },
                    { opcode: 'decodeText', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '解码[TEXT]为字符串', arguments: { TEXT: { type: A.STRING, defaultValue: '114514' } }, category: '工具集' },
                    { opcode: 'md5Hash', blockType: B.REPORTER,  blockIconURI: NC_ICON, text: 'MD5hash[TEXT]', arguments: { TEXT: { type: A.STRING, defaultValue: 'Hi' } }, category: '工具集' },
                    { opcode: 'color', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '[COLOR]的代码', arguments: { COLOR: { type: A.COLOR, defaultValue: '#29a9ff' } }, category: '工具集' },
                    { opcode: 'brightnessByColor', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '[color]的亮度', arguments: { color: { type: A.COLOR, defaultValue: '#29a9ff' } }, category: '工具集' },
                    { opcode: 'repeatTxtTimes', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '重复文字[TEXT][NUM]次', arguments: { TEXT: { type: A.STRING, defaultValue: 'Hi' }, NUM: { type: A.NUMBER, defaultValue: 2 } }, category: '工具集' },
                    { opcode: 'jsonParse', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '解析JSON[TEXT]', arguments: { TEXT: { type: A.STRING, defaultValue: '"Hi"' } }, category: '工具集' },
                    { opcode: 'json_vm_getlist', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '获取列表[list]', arguments: { list: { type: A.STRING, menu: 'get_list' } }, category: '工具集' },
                    { opcode: 'json_vm_setlist', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将[list]设为[json]', arguments: { list: { type: A.STRING, menu: 'get_list' }, json: { type: A.STRING, defaultValue: '["Hi","hi"]' } }, category: '工具集' },
                    '---',
                    { opcode: 'labelCloud', blockType: B.LABEL, blockIconURI: NC_ICON,  text: '10000why的云变量V2 × mini', category: '工具集' },
                    { opcode: 'connect', blockType: B.COMMAND, blockIconURI: NC_ICON,  text: '连接云服 [SERVER]', arguments: { SERVER: { type: A.STRING, defaultValue: 'wss://clouddata.turbowarp.org' } }, category: '工具集' },
                    { opcode: 'disconnect', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: '断开云服', category: '工具集' },
                    { opcode: 'status', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '连接状态', category: '工具集' },
                    { opcode: 'version', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '协议版本', category: '工具集' },
                    { opcode: 'getLatency', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: ' [SERVER] 的延迟', arguments: { SERVER: { type: A.STRING, defaultValue: 'wss://clouddata.turbowarp.org' } }, category: '工具集' },
                    { opcode: 'createVar', blockType: B.COMMAND, blockIconURI: NC_ICON,  text: '创建云变量 [NAME]', arguments: { NAME: { type: A.STRING, defaultValue: 'SChat' } }, category: '工具集' },
                    { opcode: 'deleteVar', blockType: B.COMMAND, blockIconURI: NC_ICON,  text: '删除云变量 [NAME]', arguments: { NAME: { type: A.STRING, menu: 'varNames' } }, category: '工具集' },
                    { opcode: 'setVar', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: '将 [NAME] 设为 [VAL]', arguments: { NAME: { type: A.STRING, menu: 'varNames' }, VAL: { type: A.STRING, defaultValue: '123' } }, category: '工具集' },
                    { opcode: 'changeVar', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: '将 [NAME] 增加 [DELTA]', arguments: { NAME: { type: A.STRING, menu: 'varNames' }, DELTA: { type: A.NUMBER, defaultValue: 1 } }, category: '工具集' },
                    { opcode: 'getVar', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '读取 [NAME]', arguments: { NAME: { type: A.STRING, menu: 'varNames' } }, category: '工具集' },
                    { opcode: 'onUpdated', blockType: B.HAT, isEdgeActivated: true, blockIconURI: NC_ICON,  text: '当 [NAME] 更新', arguments: { NAME: { type: A.STRING, menu: 'varNames' } }, category: '工具集' },
                    '---',
                    { opcode: 'labelAsset', blockType: B.LABEL, blockIconURI: NC_ICON,  text: '文件与资源管理 × TW-A', category: '工具集' },
                    { opcode: 'addSprite', blockType: B.COMMAND, blockIconURI: NC_ICON,  text: '从URL [URL] 加载角色', arguments: { URL: { type: A.STRING, defaultValue: '' } }, category: '工具集' },
                    { opcode: 'addCostume', blockType: B.COMMAND, blockIconURI: NC_ICON,  text: '从URL [URL] 加载造型 [NAME]', arguments: { URL: { type: A.STRING, defaultValue: '' }, NAME: { type: A.STRING, defaultValue: '造型1' } }, category: '工具集' },
                    { opcode: 'deleteSprite', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: '删除角色 [TARGET]', arguments: { TARGET: { type: A.STRING, menu: 'targets' } }, category: '工具集' },
                    { opcode: 'deleteCostume', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: '删除造型 [COSTUME]', arguments: { COSTUME: { type: A.STRING, defaultValue: '造型1' } }, category: '工具集' },
                    { opcode: 'deleteImage', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '删除角色[SPRITE]的造型[COSNAME]', arguments: { COSNAME: { type: A.STRING, defaultValue: '造型1' }, SPRITE: { type: A.STRING, defaultValue: '角色1' } }, category: '工具集' },
                    { opcode: 'getAllSprites', blockType: B.REPORTER,  blockIconURI: NC_ICON, text: '所有角色', category: '工具集' },
                    { opcode: 'getAllCostumes', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '所有造型', category: '工具集' },
                    { opcode: 'getAllSounds', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '所有声音', category: '工具集' },
                    { opcode: 'getSpriteName', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '角色名字', category: '工具集' },
                    { opcode: 'showPickerAs', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: "打开文件作为 [as] ", arguments: { as: { type: A.STRING, menu: 'encoding' } }, category: '工具集' },
                    { opcode: 'showPickerExtensionsAs', blockType: B.REPORTER,  blockIconURI: NC_ICON, text: "打开 [extension] 作为 [as] ", arguments: { extension: { type: A.STRING, defaultValue: ".txt" }, as: { type: A.STRING, menu: 'encoding' } }, category: '工具集' },
                    { opcode: 'download', blockType: B.COMMAND, blockIconURI: NC_ICON,  text: "下载 [text] 为 [file]", arguments: { text: { type: A.STRING, defaultValue: "你好！" }, file: { type: A.STRING, defaultValue: "保存.txt" } }, category: '工具集' },
                    { opcode: 'downloadURL', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: "将 URL [url] 下载为 [file]", arguments: { url: { type: A.STRING, defaultValue: "" }, file: { type: A.STRING, defaultValue: "保存2.txt" } }, category: '工具集' },
                    { opcode: 'setOpenMode', blockType: B.COMMAND,  blockIconURI: NC_ICON, text: "设置打开方式 [mode]", arguments: { mode: { type: A.STRING, defaultValue: MODE_MODAL, menu: "automaticallyOpen" } }, category: '工具集' },
                    { opcode: 'clonesBeingUsed', blockType: B.REPORTER, blockIconURI: NC_ICON,  text: '克隆体数量', category: '工具集' },
                    { opcode: 'isClone', blockType: B.BOOLEAN, blockIconURI: NC_ICON,  text: '是克隆体?', category: '工具集' },
                    { opcode: 'getfps', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '帧率', arguments: {}, category: '工具集' },
                    '---',
                    { opcode: 'labelRuntimeOptions', blockType: B.LABEL, text: '运行时选项 × TW-A', category: '工具集' },
                    { opcode: 'getFramerate', blockType: B.REPORTER,  blockIconURI: NC_ICON,text: '帧率限制', category: '工具集' },
                    { opcode: 'getCloneLimit', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '克隆限制', category: '工具集' },
                    { opcode: 'whenChange', blockType: B.EVENT, blockIconURI: NC_ICON, text: '当[WHAT]改变', isEdgeActivated: false, arguments: { WHAT: { type: A.STRING, menu: 'changeable' } }, category: '工具集' },
                    { opcode: 'greenFlag', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '点击绿旗[flag]', arguments: { flag: { type: A.IMAGE, dataURI: greenFlagURI } }, category: '工具集' },
                    { opcode: 'getDimension', blockType: B.REPORTER, blockIconURI: NC_ICON, text: '舞台[dimension]', arguments: { dimension: { type: A.STRING, defaultValue: 'width', menu: 'dimension' } }, category: '工具集' },
                    { opcode: 'getEnabled', blockType: B.BOOLEAN, blockIconURI: NC_ICON, text: '[thing]是否启用?', arguments: { thing: { type: A.STRING, defaultValue: TURBO_MODE, menu: 'thing' } }, category: '工具集' },
                    { opcode: 'setFramerate', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将帧率限制设为[fps]', arguments: { fps: { type: A.NUMBER, defaultValue: '30' } }, category: '工具集' },
                    { opcode: 'setCloneLimit', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将克隆限制设为[limit]', arguments: { limit: { type: A.NUMBER, defaultValue: '300', menu: 'clones' } }, category: '工具集' },
                    { opcode: 'setUsername', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将用户名设为[username]', arguments: { username: { type: A.STRING, defaultValue: '' } }, category: '工具集' },
                    { opcode: 'setEnabled', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将[thing]设为[enabled]', arguments: { thing: { type: A.STRING, defaultValue: TURBO_MODE, menu: 'thing' }, enabled: { type: A.STRING, defaultValue: 'true', menu: 'enabled' } }, category: '工具集' },
                    { opcode: 'setDimensions', blockType: B.COMMAND, blockIconURI: NC_ICON, text: '将舞台尺寸设为宽[width]高[height]', arguments: { width: { type: A.NUMBER, defaultValue: '480' }, height: { type: A.NUMBER, defaultValue: '360' } }, category: '工具集' },
                    '---',
                    '---',
                    { opcode: 'labelInput', blockType: B.LABEL, text: 'Cyberexplorer的输入框 × mini', category: 'cyberInputCategory' },
                    { opcode: 'setInputAdaptation', blockType: B.COMMAND, text: '设置自适应为[type]', blockIconURI: INPUT_ICON, arguments: { type: { type: A.STRING, menu: 'adaptationOptions', defaultValue: 'false' } }, category: 'cyberInputCategory' },
                    { opcode: 'createInput', blockType: B.COMMAND, text: '创建或修改[type]文本框并命名为[id]，X[x]Y[y]宽[width]高[height]内容[text]颜色[color]提示[texts]字体大小[size]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, type: { type: A.STRING, menu: 'inputTypes', defaultValue: 'single-line' }, x: { type: A.NUMBER, defaultValue: 0 }, y: { type: A.NUMBER, defaultValue: 0 }, width: { type: A.NUMBER, defaultValue: 100 }, height: { type: A.NUMBER, defaultValue: 20 }, text: { type: A.STRING, defaultValue: 'hello world!' }, color: { type: A.COLOR, defaultValue: '#000000' }, texts: { type: A.STRING, defaultValue: 'hello world!' }, size: { type: A.NUMBER, defaultValue: 16 } }, category: 'cyberInputCategory' },
                    { opcode: 'setInputTextAlign', blockType: B.COMMAND, text: '设置文本框[id]的对齐模式为[ALIGN]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, ALIGN: { type: A.STRING, menu: 'textAlignOptions', defaultValue: 'left' } }, category: 'cyberInputCategory' },
                    { opcode: 'deleteInput', blockType: B.COMMAND, text: '删除文本框[id]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' } }, category: 'cyberInputCategory' },
                    { opcode: 'getInputProperty', blockType: B.REPORTER, text: '获得文本框[id]的[type]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, type: { type: A.STRING, menu: 'inputProperties', defaultValue: 'content' } }, category: 'cyberInputCategory' },
                    { opcode: 'getNthInputProperty', blockType: B.REPORTER, text: '获取第 [num] 个输入框的 [type]', blockIconURI: INPUT_ICON, arguments: { num: { type: A.NUMBER, defaultValue: 1 }, type: { type: A.STRING, menu: 'inputProperties', defaultValue: 'content' } }, category: 'cyberInputCategory' },
                    { opcode: 'isInputFocused', blockType: B.BOOLEAN, text: '焦点是否在文本框[id]上', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' } }, category: 'cyberInputCategory' },
                    { opcode: 'focusOnInput', blockType: B.COMMAND, text: '将焦点聚焦在文本框[id]上', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' } }, category: 'cyberInputCategory' },
                    { opcode: 'deleteAllInputs', blockType: B.COMMAND, text: '删除所有文本框', blockIconURI: INPUT_ICON, category: 'cyberInputCategory' },
                    { opcode: 'inputCount', blockType: B.REPORTER, text: '文本框的数量', blockIconURI: INPUT_ICON, category: 'cyberInputCategory' },
                    { opcode: 'getMouseWheelSpeed', blockType: B.REPORTER, text: '鼠标滚轮速度', blockIconURI: INPUT_ICON, category: 'cyberInputCategory' },
                    { opcode: 'computeFontSize', blockType: B.REPORTER, text: '[resolution]分辨率下高[size]的字体大小', blockIconURI: INPUT_ICON, arguments: { resolution: { type: A.NUMBER, defaultValue: 480 }, size: { type: A.NUMBER, defaultValue: 16 } }, category: 'cyberInputCategory' },
                    { opcode: 'setInputProperty', blockType: B.COMMAND, text: '设置文本框[id]的[type]为[text]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, type: { type: A.STRING, menu: 'inputProperties', defaultValue: 'content' }, text: { type: A.STRING, defaultValue: 'new text' } }, category: 'cyberInputCategory' },
                    { opcode: 'setInputReadability', blockType: B.COMMAND, text: '设置文本框[id]为[read]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, read: { type: A.STRING, menu: 'readOptions', defaultValue: 'editable' } }, category: 'cyberInputCategory' },
                    { opcode: 'setFontWeight', blockType: B.COMMAND, text: '设置文本框[id]的字体粗细为[text]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, text: { type: A.STRING, menu: 'fontWeightOptions', defaultValue: 'normal' } }, category: 'cyberInputCategory' },
                    { opcode: 'setFontFamily', blockType: B.COMMAND, text: '设置文本框[id]字体为字体名[name]', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, name: { type: A.STRING, defaultValue: 'Arial' } }, category: 'cyberInputCategory' },
                    { opcode: 'setInputPassword', blockType: B.COMMAND, text: '设置文本框[id]为[password]框', blockIconURI: INPUT_ICON, arguments: { id: { type: A.STRING, defaultValue: 'i' }, password: { type: A.STRING, menu: 'passwordOptions', defaultValue: 'text' } }, category: 'cyberInputCategory' },
                ],
                menus: {
                    inputTypes: [
                        { text: Scratch.translate("single-line"), value: "single-line" },
                        { text: Scratch.translate("multi-line"), value: "multi-line" }
                    ],
                    inputProperties: [
                        { text: Scratch.translate("content"), value: "content" },
                        { text: Scratch.translate("color"), value: "color" },
                        { text: Scratch.translate("prompt"), value: "prompt" },
                        { text: Scratch.translate("font size"), value: "size" },
                        { text: Scratch.translate("scrollTop"), value: "scrollTop" },
                        { text: Scratch.translate("x position"), value: "x" },
                        { text: Scratch.translate("y position"), value: "y" },
                        { text: Scratch.translate("width"), value: "width" },
                        { text: Scratch.translate("height"), value: "height" },
                        { text: Scratch.translate("background"), value: "background" },
                        { text: Scratch.translate("css"), value: "css" }
                    ],
                    textAlignOptions: [
                        { text: Scratch.translate("left"), value: "left" },
                        { text: Scratch.translate("center"), value: "center" },
                        { text: Scratch.translate("right"), value: "right" }
                    ],
                    readOptions: [
                        { text: Scratch.translate("editable"), value: "editable" },
                        { text: Scratch.translate("uneditable"), value: "uneditable" }
                    ],
                    fontWeightOptions: [
                        { text: Scratch.translate("normal"), value: "normal" },
                        { text: Scratch.translate("bold"), value: "bold" },
                        { text: Scratch.translate("thin"), value: "thin" }
                    ],
                    passwordOptions: [
                        { text: Scratch.translate("textBlock"), value: "text" },
                        { text: Scratch.translate("password"), value: "password" }
                    ],
                    adaptationOptions: [
                        { text: Scratch.translate("enable"), value: "true" },
                        { text: Scratch.translate("disable"), value: "false" }
                    ],
                    boolean: { acceptReporters: false, items: [
                        { text: Scratch.translate("true"), value: "true" },
                        { text: Scratch.translate("false"), value: "false" }
                    ]},

                    varNames: { acceptReporters: true, items: 'listVarNamesDyn' },
                    encoding: { acceptReporters: true, items: [{ text: "txt", value: AS_TEXT }, { text: "dataURL", value: AS_DATA_URL }] },
                    automaticallyOpen: { acceptReporters: true, items: [
                        { text: "显示确认窗", value: MODE_MODAL },
                        { text: "打开选择器", value: MODE_IMMEDIATELY_SHOW_SELECTOR },
                        { text: "仅显示选择器", value: MODE_ONLY_SELECTOR }
                    ]},
                    targets: { acceptReporters: true, items: '_getTargets' },
                    get_list: { acceptReporters: true, items: "getLists" },
                    thing: { acceptReporters: true, items: [
                        { text: "加速模式", value: TURBO_MODE },
                        { text: "补帧", value: INTERPOLATION },
                        { text: "允许角色移出舞台", value: REMOVE_FENCING },
                        { text: "取消音效范围与画笔大小限制", value: REMOVE_MISC_LIMITS },
                        { text: "高清画笔", value: HIGH_QUALITY_PEN }
                    ]},
                    changeable: { acceptReporters: false, items: [
                        { text: "加速模式", value: TURBO_MODE },
                        { text: "补帧", value: INTERPOLATION },
                        { text: "允许角色移出舞台", value: REMOVE_FENCING },
                        { text: "取消音效范围与画笔大小限制", value: REMOVE_MISC_LIMITS },
                        { text: "高清画笔", value: HIGH_QUALITY_PEN },
                        { text: "帧率", value: FRAMERATE },
                        { text: "克隆限制", value: CLONE_LIMIT },
                        { text: "舞台尺寸", value: STAGE_SIZE },
                        { text: "用户名", value: USERNAME }
                    ]},
                    enabled: { acceptReporters: true, items: [
                        { text: "启用", value: "true" },
                        { text: "禁用", value: "false" }
                    ]},
                    clones: { acceptReporters: true, items: [
                        { text: "默认 (300)", value: "300" },
                        { text: "无限", value: "Infinity" }
                    ]},
                    dimension: { acceptReporters: true, items: [
                        { text: "宽度", value: "width" },
                        { text: "高度", value: "height" }
                    ]}
                }
            };
        }
        _adaptInputsToStage() {
            const inputs = document.querySelectorAll(".scratch-input-extension");
            const canvas = this.scratchRuntime?.renderer?.canvas;
            if (!canvas) return;
            const stageWidth = canvas.offsetWidth;
            const stageHeight = canvas.offsetHeight;
            const initialWidth = this.scratchRuntime.stageWidth || 480;
            const initialHeight = this.scratchRuntime.stageHeight || 360;
            const scaleX = stageWidth / initialWidth;
            const scaleY = stageHeight / initialHeight;
            inputs.forEach(input => {
                const originalStyles = JSON.parse(input.getAttribute("data-original-styles"));
                input.style.left = `${originalStyles.x * scaleX}px`;
                input.style.top = `${originalStyles.y * scaleY}px`;
                input.style.width = `${originalStyles.width * scaleX}px`;
                input.style.height = `${originalStyles.height * scaleY}px`;
                input.style.fontSize = `${originalStyles.fontSize * Math.min(scaleX, scaleY)}px`;
            });
        }
        _addevent() {
            document.addEventListener("keydown", (event) => {
                this.keypresslist[event.code] = true;
            });
            document.addEventListener("keyup", (event) => {
                delete this.keypresslist[event.code];
            });
            document.addEventListener("wheel", (e) => {
                this.MouseWheelSpeed = e.deltaY * -3;
                if (this.wheelTimer) clearTimeout(this.wheelTimer);
                this.wheelTimer = setTimeout(() => {
                    this.MouseWheelSpeed = 0;
                }, 100);
            });
        }
        createInput(args) {
            const { id, type, x, y, width, height, text, color, texts, size } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.remove();
            const newInput = document.createElement(type === "single-line" ? "input" : "textarea");
            newInput.id = `input-${id}`;
            newInput.value = text;
            newInput.placeholder = texts;
            newInput.style.position = "absolute";
            newInput.style.left = `${x}px`;
            newInput.style.top = `${y}px`;
            newInput.style.width = `${width}px`;
            newInput.style.height = `${height}px`;
            newInput.style.color = color;
            newInput.style.fontSize = `${size}px`;
            newInput.style.zIndex = 1000;
            newInput.style.backgroundColor = "transparent";
            newInput.style.border = "none";
            newInput.style.outline = "none";
            newInput.classList.add("scratch-input-extension");
            if (type === "multi-line") newInput.style.resize = "none";
            newInput.setAttribute("data-original-styles", JSON.stringify({
                x, y, width, height, fontSize: size
            }));
            const stageParent = this.scratchRuntime?.renderer?.canvas?.parentElement;
            if (stageParent) stageParent.appendChild(newInput);
            newInput.addEventListener("focus", function () {
                this.style.backgroundColor = "transparent";
                this.style.border = "none";
            });
            this._adaptInputsToStage();
        }
        setInputAdaptation(args) {
            if (!this.scratchRuntime?.renderer?.canvas) return;
            const enableAdaptation = args.type === "true";
            if (enableAdaptation) {
                if (!this.adaptive) {
                    const search = document.getElementsByClassName("scratch-input-extension");
                    const config = { attributes: true, childList: true, subtree: true, attributeFilter: ["style"] };
                    const callback = () => {
                        if (!this.scratchRuntime?.renderer?.canvas) return;
                        Array.prototype.map.call(search, (item) => {
                            const originalStyles = JSON.parse(item.getAttribute("data-original-styles"));
                            const stageWidth = this.scratchRuntime.renderer.canvas.offsetWidth;
                            const stageHeight = this.scratchRuntime.renderer.canvas.offsetHeight;
                            const initialWidth = this.scratchRuntime.stageWidth || 480;
                            const initialHeight = this.scratchRuntime.stageHeight || 360;
                            const scaleX = stageWidth / initialWidth;
                            const scaleY = stageHeight / initialHeight;
                            item.style.left = `${originalStyles.x * scaleX}px`;
                            item.style.top = `${originalStyles.y * scaleY}px`;
                            item.style.width = `${originalStyles.width * scaleX}px`;
                            item.style.height = `${originalStyles.height * scaleY}px`;
                            item.style.fontSize = `${originalStyles.fontSize * Math.min(scaleX, scaleY)}px`;
                        });
                    };
                    this.observer = new MutationObserver(callback);
                    this.observer.observe(this.scratchRuntime.renderer.canvas, config);
                    this.adaptive = true;
                }
            } else if (this.adaptive) {
                if (this.observer !== null) this.observer.disconnect();
                this.adaptive = false;
            }
        }
        setInputTextAlign(args) {
            const { id, ALIGN } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.style.textAlign = ALIGN;
        }
        getInputProperty(args) {
            const { id, type } = args;
            const input = document.getElementById(`input-${id}`);
            if (!input) return "";
            switch (type) {
                case "content": return input.value;
                case "color": return input.style.color;
                case "prompt": return input.placeholder;
                case "size": return parseFloat(input.style.fontSize);
                case "x": return parseFloat(input.style.left);
                case "y": return parseFloat(input.style.top);
                case "width": return parseFloat(input.style.width);
                case "height": return parseFloat(input.style.height);
                case "background": return input.style.backgroundColor;
                case "css": return input.getAttribute("style");
                case "scrollTop": return input.scrollTop;
                default: return "";
            }
        }
        isInputFocused(args) {
            const { id } = args;
            const input = document.getElementById(`input-${id}`);
            return document.activeElement === input;
        }
        focusOnInput(args) {
            const { id } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.focus();
        }
        deleteAllInputs() {
            const inputs = document.querySelectorAll(".scratch-input-extension");
            inputs.forEach(input => input.remove());
        }
        computeFontSize(args) {
            const { resolution, size } = args;
            const baseWidth = 480;
            const baseHeight = 360;
            const scale = Math.min(resolution / baseWidth, resolution / baseHeight);
            return size * scale;
        }
        inputCount() {
            return document.querySelectorAll(".scratch-input-extension").length;
        }
        getNthInputProperty(args) {
            const { num, type } = args;
            const inputs = document.querySelectorAll(".scratch-input-extension");
            const input = inputs[num - 1];
            if (!input) return "";
            switch (type) {
                case "content": return input.value;
                case "color": return input.style.color;
                case "prompt": return input.placeholder;
                case "size": return parseFloat(input.style.fontSize);
                case "x": return parseFloat(input.style.left);
                case "y": return parseFloat(input.style.top);
                case "width": return parseFloat(input.style.width);
                case "height": return parseFloat(input.style.height);
                case "background": return input.style.backgroundColor;
                case "css": return input.getAttribute("style");
                default: return "";
            }
        }
        deleteInput(args) {
            const { id } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.remove();
        }
        isKeyPressed(args) {
            const { type } = args;
            return this.keypresslist[type] || false;
        }
        getMouseWheelSpeed() {
            return this.MouseWheelSpeed;
        }
        setInputProperty(args) {
            const { id, type, text } = args;
            const input = document.getElementById(`input-${id}`);
            if (!input) return;
            switch (type) {
                case "content": input.value = text; break;
                case "color": input.style.color = text; break;
                case "prompt": input.placeholder = text; break;
                case "size": input.style.fontSize = `${text}px`; break;
                case "x": input.style.left = `${text}px`; break;
                case "y": input.style.top = `${text}px`; break;
                case "width": input.style.width = `${text}px`; break;
                case "height": input.style.height = `${text}px`; break;
                case "background": input.style.backgroundColor = text; break;
                case "css": input.setAttribute("style", text); break;
                case "scrollTop": if (input.scrollHeight > input.clientHeight) input.scrollTop = text; break;
            }
        }
        setInputReadability(args) {
            const { id, read } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.readOnly = read === "uneditable";
        }
        setFontWeight(args) {
            const { id, text } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.style.fontWeight = text;
        }
        setFontFamily(args) {
            const { id, name } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.style.fontFamily = name;
        }
        setInputPassword(args) {
            const { id, password } = args;
            const input = document.getElementById(`input-${id}`);
            if (input) input.type = password === "password" ? "password" : "text";
        }
        getStageWidth() {
            return this.scratchRuntime?.renderer?.canvas?.offsetWidth || 0;
        }
        getStageHeight() {
            return this.scratchRuntime?.renderer?.canvas?.offsetHeight || 0;
        }
        labelCondition() {}
        labelString() {}
        labelCloud() {}
        labelAsset() {}
        connect(args) { cloudRuntime.connect(Cast.toString(args.SERVER)); }
        disconnect() { cloudRuntime.disconnect(); }
        status() { return cloudRuntime.status; }
        version() { return `${PROTOCOL_ID}/${VERSION}`; }
        createVar(args) { cloudRuntime.createVar(Cast.toString(args.NAME)); }
        deleteVar(args) { const n = Cast.toString(args.NAME); if (n && n !== '(无)') cloudRuntime.deleteVar(n); }
        setVar(args) { cloudRuntime.setVar(Cast.toString(args.NAME), Cast.toString(args.VAL)); }
        changeVar(args) { cloudRuntime.changeVar(Cast.toString(args.NAME), Cast.toNumber(args.DELTA)); }
        getVar(args) { return cloudRuntime.getVar(Cast.toString(args.NAME)); }
        onUpdated(args) { return cloudRuntime.pollUpdatedFlag(Cast.toString(args.NAME)); }
        encodeText(args) { return encodeText(Cast.toString(args.TEXT), cloudRuntime.seed); }
        decodeText(args) { return decodeText(Cast.toString(args.TEXT), cloudRuntime.seed); }
        stringNotEqual(args) { return Cast.toString(args.TEXT1) !== Cast.toString(args.TEXT2); }
        whenTrueFalse(args) { return args.STATE === "true" ? args.CONDITION : !args.CONDITION; }
        whileTrueFalse(args) { return args.STATE === "true" ? args.CONDITION : !args.CONDITION; }
        broadcastData(args, util) {
            const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
            if (!broadcast) return;

            const data = Scratch.Cast.toString(args.DATA);

            let threads = util.startHats("event_whenbroadcastreceived", {
                BROADCAST_OPTION: broadcast,
            });
            threads.forEach((thread) => (thread.receivedData = data));
        }
        broadcastDataAndWait(args, util) {
            const data = Scratch.Cast.toString(args.DATA);

            if (!util.stackFrame.broadcastVar) {
                util.stackFrame.broadcastVar = Scratch.Cast.toString(args.BROADCAST_OPTION);
            }

            if (util.stackFrame.broadcastVar) {
                const broadcastOption = util.stackFrame.broadcastVar;
                if (!util.stackFrame.startedThreads) {
                    util.stackFrame.startedThreads = util.startHats(
                        "event_whenbroadcastreceived",
                        {
                            BROADCAST_OPTION: broadcastOption,
                        }
                    );
                    if (util.stackFrame.startedThreads.length === 0) {
                        return;
                    } else {
                        util.stackFrame.startedThreads.forEach(
                            (thread) => (thread.receivedData = data)
                        );
                    }
                }

                const waiting = util.stackFrame.startedThreads.some(
                    (thread) => this.scratchRuntime.threads.indexOf(thread) !== -1
                );
                if (waiting) {
                    if (
                        util.stackFrame.startedThreads.every((thread) =>
                            this.scratchRuntime.isWaitingThread(thread)
                        )
                    ) {
                        util.yieldTick();
                    } else {
                        util.yield();
                    }
                }
            }
        }
        receivedData(args, util) {
            const received = util.thread.receivedData;
            return received ? received : "";
        }
        listVarNamesDyn() { return cloudRuntime.listNames(); }
        md5Hash(args) { return md5(args.TEXT.trim()); }
        showPickerAs(args) { return showFilePrompt("", args.as); }
        showPickerExtensionsAs(args) { return showFilePrompt(args.extension, args.as); }
        async download(args) {
            try { await downloadBlob(new Blob([Cast.toString(args.text)]), Cast.toString(args.file)); } catch (e) { console.error(e); }
        }
        async downloadURL(args) {
            try { await downloadUntrustedURL(Cast.toString(args.url), Cast.toString(args.file)); } catch (e) { console.error(e); }
        }
        setOpenMode(args) {
            if (ALL_MODES.includes(args.mode)) openFileSelectorMode = args.mode;
            else console.warn(`未知模式`, args.mode);
        }
        isPackaged() {
            return Scratch.vm?.runtime?.isPackaged || false;
        }
        async getLatency(args) {
            if (this.isMeasuring) return -2;
            const serverUrl = args.SERVER;
            return new Promise((resolve) => {
                this.isMeasuring = true;
                const startTime = performance.now();
                try {
                    const ws = new WebSocket(serverUrl);
                    const timeout = setTimeout(() => {
                        ws.close();
                        this.isMeasuring = false;
                        resolve(-1);
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
                        resolve(-1);
                    };
                } catch (error) {
                    this.isMeasuring = false;
                    resolve(-1);
                }
            });
        }
        alertBlock(args) {
            alert(args.STRING);
        }
        confirmationBlock(args) {
            return confirm(args.STRING);
        }
        inputPromptBlock(args) {
            const promptText = Cast.toString(args.PROMPT);
            const defaultValue = Cast.toString(args.DEFAULT);
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = window.prompt(promptText, defaultValue);
                    resolve(result || '');
                }, 100);
            });
        }
        lettersToOf(args) {
            const string = args.STRING.toString();
            const start = args.INPUTA - 1;
            const end = args.INPUTB;
            return string.slice(start, end);
        }
        newlineCharacter() {
            return '\n';
        }
        clonesBeingUsed(args, util) {
            return Scratch.vm.runtime._cloneCounter;
        }
        isClone(args, util) {
            return util.target.isOriginal ? false : true;
        }
        stringIfElse(args) {
            return args.BOOLEAN ? args.INPUTA : args.INPUTB;
        }
        whenKeyString(args, util) {
            return util.ioQuery("keyboard", "getKeyIsDown", [args.KEY_OPTION]);
        }
        keyStringPressed(args, util) {
            return util.ioQuery("keyboard", "getKeyIsDown", [args.KEY_OPTION]);
        }
        async addSprite(args, util) {
            const url = Cast.toString(args.URL);
            const response = await Scratch.fetch(url);
            const json = await response.arrayBuffer();
            try {
                await Scratch.vm.addSprite(json);
            } catch (e) {
                console.error(e);
            }
        }
        async addCostume(args, util) {
            const targetId = util.target.id;
            const assetName = Cast.toString(args.NAME);
            const res = await Scratch.fetch(args.URL);
            const blob = await res.blob();
            if (!(this._typeIsBitmap(blob.type) || blob.type === "image/svg+xml")) {
                console.error(`Invalid MIME type: ${blob.type}`);
                return;
            }
            const runtime = Scratch.vm.runtime;
            const assetType = this._typeIsBitmap(blob.type)
                ? runtime.storage.AssetType.ImageBitmap
                : runtime.storage.AssetType.ImageVector;
            const dataType =
                blob.type === "image/svg+xml"
                    ? runtime.storage.DataFormat.SVG
                    : runtime.storage.DataFormat.PNG;
            const arrayBuffer = await new Promise((resolve, reject) => {
                const fr = new FileReader();
                fr.onload = () => resolve(fr.result);
                fr.onerror = () =>
                    reject(new Error(`Failed to read as array buffer: ${fr.error}`));
                fr.readAsArrayBuffer(blob);
            });
            const asset = runtime.storage.createAsset(
                assetType,
                dataType,
                new Uint8Array(arrayBuffer),
                null,
                true
            );
            const md5ext = `${asset.assetId}.${asset.dataFormat}`;
            try {
                await Scratch.vm.addCostume(
                    md5ext,
                    {
                        asset,
                        md5ext,
                        name: assetName,
                    },
                    targetId
                );
            } catch (e) {
                console.error(e);
            }
        }
        deleteSprite(args, util) {
            const target = this._getTargetFromMenu(args.TARGET, util);
            if (!target || target.isStage) return;
            Scratch.vm.deleteSprite(target.id);
        }
        deleteCostume(args, util) {
            const target = util.target;
            const costumeName = Cast.toString(args.COSTUME);
            const costumeIndex = target.getCostumeIndexByName(costumeName);
            if (costumeIndex < 0) return;
            if (target.sprite.costumes.length > 0) {
                target.deleteCostume(costumeIndex);
            }
        }
        getAllSprites() {
            const spriteNames = [];
            const targets = Scratch.vm.runtime.targets;
            for (const target of targets) {
                if (target.isOriginal && !target.isStage) {
                    spriteNames.push(target.sprite.name);
                }
            }
            return JSON.stringify(spriteNames);
        }
        getAllCostumes(args, util) {
            const costumeNames = [];
            const costumes = util.target.sprite.costumes;
            for (const costume of costumes) {
                costumeNames.push(costume.name);
            }
            return JSON.stringify(costumeNames);
        }
        getAllSounds(args, util) {
            const soundNames = [];
            const sounds = util.target.sprite.sounds;
            for (const sound of sounds) {
                soundNames.push(sound.name);
            }
            return JSON.stringify(soundNames);
        }
        getSpriteName(args, util) {
            return util.target.sprite.name ?? "";
        }
        _getTargets() {
            const spriteNames = [];
            if (Scratch.vm.editingTarget && !Scratch.vm.editingTarget.isStage) {
                spriteNames.push({
                    text: "myself",
                    value: "_myself_",
                });
            }
            const targets = Scratch.vm.runtime.targets;
            for (let index = 1; index < targets.length; index++) {
                const target = targets[index];
                if (target.isOriginal) {
                    spriteNames.push(target.getName());
                }
            }
            if (spriteNames.length > 0) {
                return spriteNames;
            } else {
                return [""];
            }
        }
        _getTargetFromMenu(targetName, util) {
            let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
            if (targetName === "_myself_") target = util.target.sprite.clones[0];
            return target;
        }
        _typeIsBitmap(type) {
            return (
                type === "image/png" ||
                type === "image/bmp" ||
                type === "image/jpg" ||
                type === "image/jpeg" ||
                type === "image/jfif" ||
                type === "image/webp" ||
                type === "image/gif"
            );
        }
        labelTools2() {}
        color(args) {
            return args.COLOR;
        }
        returnCount(args) {
            return count;
        }
        incrementCountByNum(args) {
            if (
                count.toString().indexOf("-") === -1 ||
                args.NUM.toString().indexOf("-") === -1
            ) {
                count += Math.floor(args.NUM);
            } else {
                count = 0;
            }
        }
        decrementCountByNum(args) {
            if ((count - Math.floor(args.NUM)).toString().indexOf("-") === -1) {
                count -= Math.floor(args.NUM);
            } else {
                count = 0;
            }
        }
        setCount(args) {
            if (
                count.toString().indexOf("-") === -1 &&
                args.NUM.toString().indexOf("-") === -1
            ) {
                count = Math.floor(args.NUM);
            } else {
                count = 0;
            }
        }
        repeatTxtTimes(args) {
            return Cast.toString(args.TEXT).repeat(Math.floor(args.NUM));
        }
        jsonParse(args) {
            try {
                const parsed = JSON.parse(args.TEXT);
                if (
                    typeof parsed === "string" ||
                    typeof parsed === "number" ||
                    typeof parsed === "boolean"
                ) {
                    return parsed;
                }
                return Cast.toString(parsed);
            } catch (e) {
                console.error(e);
                return Cast.toString((e && e.message) || e);
            }
        }
        getfps() {
            return fps;
        }
        brightnessByColor({ color }) {
            const { r, g, b } = Scratch.Cast.toRgbColorObject(color);
            return (r * 299 + g * 587 + b * 114) / 1000;
        }
        deleteImage({ SPRITE, COSNAME }) {
            const target = Scratch.vm.runtime.getSpriteTargetByName(SPRITE);
            if (!target) return;
            target.deleteCostume(target.getCostumeIndexByName(COSNAME));
        }
        getLists() {
            const globalLists = Object.values(
                Scratch.vm.runtime.getTargetForStage().variables
            ).filter((x) => x.type === "list");
            const localLists = Scratch.vm.editingTarget
                ? Object.values(Scratch.vm.editingTarget.variables).filter(
                    (x) => x.type === "list"
                )
                : [];
            const uniqueLists = [...new Set([...globalLists, ...localLists])];
            if (uniqueLists.length === 0) {
                return [
                    {
                        text: "请选择一个列表",
                        value: "select a list",
                    },
                ];
            }
            return uniqueLists.map((i) => ({
                text: i.name,
                value: i.id,
            }));
        }
        lookupList(list, util) {
            const byId = util.target.lookupVariableById(list);
            if (byId && byId.type === "list") {
                return byId;
            }
            const byName = util.target.lookupVariableByNameAndType(list, "list");
            if (byName) {
                return byName;
            }
            return null;
        }
        json_valid_return(json) {
            if (typeof json !== "string") {
                return json;
            } else if (
                (json.slice(0, 1) !== "[" || json.slice(-1) !== "]") &&
                (json.slice(0, 1) !== "{" || json.slice(-1) !== "}")
            ) {
                return json;
            } else {
                try {
                    return JSON.parse(json) ?? "";
                } catch {
                    return json;
                }
            }
        }
        _fixInvalidJSONValues(value) {
            if (Number.isNaN(value)) return "NaN";
            if (value === Infinity) return "Infinity";
            if (value === -Infinity) return "-Infinity";
            return value ?? "";
        }
        json_vm_getlist({ list }, util) {
            try {
                const listVariable = this.lookupList(list, util);
                if (listVariable) {
                    return JSON.stringify(listVariable.value);
                }
            } catch (e) {
            }
            return "";
        }
        json_vm_setlist({ list, json }, util) {
            try {
                const listVariable = this.lookupList(list, util);
                if (listVariable) {
                    const array = JSON.parse(json);
                    if (Array.isArray(array)) {
                        const safeArray = array.map((i) => {
                            if (typeof i === "object") return JSON.stringify(i);
                            return this._fixInvalidJSONValues(this.json_valid_return(i));
                        });
                        listVariable.value = safeArray;
                    }
                }
            } catch (e) {
            }
        }
        labelRuntimeOptions() {}
        getEnabled({ thing }) {
            if (!Scratch.vm) return false;
            if (thing === TURBO_MODE) {
                return Scratch.vm.runtime.turboMode;
            } else if (thing === INTERPOLATION) {
                return Scratch.vm.runtime.interpolationEnabled;
            } else if (thing === REMOVE_FENCING) {
                return !Scratch.vm.runtime.runtimeOptions.fencing;
            } else if (thing === REMOVE_MISC_LIMITS) {
                return !Scratch.vm.runtime.runtimeOptions.miscLimits;
            } else if (thing === HIGH_QUALITY_PEN && Scratch.vm.renderer) {
                return Scratch.vm.renderer.useHighQualityRender;
            }
            return false;
        }
        setEnabled({ thing, enabled }) {
            if (!Scratch.vm) return;
            enabled = Cast.toBoolean(enabled);
            if (thing === TURBO_MODE) {
                Scratch.vm.setTurboMode(enabled);
            } else if (thing === INTERPOLATION) {
                Scratch.vm.setInterpolation(enabled);
            } else if (thing === REMOVE_FENCING) {
                Scratch.vm.setRuntimeOptions({
                    fencing: !enabled,
                });
            } else if (thing === REMOVE_MISC_LIMITS) {
                Scratch.vm.setRuntimeOptions({
                    miscLimits: !enabled,
                });
            } else if (thing === HIGH_QUALITY_PEN && Scratch.vm.renderer) {
                Scratch.vm.renderer.setUseHighQualityRender(enabled);
            }
        }
        getFramerate() {
            return Scratch.vm?.runtime?.frameLoop?.framerate || 30;
        }
        setFramerate({ fps }) {
            if (!Scratch.vm) return;
            fps = Cast.toNumber(fps);
            Scratch.vm.setFramerate(fps);
        }
        getCloneLimit() {
            return Scratch.vm?.runtime?.runtimeOptions?.maxClones || 300;
        }
        setCloneLimit({ limit }) {
            if (!Scratch.vm) return;
            limit = Cast.toNumber(limit);
            Scratch.vm.setRuntimeOptions({
                maxClones: limit,
            });
        }
        getDimension({ dimension }) {
            if (!Scratch.vm) return 0;
            if (dimension === "width") {
                return Scratch.vm.runtime.stageWidth;
            } else if (dimension === "height") {
                return Scratch.vm.runtime.stageHeight;
            }
            return 0;
        }
        setDimensions({ width, height }) {
            if (!Scratch.vm) return;
            width = Cast.toNumber(width);
            height = Cast.toNumber(height);
            Scratch.vm.setStageSize(width, height);
        }
        setUsername({ username }) {
            if (!Scratch.vm) return;
            Scratch.vm.postIOData("userData", {
                username: Cast.toString(username),
            });
        }
        greenFlag() {
            if (!Scratch.vm) return;
            Scratch.vm.runtime.greenFlag();
        }
    }
    Scratch.extensions.register(new ningqiCollectExtension());
})(typeof Scratch === 'undefined' ? {} : Scratch);