//ningqi修改
// Name: Cyberexplorer's Input
// ID: cyberexplorertoolboxmini
// Author: Cyberexplorer(Code) , _KOSHINO_(Image)
// License: MIT
Scratch.translate.setup({
    "zh-cn": {
        "_Cyberexplorer's Toolbox": "赛博猫猫的输入框",
        "_Input": "输入框相关",
        "_create input [id] type [type] x [x] y [y] width [width] height [height] content [text] color [color] prompt [texts] size [size]": "创建或修改[type]文本框并命名为[id]，X[x]Y[y]宽[width]高[height]内容[text]颜色[color]提示[texts]字体大小[size]",
        "_delete input [id]": "删除文本框[id]",
        "_get [type] of input [id]": "获得文本框[id]的[type]",
        "_is input [id] focused": "焦点是否在文本框[id]上",
        "_focus on input [id]": "将焦点聚焦在文本框[id]上",
        "_delete all inputs": "删除所有文本框",
        "_[resolution] resolution font size [size]": "[resolution]分辨率下高[size]的字体大小",
        "_input count": "文本框的数量",
        "_input [num] [type]": "第 [num] 个输入框的 [type]",
        "_key [type] pressed": "按键[type]是否按下",
        "_mouse wheel speed": "鼠标滚轮速度",
        "_set [type] of input [id] to [text]": "设置文本框[id]的[type]为[text]",
        "_set input [id] to [read]": "设置文本框[id]为[read]",
        "_set font weight of input [id] to [text]": "设置文本框[id]的字体粗细为[text]",
        "_set font family of input [id] to [name]": "设置文本框[id]字体为字体名[name]",
        "_set input [id] to [password]": "设置文本框[id]为[password]框",
        "_get stage width": "获取舞台宽度",
        "_get stage height": "获取舞台高度",
        "_focal": "焦点",
        "_keyboard": "键盘",
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
        "_getStageHeight": "舞台分辨率高",
        "_getStageWidth": "舞台分辨率宽",
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
    "en": {
        "_Cyberexplorer's Toolbox": "Cyberexplorer's Input",
        "_Input": "Input",
        "_create input [id] type [type] x [x] y [y] width [width] height [height] content [text] color [color] prompt [texts] size [size]": "Create or modify [type] input named [id], X[x]Y[y] width[width] height[height] content[text] color[color] prompt[texts] font size[size]",
        "_delete input [id]": "Delete input [id]",
        "_get [type] of input [id]": "Get [type] of input [id]",
        "_is input [id] focused": "Is input [id] focused",
        "_focus on input [id]": "Focus on input [id]",
        "_delete all inputs": "Delete all inputs",
        "_[resolution] resolution font size [size]": "Font size [size] at [resolution] resolution",
        "_input count": "Input count",
        "_input [num] [type]": "Type of input [num]",
        "_key [type] pressed": "Is key [type] pressed",
        "_mouse wheel speed": "Mouse wheel speed",
        "_set [type] of input [id] to [text]": "Set [type] of input [id] to [text]",
        "_set input [id] to [read]": "Set input [id] to [read]",
        "_set font weight of input [id] to [text]": "Set font weight of input [id] to [text]",
        "_set font family of input [id] to [name]": "Set font family of input [id] to [name]",
        "_set input [id] to [password]": "Set input [id] to password",
        "_get stage width": "Get stage width",
        "_get stage height": "Get stage height",
        "_focal": "Focus",
        "_keyboard": "Keyboard",
        "_set text align of input [id] to [ALIGN]": "Set text align of input [id] to [ALIGN]",
        "_left": "Left",
        "_center": "Center",
        "_right": "Right",
        "_normal": "Normal",
        "_bold": "Bold",
        "_thin": "Thin",
        "_content": "Content",
        "_color": "Color",
        "_prompt": "Prompt",
        "_font size": "Font size",
        "_x position": "X position",
        "_y position": "Y position",
        "_width": "Width",
        "_height": "Height",
        "_background": "Background",
        "_css": "CSS",
        "_getStageHeight": "Get stage height",
        "_getStageWidth": "Get stage width",
        "_setInputAdaptation [type]": "Set input adaptation to [type]",
        "_scrollTop": "Scroll Top",
        "_enable": "Enable",
        "_disable": "Disable",
        "_single-line": "Single-line",
        "_multi-line": "Multi-line",
        "_editable": "Editable",
        "_uneditable": "Uneditable",
        "_textBlock": "Text",
        "_password": "Password"
    }
});

(function (Scratch) {
    "use strict";
    const EXT_ICON = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUzMyIgaGVpZ2h0PSIxNTMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBvdmVyZmxvdz0iaGlkZGVuIj48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB4PSIxMzQ4IiB5PSI1MDYiIHdpZHRoPSIxNTMzIiBoZWlnaHQ9IjE1MzIiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM0OCAtNTA2KSI+PHBhdGggZD0iTTAgNDEuMzU0MUMtOC43NzY2NmUtMTUgMTguNTE0OSAxOC41MTQ4LTguNzc2NjdlLTE1IDQxLjM1NDEgMEwxMDYxLjY1IDBDMTA4NC40OS04Ljc3NjY3ZS0xNSAxMTAzIDE4LjUxNDkgMTEwMyA0MS4zNTQxTDExMDMgNzQ2LjY0NkMxMTEwMyA3NjkuNDg1IDEwODQuNDkgNzg4IDEwNjEuNjUgNzg4TDQxLjM1NDEgNzg4QzE4LjUxNDggNzg4LTguNzc2NjZlLTE1IDc2OS40ODUgMCA3NDYuNjQ2WiIgZmlsbD0iIzJEODJGRiIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyNDUxIDEwODUpIi8+PHBhdGggZD0iTTE0NDcgNjU4LjI1NEMxNDQ3IDY5NC44NDUgMTU2NS42NSA3MjQuNTA4IDE3MTIuMDEgNzI0LjUwOCAxODU4LjM4IDcyNC41MDggMTk3Ny4wMyA2OTQuODQ1IDE5NzcuMDMgNjU4LjI1NEwxOTc3LjAzIDEyMzQuNzVDMTk3Ny4wMyAxMjcxLjM0IDE4NTguMzggMTMwMSAxNzEyLjAxIDEzMDEgMTU2NS42NSAxMzAxIDE0NDcgMTI3MS4zNCAxNDQ3IDEyMzQuNzVaIiBmaWxsPSIjQ0FFRUZCIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTQ0NyA2NTguMjU0QzE0NDcgNjIxLjY2MyAxNTY1LjY1IDU5MiAxNzEyLjAxIDU5MiAxODU4LjM4IDU5MiAxOTc3LjAzIDYyMS42NjMgMTk3Ny4wMyA2NTguMjU0IDE5NzcuMDMgNjk0Ljg0NSAxODU4LjM4IDcyNC41MDggMTcxMi4wMSA3MjQuNTA4IDE1NjUuNjUgNzI0LjUwOCAxNDQ3IDY5NC44NDUgMTQ0NyA2NTguMjU0WiIgZmlsbD0iI0RG RjVGRCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTE5NzcuMDMgNjU4LjI1NEMxOTc3LjAzIDY5NC44NDUgMTg1OC4zOCA3MjQuNTA4IDE3MTIuMDEgNzI0LjUwOCAxNTY1LjY1IDcyNC41MDggMTQ0NyA2OTQuODQ1IDE0NDcgNjU4LjI1NCAxNDQ3IDYyMS42NjMgMTU2NS42NSA1OTIgMTcxMi4wMSA1OTIgMTg1OC4zOCA1OTIgMTk3Ny4wMyA2MjEuNjYzIDE5NzcuMDMgNjU4LjI1NEwxOTc3LjAzIDEyMzQuNzVDMTk3Ny4wMyAxMjcxLjM0IDE4NTguMzggMTMwMSAxNzEyLjAxIDEzMDEgMTU2NS42NSAxMzAxIDE0NDcgMTI3MS4zNCAxNDQ3IDEyMzQuNzVMMTQ0NyA2NTguMjU0IiBzdHJva2U9IiNDOUVFRkIiIHN0cm9rZS13aWR0aD0iMjkuNzkxNyIgc3Ryb2tlLW1pdGVybGltaXQ9IjgiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xNDY5IDgyNC43NUMxNDY5IDg1OC44NTQgMTU3OS41OSA4ODYuNSAxNzE2IDg4Ni41IDE4NTIuNDEgODg2LjUgMTk2MyA4NTguODU0IDE5NjMgODI0Ljc1TTE5NjMgMTIxNi4yNUMxOTYzIDEyNTAuMzUgMTg1Mi40MSAxMjc4IDE3MTYgMTI3OCAxNTc5LjU5IDEyNzggMTQ2OSAxMjUwLjM1IDE0NjkgMTIxNi4yNVoiIGZpbGw9IiMxMUIwRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xNDY5IDgyNC43NUMxNDY5IDc5MC42NDYgMTU3OS41OSA3NjMgMTcxNiA3NjMgMTg1Mi40MSA3NjMgMTk2MyA3OTAuNjQ2IDE5NjMgODI0Ljc1IDE5NjMgODU4Ljg1NCAxODUyLjQxIDg4Ni41IDE3MTYgODg2LjUgMTU3OS41OSA4ODYuNSAxNDY5IDg1OC44NTQgMTQ2OSA4MjQuNzVaIiBmaWxsPSIjNzBEMEZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTQ2OSA5OTBDMTQ2OSAxMDE2LjY4IDE1MzEuMiAxMDM5LjU4IDE2MTkuODYgMTA0OS4zNiAxNjI3LjI0IDEwNTAuMTcgMTYzNC44MiAxMDUwLjkgMTY0Mi41NSAxMDUxLjUyIDE2NjUuNzUgMTA1My40MSAxNjkwLjQyIDEwNTQuNDIgMTcxNiAxMDU0LjQyIDE4NTIuNDEgMTA1NC40MiAxOTYzIDEwMjUuNTggMTk2MyA5OTBMMTk2MyAxMjEzLjU4QzE5NjMgMTI0OS4xNiAxODUyLjQxIDEyNzggMTcxNiAxMjc4IDE2OTAuNDIgMTI3OCAxNjY1Ljc1IDEyNzYuOTkgMTY0Mi41NSAxMjc1LjEgMTYzNC44MiAxMjc0LjQ4IDE2MjcuMjQgMTI3My43NSAxNjE5Ljg2IDEyNzIuOTQgMTUzMS4yIDEyNjMuMTYgMTQ2OSAxMjQwLjI2IDE0NjkgMTIxMy41OEwxNDY5IDk5MFoiIGZpbGw9IiMxMTdERkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xNDY5IDgyNi41QzE0NjkgNzkxLjQzIDE1NzkuNTkgNzYzIDE3MTYgNzYzIDE4NTIuNDEgNzYzIDE5NjMgNzkxLjQzIDE5NjMgODI2LjUgMTk2MyA4NjEuNTcgMTg1Mi40MSA4OTAgMTcxNiA4OTAgMTU3OS41OSA4OTAgMTQ2OSA4NjEuNTcgMTQ2OSA4MjYuNVoiIGZpbGw9IiNBM0UwRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48L3N2Zz4=";
    const INPUT_ICON = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTczIiBoZWlnaHQ9IjE3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgb3ZlcmZsb3c9ImhpZGRlbiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOTAgLTcxNikiPjxwYXRoIGQ9Ik0xMTkwIDc3OS4xMzhDMTE5MCA3NDQuMjY4IDEyMTguMjcgNzE2IDEyNTMuMTQgNzE2TDEyOTkuODYgNzE2QzEzMzQuNzMgNzE2IDEzNjMgNzQ0LjI2OCAxMzYzIDc3OS4xMzhMMTM2MyA4MjQuODYyQzEzNjMgODU5LjczMiAxMzM0LjczIDg4OCAxMjk5Ljg2IDg4OEwxMjUzLjE0IDg4OEMxMjE4LjI3IDg4OCAxMTkwIDg1OS43MzIgMTE5MCA4MjQuODYyWiIgZmlsbD0iI0NBRUVGQiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTEyNzUuOTIgNzY4QzEyNzguMzYgNzY4LjIyMyAxMjc5LjcyIDc2OS41NTcgMTI4MCA3NzIuMDA1IDEyNzkuMjIgNzc1LjAwOSAxMjc1LjgzIDc4NC41NDkgMTI2OS44MyA4MDAuNjI1IDEyNjMuODMgODE2LjcgMTI1OS45NCA4MjcuMTMgMTI1OC4xNyA4MzEuOTE0IDEyNTcuNjEgODMzLjMwNSAxMjU2LjU4IDgzNCAxMjU1LjA4IDgzNCAxMjUyLjY0IDgzMy43NzcgMTI1MS4yOCA4MzIuNDQyIDEyNTEgODI5Ljk5NSAxMjUxLjc4IDgyNi44OCAxMjU1LjE3IDgxNy4zMjYgMTI2MS4xNyA4MDEuMzM0IDEyNjcuMTcgNzg1LjM0MSAxMjcxLjA4IDc3NC45MjUgMTI3Mi45MiA3NzAuMDg2IDEyNzMuNTMgNzY4LjY5NSAxMjc0LjUzIDc2OCAxMjc1LjkyIDc2OFoiIGZpbGw9IiMxMUIwRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xMjQxLjI2IDc4MkMxMjQ0LjExIDc4Mi4zNDUgMTI0NS42OCA3ODQuMDY5IDEyNDYgNzg3LjE3MyAxMjQ1Ljc0IDc5MC4wNDYgMTI0NC4yOSA3OTEuNjU1IDEyNDEuNjYgNzkyIDEyMzguOTIgNzkxLjcxMyAxMjM3LjM3IDc5MC4xMDQgMTIzNyA3ODcuMTczIDEyMzcuMTYgNzg0LjEyNyAxMjM4LjU4IDc4Mi40MDIgMTI0MS4yNiA3ODJaIiBmaWxsPSIjMTFCMEZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTI0MS4yNiA4MTRDMTI0NC4xMSA4MTQuMzExIDEyNDUuNjggODE1Ljg4OCAxMjQ2IDgxOC43MzMgMTI0NS43NCA4MjEuMzE5IDEyNDQuMjkgODIyLjc0MSAxMjQxLjY2IDgyMyAxMjM4Ljk3IDgyMi43OTMgMTIzNy40MiA4MjEuMzcxIDEyMzcgODE4LjczMyAxMjM3LjExIDgxNS45NCAxMjM4LjUzIDgxNC4zNjIgMTI0MS4yNiA4MTRaIiBmaWxsPSIjMTFCMEZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTI4My4xMSA4MjYgMTMxMy4xNSA4MjZDMTMxNS4yOCA4MjYuMTY5IDEzMTYuNTYgODI3LjMyMSAxMzE3IDgyOS40NTggMTMxNyA4MzEuNjUgMTMxNS45NiA4MzIuODMxIDEzMTMuODkgODMzTDEyODMuODUgODMzQzEyODEuNTYgODMyLjc3NSAxMjgwLjI3IDgzMS40NTQgMTI4MCA4MjkuMDM2IDEyODAuMTYgODI3LjEyNSAxMjgxLjIgODI2LjExMyAxMjgzLjExIDgyNloiIGZpbGw9IiMxMUIwRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48L3N2Zz4=";

    class cyberexplorertoolboxmini {
        constructor(runtime) {
            this.runtime = runtime;
            this.MouseWheelSpeed = 0;
            this.wheelTimer = null;
            this.keypresslist = {};
            this.adaptive = false;
            this.observer = null;
            this._addevent();
        }

        getInfo() {
            return {
                id: "cyberexplorertoolboxmini",
                name: Scratch.translate("Cyberexplorer's Toolbox"),
                menuIconURI: EXT_ICON,
                color1: "#2196F3",
                color2: "#1976D2",
                color3: "#1565C0",
                blocks: [
                    {
                        blockType: "label",
                        text: Scratch.translate("Input")
                    },
                    {
                        opcode: "setInputAdaptation",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("setInputAdaptation [type]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            type: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "adaptationOptions",
                                defaultValue: "false"
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("create input [id] type [type] x [x] y [y] width [width] height [height] content [text] color [color] prompt [texts] size [size]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            type: { type: Scratch.ArgumentType.STRING, menu: "inputTypes", defaultValue: "single-line" },
                            x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                            height: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
                            text: { type: Scratch.ArgumentType.STRING, defaultValue: "hello world!" },
                            color: { type: Scratch.ArgumentType.COLOR, defaultValue: "#000000" },
                            texts: { type: Scratch.ArgumentType.STRING, defaultValue: "hello world!" },
                            size: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 }
                        },
                        opcode: "createInput"
                    },
                    {
                        opcode: "setInputTextAlign",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set text align of input [id] to [ALIGN]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            ALIGN: { type: Scratch.ArgumentType.STRING, menu: "textAlignOptions", defaultValue: "left" }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("delete input [id]"),
                        blockIconURI: INPUT_ICON,
                        arguments: { id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" } },
                        opcode: "deleteInput"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("get [type] of input [id]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            type: { type: Scratch.ArgumentType.STRING, menu: "inputProperties", defaultValue: "content" }
                        },
                        opcode: "getInputProperty"
                    },
                    {
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("is input [id] focused"),
                        blockIconURI: INPUT_ICON,
                        arguments: { id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" } },
                        opcode: "isInputFocused"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("focus on input [id]"),
                        blockIconURI: INPUT_ICON,
                        arguments: { id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" } },
                        opcode: "focusOnInput"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("delete all inputs"),
                        blockIconURI: INPUT_ICON,
                        opcode: "deleteAllInputs"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("[resolution] resolution font size [size]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            resolution: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
                            size: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 }
                        },
                        opcode: "computeFontSize"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("input count"),
                        blockIconURI: INPUT_ICON,
                        opcode: "inputCount"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("input [num] [type]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            type: { type: Scratch.ArgumentType.STRING, menu: "inputProperties", defaultValue: "content" }
                        },
                        opcode: "getNthInputProperty"
                    },
                    {
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("key [type] pressed"),
                        blockIconURI: INPUT_ICON,
                        arguments: { type: { type: Scratch.ArgumentType.STRING, defaultValue: "KeyA" } },
                        opcode: "isKeyPressed"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("mouse wheel speed"),
                        blockIconURI: INPUT_ICON,
                        opcode: "getMouseWheelSpeed"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set [type] of input [id] to [text]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            type: { type: Scratch.ArgumentType.STRING, menu: "inputProperties", defaultValue: "content" },
                            text: { type: Scratch.ArgumentType.STRING, defaultValue: "new text" }
                        },
                        opcode: "setInputProperty"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set input [id] to [read]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            read: { type: Scratch.ArgumentType.STRING, menu: "readOptions", defaultValue: "editable" }
                        },
                        opcode: "setInputReadability"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set font weight of input [id] to [text]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            text: { type: Scratch.ArgumentType.STRING, menu: "fontWeightOptions", defaultValue: "normal" }
                        },
                        opcode: "setFontWeight"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set font family of input [id] to [name]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            name: { type: Scratch.ArgumentType.STRING, defaultValue: "Arial" }
                        },
                        opcode: "setFontFamily"
                    },
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set input [id] to [password]"),
                        blockIconURI: INPUT_ICON,
                        arguments: {
                            id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
                            password: { type: Scratch.ArgumentType.STRING, menu: "passwordOptions", defaultValue: "text" }
                        },
                        opcode: "setInputPassword"
                    },
                    {
                        opcode: "getStageHeight",
                        blockType: Scratch.BlockType.REPORTER,
                        blockIconURI: INPUT_ICON,
                        text: Scratch.translate("getStageHeight")
                    },
                    {
                        opcode: "getStageWidth",
                        blockType: Scratch.BlockType.REPORTER,
                        blockIconURI: INPUT_ICON,
                        text: Scratch.translate("getStageWidth")
                    }
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
                    ]
                }
            };
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
            const stageParent = this.runtime.renderer.canvas.parentElement;
            stageParent.appendChild(newInput);
            newInput.addEventListener("focus", function () {
                this.style.backgroundColor = "transparent";
                this.style.border = "none";
            });
            this._adaptInputsToStage();
        }

        _adaptInputsToStage() {
            const inputs = document.querySelectorAll(".scratch-input-extension");
            const canvas = this.runtime.renderer.canvas;
            const stageWidth = canvas.offsetWidth;
            const stageHeight = canvas.offsetHeight;
            const initialWidth = this.runtime.stageWidth || 480;
            const initialHeight = this.runtime.stageHeight || 360;
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

        setInputAdaptation(args) {
            if (this.runtime.renderer.canvas === null) return;
            const enableAdaptation = args.type === "true";
            if (enableAdaptation) {
                if (!this.adaptive) {
                    const search = document.getElementsByClassName("scratch-input-extension");
                    const config = { attributes: true, childList: true, subtree: true, attributeFilter: ["style"] };
                    const callback = () => {
                        if (this.runtime.renderer.canvas === null) return;
                        Array.prototype.map.call(search, (item) => {
                            const originalStyles = JSON.parse(item.getAttribute("data-original-styles"));
                            const stageWidth = this.runtime.renderer.canvas.offsetWidth;
                            const stageHeight = this.runtime.renderer.canvas.offsetHeight;
                            const initialWidth = this.runtime.stageWidth || 480;
                            const initialHeight = this.runtime.stageHeight || 360;
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
                    this.observer.observe(this.runtime.renderer.canvas, config);
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
            return this.runtime.renderer.canvas.offsetWidth;
        }

        getStageHeight() {
            return this.runtime.renderer.canvas.offsetHeight;
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
    }

    Scratch.extensions.register(new cyberexplorertoolboxmini(Scratch.vm.runtime));
})(Scratch);