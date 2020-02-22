const API_ADDRESS = process.env.apiUrl; // 未清理过的API前缀
console.log('API_ADDRESS',API_ADDRESS);
const CNABS_API_ADDRESS = `${API_ADDRESS}/apigateway/cnabs`; // 清理过的API前缀

// 全局
export const GlobalApi = {
  downloadFile: `${CNABS_API_ADDRESS}/global/download?guid=`, // 全局下载
  captcha: `${CNABS_API_ADDRESS}/global/captcha`, // 数字验证码
}
export const AccountApi = {
  login: `${CNABS_API_ADDRESS}/account/login/cnabs`, // 登录
}

// 首页
export const HomePageApi = {

  newsHotHome: `${CNABS_API_ADDRESS}/home/hotnews`, // 首页热门资讯

};
