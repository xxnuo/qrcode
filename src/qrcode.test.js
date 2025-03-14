import QRCode from './qrcode';

// Mock QRCodeStyling
jest.mock('qr-code-styling', () => {
    return jest.fn().mockImplementation(() => ({
        append: jest.fn(),
        download: jest.fn().mockResolvedValue(undefined)
    }));
});

// Mock jsQR
jest.mock('jsqr', () => {
    return jest.fn().mockImplementation(() => ({
        binaryData: new Uint8ClampedArray([1, 2, 3]),
        data: 'test data',
        version: 1,
        location: {
            topRightCorner: { x: 0, y: 0 },
            topLeftCorner: { x: 0, y: 0 },
            bottomRightCorner: { x: 0, y: 0 },
            bottomLeftCorner: { x: 0, y: 0 }
        }
    }));
});

describe('QRCode', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        jest.clearAllMocks();
    });

    describe('generate', () => {
        it('应该使用默认选项生成二维码', () => {
            const options = {
                data: 'test data'
            };
            const qrCode = QRCode.generate(options, container);
            expect(qrCode).toBeDefined();
        });

        it('应该处理渐变色配置', () => {
            const options = {
                data: 'test data',
                dotsOptions: {
                    gradient: {
                        type: 'linear',
                        rotation: 45,
                        colorStops: [
                            { offset: 0, color: '#000000' },
                            { offset: 1, color: '#ffffff' }
                        ]
                    }
                }
            };
            const qrCode = QRCode.generate(options, container);
            expect(qrCode).toBeDefined();
        });
    });

    describe('decode', () => {
        it('应该成功解码二维码图像数据', () => {
            const imageData = new Uint8ClampedArray([1, 2, 3, 4]);
            const width = 100;
            const height = 100;

            const result = QRCode.decode(imageData, width, height);

            expect(result).toBeDefined();
            expect(result.data).toBe('test data');
            expect(result.version).toBe(1);
            expect(result.location).toBeDefined();
        });

        it('应该使用自定义选项解码', () => {
            const imageData = new Uint8ClampedArray([1, 2, 3, 4]);
            const width = 100;
            const height = 100;
            const options = {
                inversionAttempts: 'dontInvert'
            };

            const result = QRCode.decode(imageData, width, height, options);

            expect(result).toBeDefined();
        });
    });

    describe('download', () => {
        it('应该使用默认选项下载二维码', async () => {
            const qrCode = QRCode.generate({ data: 'test data' }, container);
            await expect(QRCode.download(qrCode)).resolves.not.toThrow();
        });

        it('应该使用自定义选项下载二维码', async () => {
            const qrCode = QRCode.generate({ data: 'test data' }, container);
            const options = {
                name: 'custom-qr',
                extension: 'svg'
            };
            await expect(QRCode.download(qrCode, options)).resolves.not.toThrow();
        });
    });
}); 