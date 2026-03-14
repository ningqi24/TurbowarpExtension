(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must be run unsandboxed");
  }

  class BitMapExtension {
    constructor() {
      this.images = new Map();
    }

    getInfo() {
      return {
        id: "bitmapextension",
        name: "BitMap",
        blocks: [
          {
            opcode: "loadImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "从 [URL] 加载图像 作为id [ID]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "URL",
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
            },
          },
          {
            opcode: "createImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "创建空白图像 id[ID] 宽度[WIDTH] 高度[HEIGHT]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "getPixelColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "图像id[ID] 在像素 (X: [X], Y: [Y]) 处的[COLOR]值",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              COLOR: {
                type: Scratch.ArgumentType.STRING,
                menu: "colorChannelMenu",
                defaultValue: "rgba",
              },
            },
          },
          {
            opcode: "setPixelColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "将图像id[ID] 在像素 (X: [X], Y: [Y]) 处的[RGB] 设置为 [COLOR]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              RGB: {
                type: Scratch.ArgumentType.STRING,
                menu: "colorChannelMenu",
                defaultValue: "rgba",
              },
              COLOR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "#ff0000ff",
              },
            },
          },
          {
            opcode: "getImageDataURL",
            blockType: Scratch.BlockType.REPORTER,
            text: "图像id[ID] 的DataURL",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
            },
          },
          {
            opcode: "clearImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "清空图像id[ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
            },
          },
          {
            opcode: "listImages",
            blockType: Scratch.BlockType.REPORTER,
            text: "所有图像id",
          },
          {
            opcode: "imageExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "图像id[ID] 是否存在",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
            },
          },
          {
            opcode: "getImageInfo",
            blockType: Scratch.BlockType.REPORTER,
            text: "图像id[ID] 的[INFO]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              INFO: {
                type: Scratch.ArgumentType.STRING,
                menu: "imageInfoMenu",
                defaultValue: "width",
              },
            },
          },
          {
            opcode: "deleteImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除图像id[ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
            },
          },
          {
            opcode: "getSliceDataURL",
            blockType: Scratch.BlockType.REPORTER,
            text: "图像id[ID] 切片 宽度[SLICE_WIDTH] 高度[SLICE_HEIGHT] ([X],[Y])切片的DataURL",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              SLICE_WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 32,
              },
              SLICE_HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 32,
              },
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
            opcode: "getSliceCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "图像id[ID] 切片 宽度[SLICE_WIDTH] 高度[SLICE_HEIGHT] 的切片总数",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              SLICE_WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 32,
              },
              SLICE_HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 32,
              },
            },
          },
          {
            opcode: "getRegionDataURL",
            blockType: Scratch.BlockType.REPORTER,
            text: "在 图像id[ID] 截取 从(X:[X], Y:[Y])开始 宽度[WIDTH] 高度[HEIGHT] 的图像的DataURL",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "image1",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "copyImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "将图像 [SOURCE_ID] 复制到 [TARGET_ID] 的位置 (X:[X], Y:[Y])",
            arguments: {
              SOURCE_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sourceImage",
              },
              TARGET_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "targetImage",
              },
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
        ],
        menus: {
          imageInfoMenu: {
            acceptReporters: true,
            items: [
              { text: "宽度", value: "width" },
              { text: "高度", value: "height" },
            ],
          },
          colorChannelMenu: {
            acceptReporters: true,
            items: [
              { text: "红色", value: "r" },
              { text: "绿色", value: "g" },
              { text: "蓝色", value: "b" },
              { text: "透明度", value: "a" },
              { text: "RGB", value: "rgb" },
              { text: "RGBA", value: "rgba" },
            ],
          },
        },
      };
    }

    _parseColor(channel, colorStr, currentColor = null) {
      if (colorStr === undefined || colorStr === null || colorStr === "") {
        return currentColor || { r: 0, g: 0, b: 0, a: 255 };
      }
      if (
        channel === "r" ||
        channel === "g" ||
        channel === "b" ||
        channel === "a"
      ) {
        let value = parseInt(colorStr);
        if (isNaN(value)) value = 0;
        value = Math.max(0, Math.min(255, value));
        const result = currentColor
          ? { ...currentColor }
          : { r: 0, g: 0, b: 0, a: 255 };
        if (channel === "r") result.r = value;
        else if (channel === "g") result.g = value;
        else if (channel === "b") result.b = value;
        else if (channel === "a") result.a = value;
        return result;
      }
      if (colorStr.startsWith("#")) {
        const hex = colorStr.substring(1);
        let r = 0,
          g = 0,
          b = 0,
          a = 255;
        if (hex.length === 3) {
          r = parseInt(hex[0] + hex[0], 16);
          g = parseInt(hex[1] + hex[1], 16);
          b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        } else if (hex.length === 8) {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
          a = parseInt(hex.substring(6, 8), 16);
        }
        return { r, g, b, a };
      }
      if (colorStr.startsWith("rgb")) {
        const match = colorStr.match(
          /rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)/i,
        );
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          let a = 255;
          if (match[4]) {
            a = Math.round(parseFloat(match[4]) * 255);
          }
          return { r, g, b, a };
        }
      }
      return currentColor || { r: 0, g: 0, b: 0, a: 255 };
    }

    loadImage(args) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const id = args.ID;
        const url = args.URL;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          this.images.set(id, canvas);
          resolve();
        };
        img.onerror = () => {
          reject(new Error("无法加载图像"));
        };
        img.src = url;
      });
    }

    createImage(args) {
      const id = args.ID;
      const width = Math.max(1, Math.floor(args.WIDTH));
      const height = Math.max(1, Math.floor(args.HEIGHT));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      this.images.set(id, canvas);
    }

    getPixelColor(args) {
      const id = args.ID;
      const x = Math.floor(args.X);
      const y = Math.floor(args.Y);
      const colorType = args.COLOR;
      if (!this.images.has(id)) return "";
      const canvas = this.images.get(id);
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
        return colorType === "rgba"
          ? "#00000000"
          : colorType === "rgb"
            ? "#000000"
            : 0;
      }
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      const r = imageData[0];
      const g = imageData[1];
      const b = imageData[2];
      const a = imageData[3];
      switch (colorType) {
        case "r":
          return r;
        case "g":
          return g;
        case "b":
          return b;
        case "a":
          return a;
        case "rgb":
          return (
            "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")
          );
        case "rgba":
          return (
            "#" +
            [r, g, b, a].map((c) => c.toString(16).padStart(2, "0")).join("")
          );
        default:
          return "";
      }
    }

    setPixelColor(args) {
      const id = args.ID;
      const x = Math.floor(args.X);
      const y = Math.floor(args.Y);
      const colorType = args.RGB;
      const color = args.COLOR;
      if (!this.images.has(id)) return;
      const canvas = this.images.get(id);
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
        return;
      }
      const ctx = canvas.getContext("2d");
      const currentData = ctx.getImageData(x, y, 1, 1);
      const currentColor = {
        r: currentData.data[0],
        g: currentData.data[1],
        b: currentData.data[2],
        a: currentData.data[3],
      };
      const parsedColor = this._parseColor(colorType, color, currentColor);
      currentData.data[0] = parsedColor.r;
      currentData.data[1] = parsedColor.g;
      currentData.data[2] = parsedColor.b;
      currentData.data[3] = parsedColor.a;
      ctx.putImageData(currentData, x, y);
    }

    getImageDataURL(args) {
      const id = args.ID;
      if (!this.images.has(id)) return "";
      const canvas = this.images.get(id);
      return canvas.toDataURL();
    }

    clearImage(args) {
      const id = args.ID;
      if (!this.images.has(id)) return;
      const canvas = this.images.get(id);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    listImages() {
      return JSON.stringify(Array.from(this.images.keys()));
    }

    imageExists(args) {
      const id = args.ID;
      return this.images.has(id);
    }

    getImageInfo(args) {
      const id = args.ID;
      const infoType = args.INFO;
      if (!this.images.has(id)) return "";
      const canvas = this.images.get(id);
      switch (infoType) {
        case "width":
          return canvas.width;
        case "height":
          return canvas.height;
        default:
          return "";
      }
    }

    deleteImage(args) {
      const id = args.ID;
      this.images.delete(id);
    }

    getSliceDataURL(args) {
      const id = args.ID;
      const sliceWidth = Math.max(1, Math.floor(args.SLICE_WIDTH));
      const sliceHeight = Math.max(1, Math.floor(args.SLICE_HEIGHT));
      const xIndex = Math.max(0, Math.floor(args.X));
      const yIndex = Math.max(0, Math.floor(args.Y));

      if (!this.images.has(id)) return "";

      const canvas = this.images.get(id);
      const width = canvas.width;
      const height = canvas.height;
      const cols = Math.ceil(width / sliceWidth);
      const rows = Math.ceil(height / sliceHeight);
      if (xIndex >= rows || yIndex >= cols) {
        return "";
      }
      const startX = yIndex * sliceWidth;
      const startY = xIndex * sliceHeight;
      const actualWidth = Math.min(sliceWidth, width - startX);
      const actualHeight = Math.min(sliceHeight, height - startY);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = sliceWidth;
      sliceCanvas.height = sliceHeight;
      const sliceCtx = sliceCanvas.getContext("2d");
      sliceCtx.clearRect(0, 0, sliceWidth, sliceHeight);
      if (actualWidth > 0 && actualHeight > 0) {
        sliceCtx.drawImage(
          canvas,
          startX,
          startY,
          actualWidth,
          actualHeight,
          0,
          0,
          actualWidth,
          actualHeight,
        );
      }
      return sliceCanvas.toDataURL();
    }

    getSliceCount(args) {
      const id = args.ID;
      const sliceWidth = Math.max(1, Math.floor(args.SLICE_WIDTH));
      const sliceHeight = Math.max(1, Math.floor(args.SLICE_HEIGHT));

      if (!this.images.has(id)) return 0;

      const canvas = this.images.get(id);
      const width = canvas.width;
      const height = canvas.height;

      const cols = Math.ceil(width / sliceWidth);
      const rows = Math.ceil(height / sliceHeight);

      return cols * rows;
    }

    getRegionDataURL(args) {
      const id = args.ID;
      const x = Math.max(0, Math.floor(args.X));
      const y = Math.max(0, Math.floor(args.Y));
      const width = Math.max(1, Math.floor(args.WIDTH));
      const height = Math.max(1, Math.floor(args.HEIGHT));

      if (!this.images.has(id)) return "";

      const canvas = this.images.get(id);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      if (x >= imgWidth || y >= imgHeight) {
        return "";
      }

      const actualWidth = Math.min(width, imgWidth - x);
      const actualHeight = Math.min(height, imgHeight - y);

      const regionCanvas = document.createElement("canvas");
      regionCanvas.width = width;
      regionCanvas.height = height;
      const regionCtx = regionCanvas.getContext("2d");

      regionCtx.clearRect(0, 0, width, height);

      if (actualWidth > 0 && actualHeight > 0) {
        regionCtx.drawImage(
          canvas,
          x,
          y,
          actualWidth,
          actualHeight,
          0,
          0,
          actualWidth,
          actualHeight,
        );
      }

      return regionCanvas.toDataURL();
    }
    copyImage(args) {
      const sourceId = args.SOURCE_ID;
      const targetId = args.TARGET_ID;
      const x = Math.floor(args.X);
      const y = Math.floor(args.Y);

      // 检查源图像和目标图像是否存在
      if (!this.images.has(sourceId) || !this.images.has(targetId)) {
        return; // 如果任一图像不存在，静默返回（不执行操作）
      }

      const sourceCanvas = this.images.get(sourceId);
      const targetCanvas = this.images.get(targetId);
      const targetCtx = targetCanvas.getContext("2d");

      // 获取图像尺寸
      const sourceWidth = sourceCanvas.width;
      const sourceHeight = sourceCanvas.height;
      const targetWidth = targetCanvas.width;
      const targetHeight = targetCanvas.height;

      // 计算实际可复制的区域（处理边界情况，避免超出目标画布）
      const drawX = Math.max(0, x); // 目标起始X坐标（确保非负）
      const drawY = Math.max(0, y); // 目标起始Y坐标（确保非负）
      const sourceStartX = Math.max(0, -x); // 如果x为负，从源图像的哪部分开始复制
      const sourceStartY = Math.max(0, -y); // 如果y为负，从源图像的哪部分开始复制
      const drawWidth = Math.min(
        sourceWidth - sourceStartX,
        targetWidth - drawX,
      );
      const drawHeight = Math.min(
        sourceHeight - sourceStartY,
        targetHeight - drawY,
      );

      // 仅当有有效区域时执行复制
      if (drawWidth > 0 && drawHeight > 0) {
        targetCtx.drawImage(
          sourceCanvas,
          sourceStartX,
          sourceStartY,
          drawWidth,
          drawHeight, // 源图像区域
          drawX,
          drawY,
          drawWidth,
          drawHeight, // 目标图像区域
        );
      }
    }
  }

  Scratch.extensions.register(new BitMapExtension());
})(Scratch);
