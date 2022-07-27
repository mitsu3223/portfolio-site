export default class {
  constructor() {
    this.ua = navigator.userAgent;
  }

  isPC() {
    if (!(
        this.ua.indexOf('iPhone') > 0 ||
        this.ua.indexOf('iPad') > 0 ||
        this.ua.indexOf('Android') > 0 ||
        this.ua.indexOf('Mobile') > 0
    )) {
      return true;
    } else {
      return false;
    }
  }
};