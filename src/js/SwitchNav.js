const className = {
  active: '-is__active',
  show: '-is__show_nav',
};

export default class {
  constructor() {
    this.target = {
      body: document.querySelector('body'),
      btn: document.querySelector('.gSubNav__btn'),
      navBody: document.querySelector('.gSubNav__body'),
      itemSelector: '.gSubNav__item',
      item: document.querySelectorAll('.gSubNav__item'),
    };
    this.itemNum = this.target.item.length;
  }

  hide() {
    this.target.btn.classList.remove(className.active);
    this.target.navBody.classList.remove(className.show);
    this.target.body.classList.remove(className.show);
  }

  addSwitchDisplayStateEventToBtn() {
    this.target.btn.addEventListener('click', () => {
      // 閉じる処理
      if (this.target.btn.classList.contains(className.active)) {
        this.hide();
      } else {
        this.target.btn.classList.add(className.active);
        this.target.navBody.classList.add(className.show);
        this.target.body.classList.add(className.show);
      }
    });
  }

  addHideEventToItem() {
    for (let i = 0; i < this.itemNum; i++) {
      this.target.item[i].addEventListener('click', () => {
        this.hide();
      });
    }
  }

  async init() {
    this.addSwitchDisplayStateEventToBtn();
    this.addHideEventToItem();
  }
};