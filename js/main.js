document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.grid');
  // const grid = new Muuri(elem, {
  //   items: elem.querySelectorAll('.item'),
  //   layoutOnResize: 10,
  //   layoutDuration: 600,
  // });
  // console.log(grid);

  const fragment = document.createDocumentFragment();

  const JSONPath = '/JSON/image.json';
  const jsonData = fetch(JSONPath).then((response) => {
    return response.json();
  });

  jsonData.then((jsonData) => {
    jsonData.forEach((data) => {
      const item = document.createElement('div');
      const img = document.createElement('img');
      item.className = 'item';
      img.className = 'item-content';
      img.src = data['path'];
      item.appendChild(img);
      fragment.appendChild(item);
    });
    elem.appendChild(fragment);
    const grid = new Muuri(elem, {
      layoutOnResize: 10,
      layoutDuration: 600,
    });
  });
});
