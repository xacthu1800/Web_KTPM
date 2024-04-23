// JavaScript Document
function changeImage(imageType) {
  // Lấy tất cả các ảnh
  var images = document.querySelectorAll('.left-column1 img');
  
  // Lặp qua từng ảnh để kiểm tra loại và thay đổi lớp 'active'
  images.forEach(function(img) {
    if (img.getAttribute('data-image') === imageType) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}

function changePrice(btnId) {
  // Lấy tất cả các giá trị giá tiền
  var prices = document.querySelectorAll('.product-price span');
  
  // Lặp qua từng giá trị giá tiền để ẩn hoặc hiện tùy theo nút được click
  prices.forEach(function(price) {
    // Ẩn tất cả các giá trị giá tiền
    price.style.display = 'none';
  });
  
  // Hiển thị giá tiền tương ứng với nút được click
  var priceId = btnId + "-price";
  var selectedPrice = document.getElementById(priceId);
  if (selectedPrice) {
    selectedPrice.style.display = 'inline-block';
  }
}
