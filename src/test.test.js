const  checkAccount = require('./function/checkAccount');
const  checkEncryptedPass = require('./function/checkEncryptedPass');
const  takeFullBookInfor = require('./function/takeFullBookInfor');

const {additem} = require('./function/checkItemsInCart');
const itemsInCart = require('./function/itemsInCart');
const checkHistoryOrder = require('./function/checkHistoryOrder');
const checkRelated = require('./function/checkRelated');
const testSearchbar = require('./function/testSearchbar');
const checkFilter = require('./function/checkFilter');


describe('test Filter --- task 4.2-1', () => {
    let result1, result2;

    beforeEach(async () => {
        result1 = await checkFilter('Âm nhạc', 'BOCCHI THE ROCK - TẬP 1');
        result2 = await checkFilter('Âm nhạc', 'KHẼ HÁT LỜI YÊU - TẬP 1');
    });

    test('Check filter work', () => {
        // Kiểm tra kết quả
        expect(result2).toBe(201);
        expect(result1).toBe(200);
    });
}); 

describe('test items in cart --- task 4.2-2', () => {
    test('Test checkItemsInCart function', async () => {
        let cart = [];
        const result1 = additem('BOCCHI THE ROCK - TẬP 1', cart)
        const result2 = additem('KHẼ HÁT LỜI YÊU - TẬP 1', cart)
       expect(result1).toBe(1)
       expect(result2).toBe(2)
       //hàm trả về số lượng item hiện có trong giỏ hàng
    });
});

describe('test checkAccount functio --- task 4.2-3', () => {
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

    test('Check existing account with correct password', () => {
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

describe('test items quantity  in cart --- task 4.2-4', () => {
    test('Test itemsInCart function', async () => {
        let cart = [];
        const result1 = itemsInCart('BOCCHI THE ROCK - TẬP 1', cart)
        const result1_1 = itemsInCart('BOCCHI THE ROCK - TẬP 1', cart)

        const result2 = itemsInCart('KHẼ HÁT LỜI YÊU - TẬP 1', cart)
        expect((result1_1.find(cart => cart.name === 'BOCCHI THE ROCK - TẬP 1')).quantity).toBe(2)
        expect((result2.find(cart => cart.name === 'KHẼ HÁT LỜI YÊU - TẬP 1')).quantity).toBe(1)
    });
    // kiểm tra số lượng mỗi item 
});

describe('test checkEncryptedPass function --- task 4.2-5', () => {
    let result;

    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        ExpectedResult = await checkEncryptedPass('123', '123');
    });

    test('Check if client password has been encrypted', () => {
        expect(ExpectedResult).toBe(200);
    });
}); 

describe('test Book full information --- task 4.2-6', () => {
    test('Test takeFullBookInfor function', async () => {
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

describe('test Searchbar --- task 4.2-7', () => {
    let result;

    beforeEach(async () => {
        result = await testSearchbar('BOCCHI THE ROCK - TẬP 1');
        result2 = await testSearchbar('YOUR NAME');
    });

    test('Check existing', () => {
        // Kiểm tra kết quả
        expect(result).toBe(200);
        expect(result2).toBe(201);
    });
}); 

describe('test history order per account --- task 4.2-8', () => {
    test('Test checkHistoryOrder function', async () => {
       const history_bin = await checkHistoryOrder('bin')
       const history_phuc = await checkHistoryOrder('phuc')
       const history_nullClient = await checkHistoryOrder('')
       const history_binprovip = await checkHistoryOrder('bin#provip123')

       expect(history_bin).not.toBe(0);
       expect(history_phuc).not.toBe(0);
       expect(history_nullClient).toBe(0);
       expect(history_binprovip).toBe(0);

    });
});

describe('test related Book --- task 4.2-9', () => {
    test('Test checkRelated function', async () => {
        
        const checkRelatedbook1 = await checkRelated('KHẼ HÁT LỜI YÊU - TẬP 1');
        const checkRelatedbook2 = await checkRelated('BOCCHI THE ROCK - TẬP 1');

        expect(checkRelatedbook1).toBeTruthy();
        expect(checkRelatedbook1.LienQuan[0].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 1');
        expect(checkRelatedbook1.LienQuan[1].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 2');
        expect(checkRelatedbook1.LienQuan[2].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 3');

        expect(checkRelatedbook2.LienQuan).toHaveLength(1)

    });
});