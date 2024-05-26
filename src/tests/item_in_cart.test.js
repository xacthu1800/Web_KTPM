const itemsInCart = require('../function/itemsInCart');

describe('kiểm tra số lượng riêng của mỗi sản phẩm trong giỏ hàng', () => {
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