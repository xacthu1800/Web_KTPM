const  checkAccount = require('../function/checkAccount');

describe('kiểm tra tài khoản và mật khẩu', () => {
    let Phuduongdan1, Phuduongdan2, Phuduongdan3, Phuduongdan4, Phuduongdan5, Phuduongdan6, Phuduongdan7;
    let Phunhanh1, Phunhanh2
    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        Phunhanh1 = await checkAccount('thai123', '343');
        Phunhanh2 = await checkAccount('123', '123');

        Phuduongdan1 = await checkAccount('123', '123');
        Phuduongdan2 = await checkAccount('123', '456');
        Phuduongdan3 = await checkAccount('thai123', '343');
        Phuduongdan4 = await checkAccount('', '343');
        Phuduongdan5 = await checkAccount('', '');
        Phuduongdan6 = await checkAccount('', '343');
        Phuduongdan7 = await checkAccount('thai123', '');
    });

    test('', () => {
        // Kiểm tra kết quả
        expect(Phunhanh1).toBe(201);
        expect(Phunhanh2).toBe(201);

        expect(Phuduongdan1).toBe(201);
        expect(Phuduongdan2).toBe(201);
        expect(Phuduongdan3).toBe(201);
        expect(Phuduongdan4).toBe(201);
        expect(Phuduongdan5).toBe(201);
        expect(Phuduongdan6).toBe(201);
        expect(Phuduongdan7).toBe(201);
    });
}); 