const  checkAccount = require('./function/checkAccount');
const  checkEncryptedPass = require('./function/checkEncryptedPass');
const  takeFullBookInfor = require('./function/takeFullBookInfor');


describe('test checkAccount function', () => {
    let result;

    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        result = await checkAccount('11', '11');
    });

    test('Check existing account with correct password', () => {
        // Kiểm tra kết quả
        expect(result).toBe(200);
    });
}); 

describe('test checkEncryptedPass function', () => {
    let result;

    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        unExpectedResult = await checkEncryptedPass('bin', 'bin');
        ExpectedResult = await checkEncryptedPass('11', '11');
    });

    test('Check if client password has been encrypted', () => {
        expect(unExpectedResult).toBe(201);
    });
    test('Check if client password has been encrypted', () => {
        expect(ExpectedResult).toBe(200);
    });
}); 

describe('test Book full information', () => {
    test('Test takeFullBookInfor function', async () => {
        // Gọi hàm takeFullBookInfor và lưu kết quả vào biến takeFullBookInforResult
        const takeFullBookInforResult = await takeFullBookInfor('BOCCHI THE ROCK - TẬP 1');

        // Kiểm tra xem kết quả có tồn tại không
        expect(takeFullBookInforResult).toBeTruthy();

        // Kiểm tra các thông tin của cuốn sách
        expect(takeFullBookInforResult.name).toBe('BOCCHI THE ROCK - TẬP 1');
        expect(takeFullBookInforResult.author).toBe('Aki Hamazi');
        expect(takeFullBookInforResult.description).toBe('Goto Hitori là một nữ sinh hướng nội. Giao tiếp kém, học cũng kém, tay chân lại vụng về, nên suốt thời cấp 2 chẳng thể kết bạn với ai, chỉ có cây guitar bầu bạn. Khi lên lớp 10, một ngày nọ, cô nàng tình cờ gia nhập Ban nhạc Đoàn Kết, lấy nghệ danh là Bocchi và trở thành một tay guitar khuấy đảo nền nhạc Rock nước Nhật!? Nhưng trước hết, Bocchi phải nhìn được vào mắt các thành viên trong ban nhạc đã!');
        expect(takeFullBookInforResult.TrangThai).toBe('Đang phát hành');
        expect(takeFullBookInforResult.NamXuatBan).toBe('2024');
        expect(takeFullBookInforResult.KichThuoc).toBe('14,5 x 20,5 cm');
        expect(takeFullBookInforResult.DoiTuong).toBe('15+');
    });
});