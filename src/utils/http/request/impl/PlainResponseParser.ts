import { AxiosResponse } from 'axios';

export default class PlainResponseParser {
  parse(response: AxiosResponse<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!response) {
        reject();
        return;
      }
      const { status, data } = response;
      if (status !== 200) {
        reject();
        return;
      }
      resolve(data);
    });
  }
}
