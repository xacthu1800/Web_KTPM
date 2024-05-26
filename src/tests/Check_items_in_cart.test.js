
const {additem} = require('../function/checkItemsInCart');

describe('kiểm tra tổng item hiện có trong giỏ hàng', () => {
    test('', async () => {
        let cart = [];
        const result1 = additem('BOCCHI THE ROCK - TẬP 1', cart)
        const result2 = additem('KHẼ HÁT LỜI YÊU - TẬP 1', cart)
       expect(result1).toBe(1)
       expect(result2).toBe(2)
       //hàm trả về số lượng item hiện có trong giỏ hàng
    });
});