// JavaScript Document
function changeImage(imageName) {
  // Get all the images
  var images = document.querySelectorAll('.left-column1 img');

  // Remove the active class from all images
  images.forEach(function(image) {
    image.classList.remove('active');
  });

  // Add the active class to the image with the corresponding data-image attribute
  document.querySelector(.left-column1 img[data-image="${imageName}"]).classList.add('active');
}