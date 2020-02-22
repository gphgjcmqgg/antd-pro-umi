import axios, { AxiosRequestConfig } from 'axios';
import helper from './helper';
import qs from 'qs';
import { RequestMethod, MIMEType } from './enum';
import PlainResponseParser from './impl/PlainResponseParser';

export default class Request {

  /**
   * 请求默认超时时间
   */
  private static readonly defaultTimeout = 100 * 1000;

  /**
   * 发送一个POST异步请求
   *
   * @param {string} url 请求地址
   * @param {*} params request url的请求数据, 键值对
   * @param {*} data request body的请求数据, 键值对
   * @memberof Request
   */
  static async post(url: string, params?: any, data?: any) {
    const config = {
      url,
      method: RequestMethod.post,
      params,
      data: qs.stringify(data),
      headers: {
        'Accept': MIMEType.json,
        'Content-Type': MIMEType.form,
      },
    };

    return Request.request(config);
  }

  /**
   * 发送一个异步请求
   *
   * @param {AxiosRequestConfig} config Axios请求配置
   */
  private static async request(config: AxiosRequestConfig, parser?: any) {
    const defaultConfig: AxiosRequestConfig = {
      timeout: Request.defaultTimeout,
      withCredentials: true,
      // cancelToken: AbortBus.cancelToken,
      ...config,
    };

    const timeout = defaultConfig.timeout || Request.defaultTimeout;
    let asyncResult = axios.request(defaultConfig)
      .then(helper.checkStatus)
      .then(response => {
        if (parser && parser instanceof PlainResponseParser) {
          return parser.parse(response);
        }
        return helper.parseResponse(response);
      });

    return Promise.race([helper.timeout(timeout), asyncResult]);
  }
}
