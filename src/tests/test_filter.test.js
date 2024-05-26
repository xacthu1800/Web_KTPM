const checkFilter = require('../function/checkFilter');

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