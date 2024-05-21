 const {delivery} = require('../config');


 async function checkHistoryOrder(userID) {
    
         const deli = await delivery.find({ userID: userID });
         if (deli.length === 0) { // Kiểm tra xem deli có phải là một đối tượng rỗng không
            return 0;
        } else {
            return deli;
        }

     }

 
  module.exports = checkHistoryOrder  