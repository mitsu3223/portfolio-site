export default class {
  constructor() {
    this.target = {
      navItem: document.querySelectorAll('.scrollNav__link'),
    };
    this.sectionPosition = [],
    this.navItemNum = this.target.navItem.length;
  }

  switchClassName() {
    const scrollTop = window.pageYOffset;
    const sectionNum = this.sectionPosition.length;

    for (let i = 0; i < sectionNum; i++) {
      if (
        this.sectionPosition[i].top <= scrollTop &&
        this.sectionPosition[i].bottom >= scrollTop
      ) {
        for (let j = 0; j < this.navItemNum; j++) {
          if (this.target.navItem[j]?.classList.contains('-js__active')) {
            this.target.navItem[j]?.classList.remove('-js__active');
          }
        }
        if (!this.target.navItem[i]?.classList.contains('-js__active')) {
          this.target.navItem[i]?.classList.add('-js__active');
        }
      }
    }
  }

  getSectionPosition() {
    for (let i = 0; i < this.navItemNum; i++) {
      const section = document.querySelector(this.target.navItem[i].getAttribute('href'));
      const offsetTop = section?.offsetTop;
      const offsetBottom = offsetTop + section?.offsetHeight;

      this.sectionPosition[i] = {
        top: offsetTop,
        bottom: offsetBottom,
      };
    }
  }

  init() {
    this.getSectionPosition();
    window.addEventListener('resize', () => {
      this.getSectionPosition();
    });

    this.switchClassName();
    window.addEventListener('scroll', () => {
      this.switchClassName();
    });
  }
};