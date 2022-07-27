const className = {
  active: '-is__active',
  show: '-is__show',
};
export default class {
  constructor() {
    this.stalkerEle = document.querySelector('.mouseStalker');
    this.linkEle = document.querySelectorAll('a:not(.no_stick_), .gSubNav__btn');
    this.linkEleNum = this.linkEle.length;
  }

  addToggleClassNameEvent() {
    for (let i = 0; i < this.linkEleNum; i++) {
      this.linkEle[i].addEventListener('mouseover', () => {
        this.stalkerEle.classList.add(className.active);
      });
      this.linkEle[i].addEventListener('mouseout', () => {
        this.stalkerEle.classList.remove(className.active);
      });
    }
  }

  addStakerPositionWhenMousemove() {
    document.addEventListener('mousemove', e => {
      // マウス移動直後に一度だけストーカーを表示するクラスを付与
      if (!this.stalkerEle.classList.contains(className.show)) {
        this.stalkerEle.classList.add(className.show);
      }
      this.stalkerEle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  init() {
    this.addToggleClassNameEvent();
    this.addStakerPositionWhenMousemove();
  };
};