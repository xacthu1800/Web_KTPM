const testSearchbar = require('../function/testSearchbar');

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