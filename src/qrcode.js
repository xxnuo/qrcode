// 二维码生成和识别工具

// 导入依赖
import QRCodeStyling from 'qr-code-styling';
import jsQR from 'jsqr';

/**
 * 生成二维码
 * @param {Object} options 配置选项
 * @param {string} options.data 要编码的数据
 * @param {number} [options.width=300] 宽度
 * @param {number} [options.height=300] 高度
 * @param {string} [options.type='svg'] 输出类型 ('svg' | 'canvas')
 * @param {string} [options.shape='square'] 形状 ('square' | 'circle')
 * @param {string} [options.image] 中心图片 URL
 * @param {Object} [options.dotsOptions] 点的样式
 * @param {Object} [options.dotsOptions.gradient] 点的渐变色配置
 * @param {string} [options.dotsOptions.gradient.type='linear'] 渐变类型 ('linear' | 'radial')
 * @param {number} [options.dotsOptions.gradient.rotation=0] 渐变旋转角度（弧度）
 * @param {Array<{offset: number, color: string}>} [options.dotsOptions.gradient.colorStops] 渐变色停止点
 * @param {boolean} [options.dotsOptions.roundSize=true] 是否对点大小取整
 * @param {Object} [options.backgroundOptions] 背景样式
 * @param {Object} [options.backgroundOptions.gradient] 背景渐变色配置
 * @param {Object} [options.imageOptions] 图片选项
 * @param {Object} [options.cornersSquareOptions] 角落方块样式
 * @param {Object} [options.cornersSquareOptions.gradient] 角落方块渐变色配置
 * @param {Object} [options.cornersDotOptions] 角落圆点样式
 * @param {Object} [options.cornersDotOptions.gradient] 角落圆点渐变色配置
 * @param {HTMLElement} container 容器元素
 * @returns {Object} QRCode 实例
 */
function generateQRCode(options, container) {
    const defaultOptions = {
        width: 300,
        height: 300,
        type: 'svg',
        shape: 'square',
        dotsOptions: {
            color: '#000000',
            type: 'square',
            roundSize: true
        },
        backgroundOptions: {
            color: '#ffffff'
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 20,
            saveAsBlob: true
        },
        cornersSquareOptions: {
            type: 'square'
        },
        cornersDotOptions: {
            type: 'square'
        },
        qrOptions: {
            errorCorrectionLevel: 'Q'
        }
    };

    // 处理渐变色配置
    const processGradient = (gradientOptions) => {
        if (!gradientOptions) return undefined;
        return {
            type: gradientOptions.type || 'linear',
            rotation: gradientOptions.rotation || 0,
            colorStops: gradientOptions.colorStops || []
        };
    };

    // 处理选项中的渐变色
    if (options.dotsOptions?.gradient) {
        options.dotsOptions.gradient = processGradient(options.dotsOptions.gradient);
    }
    if (options.backgroundOptions?.gradient) {
        options.backgroundOptions.gradient = processGradient(options.backgroundOptions.gradient);
    }
    if (options.cornersSquareOptions?.gradient) {
        options.cornersSquareOptions.gradient = processGradient(options.cornersSquareOptions.gradient);
    }
    if (options.cornersDotOptions?.gradient) {
        options.cornersDotOptions.gradient = processGradient(options.cornersDotOptions.gradient);
    }

    const qrCode = new QRCodeStyling({
        ...defaultOptions,
        ...options
    });

    if (container) {
        qrCode.append(container);
    }

    return qrCode;
}

/**
 * 从图像数据中识别二维码
 * @param {Uint8ClampedArray} imageData 图像数据
 * @param {number} width 图像宽度
 * @param {number} height 图像高度
 * @param {Object} [options] jsQR 选项
 * @param {string} [options.inversionAttempts='attemptBoth'] 图像反转尝试 ('attemptBoth' | 'dontInvert' | 'onlyInvert' | 'invertFirst')
 * @returns {Object|null} 识别结果，包含以下字段：
 * - binaryData: Uint8ClampedArray - 原始字节数据
 * - data: string - 解码后的字符串数据
 * - chunks: Array - QR 码块数据
 * - version: number - QR 码版本
 * - location: Object - QR 码在图像中的位置信息
 *   - topRightCorner/topLeftCorner/bottomRightCorner/bottomLeftCorner: 四个角的坐标
 *   - topRightFinderPattern/topLeftFinderPattern/bottomLeftFinderPattern: 三个查找图案的位置
 *   - bottomRightAlignmentPattern: 右下角定位图案的位置（如果存在）
 */
function decodeQRCode(imageData, width, height, options = {}) {
    const defaultOptions = {
        inversionAttempts: 'attemptBoth'
    };
    
    const result = jsQR(imageData, width, height, {
        ...defaultOptions,
        ...options
    });

    return result;
}

/**
 * 下载二维码图片
 * @param {Object} qrCode QRCode 实例
 * @param {Object} [options] 下载选项
 * @param {string} [options.name='qr'] 文件名
 * @param {string} [options.extension='png'] 文件扩展名 ('png' | 'jpeg' | 'webp' | 'svg')
 * @returns {Promise<void>}
 */
async function downloadQRCode(qrCode, options = {}) {
    const defaultOptions = {
        name: 'qr',
        extension: 'png'
    };
    
    await qrCode.download({
        ...defaultOptions,
        ...options
    });
}

// 导出对象
export default {
    generate: generateQRCode,
    decode: decodeQRCode,
    download: downloadQRCode
};
