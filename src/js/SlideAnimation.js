import { gsap } from 'gsap';

export default class {
  constructor(props) {
    this.target = props;
    this.targetNum = this.target.length;
    this.delay = 4.5;
    this.repeatDelay = 4;
  }

  animation(target, delay) {
    const tl = gsap.timeline({
      repeat: -1,
      delay,
      repeatDelay: this.repeatDelay,
    });

    tl.set(
      target,
      {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        zIndex: 10,
        scale: 1.05,
      },
    )
    .to(
      target,
      {
        clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0 100%)',
        ease: 'easeInOutCubic',
        scale: 1,
        duration: 1,
      },
    )
    .to(
      target,
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ease: 'easeInOutCubic',
        duration: 0.1,
      },
    )
    .to(
      target,
      {
        duration: 0,
      },
    )
    .to(
      target,
      {
        duration: 4.9,
        zIndex: 0,
      },
    );
  }

  init() {
    for (let i = 0; i < this.targetNum; i++) {
      this.animation(this.target[i], i * this.delay);
    }
  }
};