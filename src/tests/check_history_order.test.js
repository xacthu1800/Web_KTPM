const checkHistoryOrder = require('../function/checkHistoryOrder');

describe('kiểm tra lịch sử đơn hàng', () => {
    test('', async () => {
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