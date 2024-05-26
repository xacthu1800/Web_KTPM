const  checkEncryptedPass = require('../function/checkEncryptedPass');

describe('kiểm tra tài mật khẩu  được mã hóa', () => {
    let result;

    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        ExpectedResult = await checkEncryptedPass('123', '123');
    });

    test('', () => {
        expect(ExpectedResult).toBe(200);
    });
}); 