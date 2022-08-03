document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.grid');
  const fragment = document.createDocumentFragment();

  const btns = document.querySelectorAll('.header__type');
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

  // muuriを使う
  const useMuuri = function () {
    const grid = new Muuri(elem, {
      layoutOnResize: 10,
      layoutDuration: 600,
    });
  };

  // コンテンツをすべて削除する
  const removeItem = function () {
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      item.remove();
    });
  };

  // コンテンツの初期化(すべて表示)
  const initItem = function () {
    removeItem();
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
      useMuuri();
    });
  };

  // コンテンツを新しく生成する
  const createItem = function (data) {
    const item = document.createElement('div');
    const img = document.createElement('img');
    item.className = 'item';
    img.className = 'item-content';
    img.src = data['path'];
    img.width = data['width'];
    img.height = data['height'];
    item.appendChild(img);
    fragment.appendChild(item);
  };

  // JSONデータのフィルタリング
  const filterJSON = function (jsonData, type) {
    const filterArray = jsonData.filter((item) => {
      return item['type'] === type;
    });
    return filterArray;
  };

  // コンテンツを更新(削除＆追加)
  const updateItem = function (type) {
    removeItem();
    jsonData.then((jsonData) => {
      filterJSON(jsonData, type).forEach((data) => {
        createItem(data);
      });
      elem.appendChild(fragment);
      useMuuri();
    });
  };

  // すべてのボタンからアクティブを削除
  const removeActive = function () {
    btns.forEach((btn) => {
      btn.classList.remove('active');
    });
  };

  // ボタンのカレントにアクティブを追加
  const addActive = function (e) {
    e.target.classList.add('active');
  };

  // ボタンのカレントを更新
  const updateActive = function (e) {
    removeActive();
    addActive(e);
  };

  initItem();
  btnAll.addEventListener('click', function (e) {
    updateActive(e);
    initItem();
  });
  btnCucumber.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('cucumber');
  });
  btnCorn.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('corn');
  });
  btnTomato.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('tomato');
  });
  btnEggplant.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('eggplant');
  });
  btnGreenpepper.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('greenpepper');
  });
});
