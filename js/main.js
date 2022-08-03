document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.grid');
  const fragment = document.createDocumentFragment();

  const pageTitle = document.querySelector('.header__link');
  const listAll = document.querySelector('.all');
  const listCucumber = document.querySelector('.cucumber');
  const listCorn = document.querySelector('.corn');
  const listTomato = document.querySelector('.tomato');
  const listEggplant = document.querySelector('.eggplant');
  const listGreenpepper = document.querySelector('.greenpepper');
  const btns = document.querySelectorAll('.header__type');
  const btnAll = listAll.querySelector('.header__type');

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

  pageTitle.addEventListener('click', function (e) {
    removeActive();
    btnAll.classList.add('active');
    initItem();
  });
  listAll.addEventListener('click', function (e) {
    updateActive(e);
    initItem();
  });
  listCucumber.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('cucumber');
  });
  listCorn.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('corn');
  });
  listTomato.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('tomato');
  });
  listEggplant.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('eggplant');
  });
  listGreenpepper.addEventListener('click', function (e) {
    updateActive(e);
    updateItem('greenpepper');
  });
});
