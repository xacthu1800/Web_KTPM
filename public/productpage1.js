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