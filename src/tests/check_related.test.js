const checkRelated = require('../function/checkRelated');

describe('kiểm tra các cuốn sách liên Quan', () => {
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