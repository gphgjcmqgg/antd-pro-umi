import moment from 'moment';
export const SIDEBAR_WIDTH = 160;
export const ABSUI_SIDEBAR_WIDTH = 200;
export const ABSUI_MARGIN_BOTTOM = 20;
export const FILTER_TABLE_NO_CONTENT_MESSAGE = '无符合筛选条件的结果';
export const MARKET_TYPE_CREDIT_ABS = '19';
export const MARKET_TYPE_ENTERPRISE_ABS = '20';
export const MARKET_TYPE_ABN = '88';
export const FILTER_DEFAULT_START_DATE = '2005-01-01';
export const FILTER_DEFAULT_NOW_MONTH = new Date().getMonth();
export const FILTER_DEFAULT_END_DATE = new Date().getFullYear() + '-12-31';
export const FILTER_DEFAULT_LAST_YEAR_START_DATE = new Date().getFullYear() - 1 + '-01-01';
export const FILTER_DEFAULT_YEAR_START_DATE = FILTER_DEFAULT_NOW_MONTH >= 3 ? new Date().getFullYear() + '-01-01' : FILTER_DEFAULT_LAST_YEAR_START_DATE;
export const FILTER_DEFAULT_TODAY_DATE = moment().format('YYYY-MM-DD');
export const FILTER_DEFAULT_NOW_YEAR = moment().format('YYYY');
export const FILTER_DEFAULT_SWITCH_ON = true;
export const FILTER_DEFAULT_SWITCH_OFF = false;
export const PRICE_NO_SUPPORT = '当前证券不适用情景分析';
export const PRODUCT_ASSET_POOL_NO_SUPPORT =
  '当前产品暂缺资产池数据，欢迎您提供相关数据和信息，我们将优先为您服务';
export const PRODUCT_BASIC_ANALYSIS_NO_SUPPORT =
  '当前产品暂缺基本分析所需数据，欢迎您提供相关数据和信息，我们将优先为您服务';
export const PRODUCT_MONTE_CARLO_NO_SUPPORT =
  '当前产品暂缺蒙特卡洛所需数据，欢迎您提供相关数据和信息，我们将优先为您服务';
export const INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH = 5000;
export const INTERNAL_MESSAGE_MAX_TEXTAREA_TITLE_LENGTH = 100;
export const INTERNAL_MESSAGE_DISPATCH_INTERVAL = 10 * 60 * 1000;
export const INTERNAL_MESSAGE_COUNI_SHOW_TIMEOUT = 10000;
export const PORTFOLIO_REMIND_SETTING = 7;
export const POINT_BASE_MSG = '会给予一定的积分奖励';
export const FEEDBACK_SUCCESS_MSG = `我们已收到您的反馈，意见采纳后，${POINT_BASE_MSG}`;
export const FEEDBACK_SUCCESS_MSG_NOLOGIN = `我们已收到您的反馈，感谢您提出的宝贵意见！`;
export const FIRST_DEAL_NOMINATION_SUCCESS_MSG = `提名成功<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后台审核通过后，${POINT_BASE_MSG}`;
export const SHARE_SUCCESS_MESSAGE = '已复制到粘贴板，可使用Ctrl+V粘贴到需要的地方，邀请成功即可获得积分';
export const COPY_SUCCESS_MESSAGE = '已复制到粘贴板，可使用Ctrl+V粘贴到需要的地方，分享成功即可获得积分';
export const COPY_SUCCESS_MESSAGE_NOLOGIN = '已复制到粘贴板，可使用Ctrl+V粘贴到需要的地方，登录后分享成功即可获得积分';