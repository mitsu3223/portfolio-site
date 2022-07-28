import { isEmptyNodeList } from './utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default class {
  addGNavAnimation() {
    gsap.to('.gNav', {
      yPercent: -100,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.main',
        start: 'top top',
        scrub: true,
      }
    });
  }

  addTitleAnimation() {
    const text = document.querySelectorAll('.sectionTitle__text');
    const vis = document.querySelectorAll('.sectionTitle__vis');

    for (let i = 0; i < text.length; i++) {
      this.titleVisAnimation(vis[i]);
      this.titleAnimation(text[i], 1);
    }
  }

  titleAnimation(target) {
    const tl = gsap.timeline();
    tl.set(
      target,
      {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        transform: 'scaleY(0)',
      },
    )
    .to(
      target,
      {
        transform: 'scaleY(1)',
        ease: 'easeInOutCubic',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: .7,
      },
    );

    ScrollTrigger.create({
      animation: tl,
      trigger: target,
      start: 'center center',
    });
  }

  titleVisAnimation(target, delay) {
    const tl = gsap.timeline();
    tl.set(
      target,
      {
        transform: 'scaleX(0)',
      },
    )
    .to(
      target,
      {
        transform: 'scaleX(1)',
        ease: 'easeInOutCubic',
        duration: .7,
      },
    );

    ScrollTrigger.create({
      animation: tl,
      trigger: target,
      start: 'center center-=100',
    });
  }

  addArchivesAnimation() {
    const item = document.querySelectorAll('.archives__item');

    if (!isEmptyNodeList(item)) {
      return;
    }

    for (let i = 0; i < item.length; i++) {
      this.itemAnimation(item[i]);
    }
  }

  addArchivesTagAnimation() {
    const tag = document.querySelectorAll('.archives__tag_text');
    const vis = document.querySelectorAll('.archives__tag_vis');

    if (!isEmptyNodeList(tag) || !isEmptyNodeList(vis)) {
      return;
    }

    for (let i = 0; i < tag.length; i++) {
      this.tagAnimation(tag[i], .5);
      this.tagAnimation(vis[i], .4);
    }
  }

  itemAnimation(target) {
    const tl = gsap.timeline();
    tl.set(
      target,
      {
        opacity: 0,
        scale: .95,
      },
    )
    .to(
      target,
      {
        marginTop: '-100px',
        opacity: 1,
        scale: 1,
        ease: 'easeInOutCubic',
        duration: .5,
      },
    );

    ScrollTrigger.create({
      animation: tl,
      trigger: target,
      start: 'top bottom',
    });
  }

  tagAnimation(target, delay) {
    const tl = gsap.timeline({
      delay,
    });
    tl.set(
      target,
      {
        opacity: 0,
      },
    )
    .to(
      target,
      {
        y: -10,
        opacity: 1,
        ease: 'easeInOutCubic',
        duration: .5,
      },
    );

    ScrollTrigger.create({
      animation: tl,
      trigger: target,
      start: 'top bottom',
    });
  }

  addTextUpAnimation() {
    const targetSelector = '.mainV__text-up';
    const target = document.querySelectorAll(targetSelector);

    if (!isEmptyNodeList(target)) {
      return;
    }

    gsap.set(targetSelector, {
      opacity: 0.5,
    });

    gsap.to(targetSelector, {
      yPercent: -50,
      opacity: 1,
      scrollTrigger: {
        trigger: '.mainV',
        start: 'top bottom' ,
        scrub: 2,
      },
      stagger: {
        from: 'end',
        amount: 0.12,
      }
    });
  }

  init() {
    this.addGNavAnimation();
    this.addTextUpAnimation();
    this.addTitleAnimation();
    this.addArchivesAnimation();
    this.addArchivesTagAnimation();
  }
};