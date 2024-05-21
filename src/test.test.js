const  checkAccount = require('./function/checkAccount');
const  checkEncryptedPass = require('./function/checkEncryptedPass');
const  takeFullBookInfor = require('./function/takeFullBookInfor');

const {additem} = require('./function/checkItemsInCart');
const itemsInCart = require('./function/itemsInCart');
const checkHistoryOrder = require('./function/checkHistoryOrder');
const checkRelated = require('./function/checkRelated');
const testSearchbar = require('./function/testSearchbar');
const checkFilter = require('./function/checkFilter');




describe('test checkAccount functio --- task 4.2-3', () => {
    let result1;
    let result2;
    let result3;
    let result4;
    let result5;
    let result6;
    let result7;
    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        result1 = await checkAccount('123', '123');
        result2 = await checkAccount('123', '456');
        result3 = await checkAccount('thai123', '343');
        result4 = await checkAccount(' ', '343');
        result5 = await checkAccount(' ', ' ');
        result6 = await checkAccount('0', '343');
        result7 = await checkAccount('thai123', '0');
    });

    test('Check existing account with correct password', () => {
        // Kiểm tra kết quả
        expect(result1).toBe(200);
        expect(result2).toBe(201);
        expect(result3).toBe(201);
        expect(result4).toBe(201);
        expect(result5).toBe(201);
        expect(result6).toBe(201);
        expect(result7).toBe(201);
    });
}); 

describe('test checkEncryptedPass function --- task 4.2-5', () => {
    let result;

    beforeEach(async () => {
        // Gọi hàm checkAccount và lưu kết quả vào biến result
        unExpectedResult = await checkEncryptedPass('thai123', '343');
        ExpectedResult = await checkEncryptedPass('123', '123');
    });

    test('Check if client password has been encrypted', () => {
        expect(unExpectedResult).toBe(201);
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



describe('test items in cart --- task 4.2-2', () => {
    test('Test checkItemsInCart function', async () => {
        let cart = [];
       // kiểm tra tổng item đang có trong giỏ hàng ( cái số bên phải giỏ hàng ở cái giao diện )
        const result1 = additem('BOCCHI THE ROCK - TẬP 1', cart)
        const result2 = additem('KHẼ HÁT LỜI YÊU - TẬP 1', cart)
        // const result3 = additem('bocchi', cart)

        // const result4 = additem('bokuno hero', cart)
        // const result5 = additem('high school dxd', cart)



        
       expect(result1).toBe(1)
       expect(result2).toBe(0)


    });
});

describe('test items quantity  in cart --- task 4.2-4', () => {
    test('Test itemsInCart function', async () => {
        let cart = [];
       // checkItemsIncart function is sync with additem.
        const result1 = itemsInCart('BOCCHI THE ROCK - TẬP 1', cart)
        const result2 = itemsInCart('KHẼ HÁT LỜI YÊU - TẬP 1', cart)




        // lúc này đã thêm 2 product tên bocchi vào giỏ hàng. và cũng đã trả ra số lượng là 2 
        expect((result2.find(cart => cart.name === 'BOCCHI THE ROCK - TẬP 1')).quantity).toBe(1)
        expect((result2.find(cart => cart.name === 'KHẼ HÁT LỜI YÊU - TẬP 1')).quantity).toBe(2)


    });
});

describe('test history order per account --- task 4.2-8', () => {
    test('Test checkHistoryOrder function', async () => {
       const history_phuc = await checkHistoryOrder('phuc')
       const history_bin = await checkHistoryOrder('bin')

       expect(history_phuc).toBe(0);
        expect(history_bin[0].maDonHang).toBe('17042024201548');
        expect(history_bin[0].tongTien).toBe(95000);
        expect(history_bin[0].trangThaiThanhToan).toBe('Chờ xử lý');
        expect(history_bin[0].trangThaiVanChuyen).toBe('Chưa Giao hàng');
    });

    test('Test checkHistoryOrder function', async () => {
        //await expect(checkHistoryOrder('fasdfhasdjfklasklfdkl')).resolves.toEqual(0);
     });




     //test case này nhận vào 1 user 
     // nếu tồn tại user trong database thì sẽ trả về giá trị
     // nếu user không tồn tại thì nó trả về giá trị 0
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

describe('test Filter --- task 4.2-1', () => {
    let result;

    beforeEach(async () => {
        result = await checkFilter('Âm nhạc');
    });

    test('Check filter work', () => {
        // Kiểm tra kết quả
        expect(result).toBe(200);
    });
}); 

describe('test related Book --- task 4.2-9', () => {
    test('Test checkRelated function', async () => {
        
        const checkRelatedbook = await checkRelated('KHẼ HÁT LỜI YÊU - TẬP 1');
        
        expect(checkRelatedbook).toBeTruthy();

        expect(checkRelatedbook.LienQuan[0].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 1');
        expect(checkRelatedbook.LienQuan[1].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 2');
        expect(checkRelatedbook.LienQuan[2].name).toBe('KHẼ HÁT LỜI YÊU - TẬP 3');
    });
});