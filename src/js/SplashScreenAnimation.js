import { gsap } from 'gsap';

export default class {
  constructor() {
    this.target = {
      bg: document.querySelector('.splashScreen'),
      animBg: '.splashScreen__bg',
      text: '.splashScreen__text',
    };
    this.hideTime = 2000;
  }

  animation() {
    const tl = gsap.timeline();

    tl.to(
      this.target.text,
      {
        display: 'none',
        duration: 0,
      },
    )
    .to(
      this.target.animBg,
      {
        x: '100%',
        ease: 'expo',
        duration: 1.5,
        delay: 0,
        stagger: {
          from: 'start',
          each: 0,
        }
      },
    );
  }

  init() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.animation();
        resolve();
      }, this.hideTime);
    });
  }
};