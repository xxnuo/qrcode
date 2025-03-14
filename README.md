# QRCode Web

一个功能强大的二维码生成和识别工具，支持自定义样式、渐变色和中心图片。

## 特性

- 🎨 支持自定义二维码样式（颜色、形状、大小等）
- 🌈 支持渐变色效果
- 🖼️ 支持添加中心图片
- 📱 支持二维码识别
- 💾 支持多种格式导出（PNG、JPEG、WebP、SVG）
- 📦 支持多种模块规范（CommonJS、ES Module、IIFE）

## 浏览器安装

```html
<script src="https://qrcode.cdn.mcpport.com/qrcode.iife.js"></script>
```

## 使用示例

### 基本使用

```javascript
import QRCode from "qrcode-web";

// 生成二维码
const container = document.getElementById("qrcode");
const qrcode = QRCode.generate(
  {
    data: "https://example.com",
    width: 300,
    height: 300,
  },
  container
);

// 识别二维码
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const result = QRCode.decode(imageData.data, canvas.width, canvas.height);
console.log(result.data); // 解码后的数据

// 下载二维码
await QRCode.download(qrcode, {
  name: "my-qrcode",
  extension: "png",
});
```

### 高级样式

```javascript
const qrcode = QRCode.generate(
  {
    data: "https://example.com",
    width: 300,
    height: 300,
    type: "svg",
    shape: "circle",
    image: "path/to/logo.png",
    dotsOptions: {
      gradient: {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: "#000000" },
          { offset: 1, color: "#ffffff" },
        ],
      },
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    cornersSquareOptions: {
      type: "extra-rounded",
    },
    cornersDotOptions: {
      type: "dot",
    },
  },
  container
);
```

## API 文档

### QRCode.generate(options, container)

生成二维码。

#### 参数

- `options` (Object): 配置选项
  - `data` (string): 要编码的数据
  - `width` (number, 可选): 宽度，默认 300
  - `height` (number, 可选): 高度，默认 300
  - `type` (string, 可选): 输出类型 ('svg' | 'canvas')，默认 'svg'
  - `shape` (string, 可选): 形状 ('square' | 'circle')，默认 'square'
  - `image` (string, 可选): 中心图片 URL
  - `dotsOptions` (Object, 可选): 点的样式
    - `gradient` (Object, 可选): 渐变色配置
      - `type` (string): 渐变类型 ('linear' | 'radial')
      - `rotation` (number): 渐变旋转角度（弧度）
      - `colorStops` (Array): 渐变色停止点
  - `backgroundOptions` (Object, 可选): 背景样式
  - `cornersSquareOptions` (Object, 可选): 角落方块样式
  - `cornersDotOptions` (Object, 可选): 角落圆点样式
- `container` (HTMLElement): 容器元素

#### 返回值

返回 QRCode 实例。

### QRCode.decode(imageData, width, height, options?)

从图像数据中识别二维码。

#### 参数

- `imageData` (Uint8ClampedArray): 图像数据
- `width` (number): 图像宽度
- `height` (number): 图像高度
- `options` (Object, 可选): jsQR 选项
  - `inversionAttempts` (string): 图像反转尝试 ('attemptBoth' | 'dontInvert' | 'onlyInvert' | 'invertFirst')

#### 返回值

返回解码结果对象：

- `binaryData`: 原始字节数据
- `data`: 解码后的字符串数据
- `version`: QR 码版本
- `location`: QR 码在图像中的位置信息

### QRCode.download(qrCode, options?)

下载二维码图片。

#### 参数

- `qrCode` (Object): QRCode 实例
- `options` (Object, 可选): 下载选项
  - `name` (string, 可选): 文件名，默认 'qr'
  - `extension` (string, 可选): 文件扩展名 ('png' | 'jpeg' | 'webp' | 'svg')，默认 'png'

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test

# 查看测试覆盖率
pnpm test:coverage
```
