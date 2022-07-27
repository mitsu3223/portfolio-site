import '../styles/style.scss';
import SmoothScroll from 'smooth-scroll';
import 'lazysizes';
import UserAgent from './UserAgent';
import SlideAnimation from './SlideAnimation';
import MouseStalker from './MouseStalker';
import ScrollAnimation from './ScrollAnimation';
import SplashScreenAnimation from './SplashScreenAnimation';
import SwitchNav from './SwitchNav';
import ScrollNav from './ScrollNav';

(async () => {
  const scroll = new SmoothScroll('a[href*="#"]', { speed: 200 });

  // スプラッシュ画面
  const splashScreenAnimation = new SplashScreenAnimation();
  await splashScreenAnimation.init();

  // スライドアニメーション
  const sliderItems = document.querySelectorAll('.mainV__slide_item');
  const mainVisualSlider = new SlideAnimation(sliderItems);
  mainVisualSlider.init();

  // スクロールアニメーション
  const scrollAnimation = new ScrollAnimation();
  scrollAnimation.init();

  // ハンバーガーメニュー開閉
  const switchNav = new SwitchNav();
  switchNav.init();

  // 画面右のスクロール連動ナビゲーション
  const scrollNav = new ScrollNav();
  scrollNav.init();

  // PCユーザーのみの処理
  const userAgent = new UserAgent();

  if (userAgent.isPC()) {
    // マウスストーカーアニメーション
    const mouseStalker = new MouseStalker();
    mouseStalker.init();
  }
})();