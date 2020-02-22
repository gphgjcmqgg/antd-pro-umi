class ABSHomeHeaderDataHelper {
  static getSelectedKey() {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    if (!pathname.includes('index.html')) {
      return `${pathname}index.html${hash}`;
    }
    return `${pathname}${hash}`;
  }
}
 
export default ABSHomeHeaderDataHelper;
