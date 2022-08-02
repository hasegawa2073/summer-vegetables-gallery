document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.grid');
  const grid = new Muuri(elem, {
    layoutOnResize: 10,
    layoutDuration: 600,
  });
});
