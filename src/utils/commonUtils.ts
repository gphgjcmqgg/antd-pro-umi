import qs from 'qs';
import moment from 'moment';
import ABSMessage from '../components/ABSMessage';
import _ from 'lodash';
const defaultAvatar = require('../assets/images/default-avatar.png');

class CommonUtils {
  nullText = '--';

  isMobile = {
    Android: () => {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: () => {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: () => {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: () => {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: () => {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: () => {
      return (this.isMobile.Android() || this.isMobile.BlackBerry() || this.isMobile.iOS() || this.isMobile.Opera() || this.isMobile.Windows());
    }
  };

  // private isPlus = 0;

  /**
   * 数据格式综合处理
   * @param contents 内容
   * @param isTable 是否为null是，数据来源类型是否是table (默认：false) null=false
   * @param isPercent 是否*100（百分位） (默认：false) null=false
   * @param isThousandth 是否有千分位+‘,’  (默认：true) null=true
   * @param num 保留位数 （默认：不填时为2；如果不保留位数请填0）null=2
   * @param unit 数值转换,单位：（默认：0=【元】；4=【万】；6=【百万】；8=【亿】）null=0
   * @param showPercentSign 是否显示百分号 （默认: true)
   */
  formatContent = (
    contents: any,
    isTable?: boolean | null,
    isPercent?: boolean | null,
    isThousandth?: boolean | null,
    num?: number | null,
    unit?: 0 | 4 | 6 | 8 | null,
    showPercentage?: boolean | null,

  ) => {
    if ((contents || contents === 0) && contents.toString().length > 0) {
      let contentsNum = this.isNumber(contents);
      if (contentsNum || contentsNum === 0) {
        if (isPercent) {
          contentsNum = this.absMul(contentsNum, 100);
        }
        if (unit) {
          const pow = Math.pow(10, unit);
          contentsNum = this.absDiv(contentsNum, pow);
        }
        contentsNum = this.toFixed(contentsNum, num);
        if (isThousandth !== false ? true : isThousandth) {
          contentsNum = this.formatCurrency(contentsNum);
        }

        // 不传默认值为true
        const shouldShowPercentage = showPercentage == null ? true : showPercentage;
        // 没有传num 保留%  传了num 且 num <=2 保留%
        const showPercent = !num || num <= 2 || num === 4;
        if (isPercent && showPercent && shouldShowPercentage) {
          return `${contentsNum}%`;
        }
        return contentsNum;
      }
      return contents;
    }
    const nullText = this.nullText;
    return nullText;
  }

  /**
   * 获取String格式
   * @param value 传入的string或null或undefined
   */
  formatString(value: string | null | undefined) {
    if (value && value.toString().length > 0) {
      return value;
    }
    const nullText = this.nullText;
    return nullText;
  }

  /**
   * 获取时间格式
   * @param value 传入的时间值
   * @param type 时间的类型，默认时候YYYY-MM-DD
   */
  formatDate(value: any, type?: '-' | '.' | null, pattern?: string) {
    if (!value) {
      return '--';
    }
    if (type) {
      return moment(value).format(`YYYY${type}MM${type}DD`);
    }
    return moment(value).format(pattern ? pattern : 'YYYY-MM-DD');
  }

  /**
   * 内容是否为数字处理
   * @param contents 内容
   */
  isNumber(contents: any) {
    if (!isNaN(contents) && (typeof contents === 'number')) {
      return contents;
    }
    if (typeof contents === 'string' && contents.trim() !== '') {
      if (Number.isFinite ? Number.isFinite(+contents) : isFinite(+contents)) {
        return Number(contents);
      }
    }
    return false;
  }

  /**
   * 精确度的控制
   * @param num 转换的数字
   * @param position 显示几位小数，默认的是两位小数，可以不传
   */
  toFixed(num: any, position?: number | null) {
    const positions = (!position && position !== 0) ? 2 : position;
    return num.toFixed(positions);
  }

  /**
   * 千分位加逗号
   */
  formatCurrency = (num: any) => {
    if (num) {
      num = num.toString().replace(/\$|\,/g, '');
      // if ('' === num || isNaN(num) || '-' === num) { return '-'; }
      var sign = num.indexOf('-') >= 0 ? '-' : '';
      var cents = num.indexOf('.') >= 0 ? num.substr(num.indexOf('.')) : '';
      cents = cents.length > 1 ? cents : '';
      num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num;
      if (sign === '-') {
        num = num.replace(/-/g, '');
      }
      num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      }
      return (sign + num + cents);
    }
    return num;
  }

  /**
   * 加法函数，用来得到精确的加法结果
   * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   * 调用：accAdd(arg1,arg2)
   * 返回值：arg1加上arg2的精确结果
   */
  absAdd(arg1: any, arg2: any) {
    if (isNaN(arg1)) {
      arg1 = 0;
    }
    if (isNaN(arg2)) {
      arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', '')) * cm;
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm;
        arg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
  }
  /**
   * 减法函数，用来得到精确的减法结果
   * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
   * 调用：accSub(arg1,arg2)
   * 返回值：arg1加上arg2的精确结果
   */
  absSub(arg1: any, arg2: any) {
    if (isNaN(arg1)) {
      arg1 = 0;
    }
    if (isNaN(arg2)) {
      arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);

    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }
  /**
   * 乘法函数，用来得到精确的乘法结果
   * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   * 调用：accMul(arg1,arg2)
   * 返回值：arg1乘以 arg2的精确结果
   */
  absMul(arg1: any, arg2: number) {
    if (isNaN(arg1)) {
      arg1 = 0;
    }
    if (isNaN(arg2)) {
      arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);

    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {
      // 
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
      // 
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }
  /** 
   * 除法函数，用来得到精确的除法结果
   * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   * 调用：accDiv(arg1,arg2)
   * 返回值：arg1除以arg2的精确结果
   */
  absDiv(arg1: any, arg2: number) {
    if (isNaN(arg1)) {
      arg1 = 0;
    }
    if (isNaN(arg2)) {
      arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);

    let t1 = 0,
      t2 = 0,
      r1: any,
      r2: any;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      // 
    }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      // 
    }
    // with (Math) {
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
    // }
  }

  getMaxHeight(row: HTMLElement[]) {
    let maxHeight = row[0].offsetHeight;
    row.forEach((col) => {
      if (col.offsetHeight > maxHeight) {
        maxHeight = col.offsetHeight;
      }
    });
    return maxHeight;
  }
  
  /**
   * 获取头像地址，头像不存在时使用默认头像
   * @param {string} avatar  原头像
   * @returns {string} 新头像
   */
  getAvatar(avatar: string | null): string {
    return !avatar ? defaultAvatar : avatar;
  }

  downloadFile(sUrl: string) {
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    // iOS devices do not support downloading. We have to inform user about this.
    // if (/(iP)/g.test(navigator.userAgent)) {
    //   alert('Your device does not support files downloading. Please try again in desktop browser.');
    //   return false;
    // }

    // If in Chrome or Safari - download via virtual link click
    if (isChrome || isSafari) {
      // Creating new link node.
      var link = document.createElement('a');
      link.href = sUrl;

      if (link.download !== undefined) {
        // Set HTML5 download attribute. This will prevent file from opening if supported.
        var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
        link.download = fileName;
      }

      // Dispatching click event.
      if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
      sUrl += '?download';
    }

    window.open(sUrl, '_self');
    return true;
  }

  // 电话号码验证
  getPhoneNumber(phonenumber: string, callback: any) {
    if (phonenumber && !(/^1[34578]\d{9}$/.test(phonenumber))) {
      return callback('号码格式不对');
    }
    return callback('');
  }

  getParams() {
    return qs.parse(location.hash.split('?')[1]);
  }

  /**
   * 获取当天日期
   * @returns {string} YYYY-MM-DD
   */
  getNowFormatDate() {
    return moment().format('YYYY-MM-DD');
  }

  /**
   * 获取年 当前年份N年前
   * @returns {string} YYYY-MM-DD
   */
  getBeforeFormatDate(num: number, chooseDate?: string) {
    if (chooseDate) {
      return moment(chooseDate).subtract(num, 'years').format('YYYY');
    }
    return moment().subtract(num, 'years').format('YYYY');
  }

  /**
   * 获取年 当前年份N年前-1月时间戳
   * @returns 
   */
  getBeforeTime(num: number) {
    return new Date(moment().subtract(num, 'years').format('YYYY-01')).getTime();
  }

  /**
   * 获取年 当前年份N年前-1月时间戳
   * @returns 
   */
  getBeforeSpecMonthTime(num: number, month: string) {
    return new Date(moment().subtract(num, 'years').format(`YYYY-${month}`)).getTime();
  }

  /**
   * 获取 当前年份月份时间戳
   * @returns 
   */
  getNowDateMonthTime() {
    return new Date(moment().format('YYYY-MM')).getTime();
  }

  /**
   * 旋转文字为竖直方向
   * @param {string} title
   * @param {boolean} direction 方向，true表示表示左边坐标轴，反之右坐标轴
   */
  titleReserver(title: string, direction: boolean) {
    if (direction) {
      title = title.split('').reverse().join('');
    }
    var split = title.split('');
    let textDeg = direction ? 90 : -90;
    let symbolDeg = direction ? 180 : 0;
    var rlt: any = [];
    let symbol = ['(', ')', '（', '）'];
    split.forEach(function (letter: any) {
      let deg = textDeg;
      if (symbol.some(item => item === letter)) {
        deg = symbolDeg;
      }
      rlt.push(`<span style="transform:rotate(${deg}deg);
      display: inline-block;">${letter}</span>`);
    });
    return rlt.join('');
  }

  /**
   * @description: y轴左边坐标轴的文字显示
   * @param {string} title 
   */
  leftTitleReserver(title: string) {
    return this.titleReserver(title, true);
  }
  /**
   * @description: y轴右边坐标轴的文字显示
   * @param {string} title 
   */
  rightTitleReserver(title: string) {
    return this.titleReserver(title, false);
  }

  numberThousandFormat(val: any) {
    var re = /(?=(?!(\b))(\d{3})+$)/g;
    return val.toString().replace(re, ',');
  }

  /**
   * 转换Url（域名替换）
   * @param {string} url  原链接
   * @returns {string} 新链接
   */
  parseUrl(url: string): string {
    if (!url) { return url; }
    return url.indexOf('http') > -1 ? url : process.env.REACT_APP_PUBLISH_PATH + url;
  }

  /**
   * 获取menu的所有key
   * @param {any[]} menus
   */
  getOpenKeys(menus: any[]) {
    if (menus && Array.isArray(menus)) {
      return menus.map((item) => {
        return item.url ? item.url : item.key;
      });
    }
    return [];
  }

  /**
   * 限制字数，超出部分以省略号...显示
   * @param {string} txt  原内容
   * @param {number} num  限制字数
   * @returns {string} 新内容
   */
  limitTxtLength(txt: string, num: number) {
    if (txt && txt.length > num) {
      txt = txt.substr(0, num) + '...';
    }
    return txt;
  }

  /**
   * 判断下载是否成功
   * @returns {object} response
   */
  downloadIsSuccess(response: any, onSuccess: (response: any) => void) {
    const isSuccess = _.get(response, 'is_success', false);
    const failMsg = _.get(response, 'fail_msg', '接口返回值格式错误');

    if (!response) {
      return;
    }
    if (!isSuccess) {
      if (failMsg) {
        ABSMessage.error(failMsg);
      }
      return;
    }
    onSuccess(response);
  }

  /**
   * 使滚动容器的滚动条出现
   * @param container 滚动条所在的容器
   */
  setScrollContainerActive(container: HTMLElement) {
    setTimeout(() => {
      container.scrollLeft = 1;
    }, 500);
  }

  /**
   * 返回提示的信息（Form）
   * @param message 错误信息
   */
  getValidate(message: string) {
    if (!message) {
      return {
        validateStatus: 'success',
        errorMsg: '',
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: `${message}`,
    };
  }

  /**
   * 获取时间的秒数（参数：d，h,m,s） 12m
   * @param time 失效时间
   */
  getSec(str: any) {
    var str1 = str.substr(0, str.length - 1);  // 时间数值 
    var str2 = str.substr(str.length - 1, 1);    // 时间单位
    if (str2 === 's') {
      return str1 * 1000;
    } else if (str2 === 'm') {
      return str1 * 60 * 1000;
    } else if (str2 === 'n') {
      return str1 * 60 * 60 * 1000;
    } else if (str2 === 'd') {
      return str1 * 24 * 60 * 60 * 1000;
    }
    return str;
  }

  /**
   * 存入浏览器cookie
   * @param name cookie名称
   * @param value cookie值
   * @param time 失效时间
   */
  addCookie(name: string, value: string, time?: string) {
    // let strSec = this.getSec(time || '0');
    // let exp = new Date();
    // exp.setTime(exp.getTime() + strSec * 1);
    document.cookie = name + '=' + value;
  }

  /**
   * 删除浏览器cookie
   * @param name cookie名称
   */
  delCookie(name: string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    // 获取cookie是否存在
    var value = this.getCookie(name);
    if (value != null) {
      document.cookie = name + '=' + value + ';expires=' + exp.toUTCString();
    }
  }

  /**
   * 获取浏览器cookie
   * @param name cookie名称
   */
  getCookie(name: string) {
    // 获取当前所有cookie
    var strCookies = document.cookie;
    // 截取变成cookie数组
    var array = strCookies.split('; ');
    // 循环每个cookie
    for (var i = 0; i < array.length; i++) {
      // 将cookie截取成两部分
      var item = array[i].split('=');
      // 判断cookie的name 是否相等
      if (item[0] === name) {
        return item[1];
      }
    }
    return '';
  }

  /**
   * 获取倒计时的时间
   * @param startTime
   * @param endTime 
   */
  getLeaveTime(startTime: string = new Date().toString(), endTime: string = '2019-11-14 17:00:00') {
    if (startTime === '' || endTime === '') {
      return '';
    }
    const m1 = Number(moment(startTime).format('x'));
    const m2 = Number(moment(endTime).format('x'));
    if (m1 > m2) {
      return '0时0分0秒';
    }
    const length = moment.duration(m2 - m1);
    const months = length.months();
    const days = length.days();
    const hours = length.hours();
    const minutes = length.minutes();
    const seconds = length.seconds();
    if (months === 0 ) {
      return `${days}天${hours}时${minutes}分${seconds}秒`;
    }
    return `${months}月${days}天${hours}时${minutes}分${seconds}秒`;
  }

  /**
   * 获取倒计时的时间(秒数 + 1)
   * @param startTime
   */
  getLeaveStartTime(startTime: string = new Date().toString()) {
    const leaveTime = moment(startTime).add(1, 's').format('YYYY-MM-DD HH:mm:ss');
    return leaveTime;
  }
}

export default new CommonUtils();