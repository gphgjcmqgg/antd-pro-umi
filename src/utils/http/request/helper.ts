import { AxiosResponse } from 'axios';
import ABSMessage from '@/components/ABSMessage';
import authService from '@/services/auth/authService';
import router from 'umi/router';
class HttpHelpers {
  /**
   * 请求超时设置
   *
   * @param {number} requestTimeout 请求超时时间
   * @returns {Promise<any>} Promise
   */
  static timeout(requestTimeout: number): Promise<any> {
    requestTimeout = requestTimeout;
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('网络请求超时')), requestTimeout);
    });
  }

  // TODO:
  static checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
      if (response.data.status_code) {
        if (response.data.status_code === 401) {
          authService.removeAllCache();
          if (window.location.href && window.location.href.indexOf('return_url') < 0 && window.location.href.indexOf('login') < 0) {
            router.push({
              pathname:'/user/login/',
              query:{
                return_url : window.location.href.replace('?', '*').replace(/&/g, '@'),
              },
            });
          }
          return;
        }

        if (response.data.status_code === 402) {
          authService.removeAllCache();
          // TODO： 多点登录提示信息
          if (window.location.href && window.location.href.indexOf('return_url') < 0 && window.location.href.indexOf('login') < 0) {
            // location.href = routeConfig.login + '?return_url=' + window.location.href.replace('?', '*').replace(/&/g, '@') + '&message=相同账号在其他地点登录，您已被迫退出';
            router.push({
              pathname:'/user/login/',
              query:{
                return_url: window.location.href.replace('?', '*').replace(/&/g, '@'),
                message: "相同账号在其他地点登录，您已被迫退出"
              },
            });

          }
          return;
        }

        if (response.data.status_code === 403) {
          router.push({
            pathname:'/welcome/',
          });
          return;
        }

        if (response.data.status_code === 500) {
          // console.log(response.data.error_message);
          ABSMessage.error(response.data.error_message);
          return;
        }
      } else {
        return response;
      }
    }

    // console.log('服务器或网络异常，请稍后再试');
    return null;
  }

  /**
   * 处理响应数据
   *
   * @param {AxiosResponse<any>} response 请求响应
   * @returns {Promise<any>} Promise
   */
  static parseResponse(response: AxiosResponse<any>): Promise<any> {

    return new Promise((resolve: any, reject: any): void => {
      if (response && response.data.code === 200 && response.data) {
        // 记录服务端响应数据
        let serverResponseData;
        if (typeof response.data === 'object' && response.data.hasOwnProperty('data')) {
          serverResponseData = response.data;
        } else if (typeof response.data === 'string') {

          try {
            // try parse json
            serverResponseData = JSON.parse(response.data);
          } catch (e) {
            // nothing to do
          }
        }

        // handle data or error
        if (serverResponseData && typeof serverResponseData === 'object') {

          if (serverResponseData.status === 'ok' && serverResponseData.hasOwnProperty('data')) {
            resolve(serverResponseData.data);
            return;
          }

          // ABSMessage.error(serverResponseData.data);
          resolve(null);
          if ( serverResponseData.data === '请求的资源不存在') {
            setTimeout(() => {
              // location.href = routeConfig.home;
            }, 3000);

          }
        }

      }
    });
  }
}

export default HttpHelpers;
