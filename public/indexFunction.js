
function checkSession(itemId) {
   var xhr = new XMLHttpRequest();
   xhr.open('GET', '/checkSession');
   xhr.onload = function() {
       if (xhr.status === 200) {
           var response = JSON.parse(xhr.responseText);
           if (!response.loggedIn) {
               // Hiển thị thông báo nếu người dùng chưa đăng nhập
               alert('Vui lòng đặt nhập trước khi thêm vào giỏ hàng');
           } else {
            addItemIntoCart(itemId)
            console.log(items);
           }
       } else {
           // Hiển thị thông báo nếu có lỗi trong quá trình kiểm tra session
           alert('Error checking session');

           console.log(items);
       }
   };
   xhr.send();
}


