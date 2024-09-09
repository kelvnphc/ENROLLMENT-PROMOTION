document.addEventListener("DOMContentLoaded", function () {
  const hiddenContent = document.querySelector('.hidden-content');
  const readMoreButton = document.querySelector('.readmore');
  const compactButton = document.querySelector('.compact');

  // Hiển thị nội dung ẩn và thay đổi hiển thị nút
  readMoreButton.addEventListener('click', function () {
    hiddenContent.style.display = 'block';
    readMoreButton.style.display = 'none';
    compactButton.style.display = 'inline-block';
  });

  // Ẩn nội dung và thay đổi hiển thị nút
  compactButton.addEventListener('click', function () {
    hiddenContent.style.display = 'none';
    compactButton.style.display = 'none';
    readMoreButton.style.display = 'inline-block';
  });
});