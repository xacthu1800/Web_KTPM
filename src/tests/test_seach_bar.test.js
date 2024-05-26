const testSearchbar = require('../function/testSearchbar');

describe('kiểm tra hàm tìm kiếm trong search bar', () => {
    let result;

    beforeEach(async () => {
        result = await testSearchbar('BOCCHI THE ROCK - TẬP 1');
        result2 = await testSearchbar('YOUR NAME');
    });

    test('', () => {
        // Kiểm tra kết quả
        expect(result).toBe(200);
        expect(result2).toBe(201);
    });
}); 