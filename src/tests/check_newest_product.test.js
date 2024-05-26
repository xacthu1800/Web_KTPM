const  newestProduct = require('../function/check_newest_product');

describe('kiểm tra 12 cuốn sách mới nhất mới nhất  ', () => {
    beforeEach(async () => {
        New12Product = await newestProduct();
    });

    test('', () => {
        expect(New12Product[0].name).toBe('NHÂN VẬT HẠ CẤP TOMOZAKI - TẬP 6.5');
        expect(New12Product[1].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 3');
        expect(New12Product[2].name).toBe('THIÊN SỨ NHÀ BÊN (MANGA) - TẬP 1');
        expect(New12Product[3].name).toBe('KHÁT VỌNG TỎA SÁNG CỦA NANAMI MINAMI (MANGA) - TẬP 1');
        expect(New12Product[4].name).toBe('SKIP AND LOAFER - NHỊP BƯỚC TUỔI XANH - TẬP 4');
        expect(New12Product[5].name).toBe('NGÔN NGỮ YÊU THƯƠNG - TẬP 3');
        expect(New12Product[6].name).toBe('CHÀNG BĂNG GIÁ VÀ NÀNG LẠNH LÙNG - TẬP 6');
        expect(New12Product[7].name).toBe('CÓ CHÓ CÓ MÈO, NGÀY NÀO CŨNG VUI - TẬP 5');
        expect(New12Product[8].name).toBe('NEON GENESIS EVANGELION - COLLECTORS EDITION - TẬP 4');
        expect(New12Product[9].name).toBe('OSHI NO KO - DƯỚI ÁNH HÀO QUANG - TẬP 7');
        expect(New12Product[10].name).toBe('FRIEREN - PHÁP SƯ TIỄN TÁNG - TẬP 3');
        expect(New12Product[11].name).toBe('NHÂN VẬT HẠ CẤP TOMOZAKI - TẬP 6');
    });
}); 