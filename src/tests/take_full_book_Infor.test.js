const  takeFullBookInfor = require('../function/takeFullBookInfor');

describe('kiểm tra hàm lấy toàn bộ thông tin cuốn sách', () => {
    test('', async () => {
        // Gọi hàm takeFullBookInfor và lưu kết quả vào biến takeFullBookInforResult
        const notExist = await takeFullBookInfor('YOUR NAME');
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

        expect(notExist).toBe(201);
    });
});