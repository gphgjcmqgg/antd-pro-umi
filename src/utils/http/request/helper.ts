import { AxiosResponse } from 'axios';
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
          return;
        }

        if (response.data.status_code === 402) {
          // TODO： 多点登录提示信息
          return;
        }

        if (response.data.status_code === 403) {
          // location.href = routeConfig.home;
          return;
        }

        if (response.data.status_code === 500) {
          // console.log(response.data.error_message);
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
