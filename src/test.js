const  checkAccount = require('./function/checkAccount');



 describe('test checkAccount function', () => {
    let result;

    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        result = await checkAccount('111', '111');
    });

    test('Check existing account with correct password', () => {
        // Kiểm tra kết quả
        expect(result).toBe(200);
    });
}); 
