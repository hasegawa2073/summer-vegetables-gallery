document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.grid');
  const fragment = document.createDocumentFragment();

  const btnAll = document.querySelector('.all');
  const btnCucumber = document.querySelector('.cucumber');
  const btnCorn = document.querySelector('.corn');
  const btnTomato = document.querySelector('.tomato');
  const btnEggplant = document.querySelector('.eggplant');
  const btnGreenpepper = document.querySelector('.greenpepper');

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
      img.width = data['width'];
      img.height = data['height'];
      item.appendChild(img);
      fragment.appendChild(item);
    });
    elem.appendChild(fragment);
    const grid = new Muuri(elem, {
      layoutOnResize: 10,
      layoutDuration: 600,
    });
  });

  btnCucumber.addEventListener('click', function () {
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      item.remove();
    });
    jsonData.then((jsonData) => {
      console.log(jsonData);
      const cucumberArray = jsonData.filter((item, i, array) => {
        return item['type'] === 'cucumber';
      });
      cucumberArray.forEach((data) => {
        const item = document.createElement('div');
        const img = document.createElement('img');
        item.className = 'item';
        img.className = 'item-content';
        img.src = data['path'];
        img.width = data['width'];
        img.height = data['height'];
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
});
