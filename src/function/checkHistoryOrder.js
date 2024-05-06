 const {delivery} = require('../config');


 async function checkHistoryOrder(userID) {
     try {
         const deli = await delivery.find({ userID: userID });
         if (Object.keys(deli).length === 0) { // Kiểm tra xem deli có phải là một đối tượng rỗng không
            return 0;
        } else {
            return deli;
        }
     } catch (error) {
         console.error('Lỗi khi truy vấn dữ liệu:', error);
     }
     return 0
 }
 
 
  module.exports = checkHistoryOrder  