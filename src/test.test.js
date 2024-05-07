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

describe('test checkEncryptedPass function --- task 4.2-5', () => {
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

describe('test Book full information --- task 4.2-6', () => {
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



describe('test items in cart --- task 4.2-2', () => {
    test('Test checkItemsInCart function', async () => {
        let cart = [];
       // kiểm tra tổng item đang có trong giỏ hàng ( cái số bên phải giỏ hàng ở cái giao diện )
        const result1 = additem('bocchi', cart)
        const result2 = additem('bocchi', cart)
        const result3 = additem('bocchi', cart)

        const result4 = additem('bokuno hero', cart)
        const result5 = additem('high school dxd', cart)



        
       expect(result3).toBe(3)
       expect(result5).toBe(5)


    });
});

describe('test items quantity  in cart --- task 4.2-4', () => {
    test('Test itemsInCart function', async () => {
        let cart = [];
       // checkItemsIncart function is sync with additem.
        const result1 = itemsInCart('bocchi', cart)
        const result2 = itemsInCart('bocchi', cart)




        // lúc này đã thêm 2 product tên bocchi vào giỏ hàng. và cũng đã trả ra số lượng là 2 
        expect((result2.find(cart => cart.name === 'bocchi')).name).toBe('bocchi')
        expect((result2.find(cart => cart.name === 'bocchi')).quantity).toBe(2)


    });
});

describe('test history order per account --- task 4.2-8', () => {
    test('Test checkHistoryOrder function', async () => {
       const history_11 = await checkHistoryOrder('11')
       const history_bin = await checkHistoryOrder('bin')

       expect(history_11).toBeDefined()
       expect(history_bin).toBeDefined()
    });

    test('Test checkHistoryOrder function', async () => {
        await expect(checkHistoryOrder('fasdfhasdjfklasklfdkl')).resolves.toEqual(0);
     });




     //test case này nhận vào 1 user 
     // nếu tồn tại user trong database thì sẽ trả về giá trị
     // nếu user không tồn tại thì nó trả về giá trị 0
});


describe('test Searchbar --- task 4.2-7', () => {
    let result;

    beforeEach(async () => {
        result = await testSearchbar('Bocchi');
    });

    test('Check existing', () => {
        // Kiểm tra kết quả
        expect(result).toBe(200);
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