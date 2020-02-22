export interface ItemData {
  message: {
    id?: number,
    title?: string,
    datetime?: any;
    messageId?: number,
    markStatus?: boolean;
    status?: string;
  };
  user: {
    name?: string;
    avatar?: string;
  };
}

export function getDateStr(AddDayCount: number) {
  var dd = new Date(); 
  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期 
  var y = dd.getFullYear(); 
  var m = dd.getMonth() + 1; // 获取当前月份的日期 
  var d = dd.getDate(); 
  return y + '-' + m + '-' + d; 
}

export function timeFomat(time: any) {
  const getTime = time.replace(/[:-]/g, '').trim().toString();
  const year = getTime.substring(0, 4);
  const month = getTime.substring(4, 6);
  const day = getTime.substring(6, 8);
  const hour = getTime.substring(9, 11);
  const minute = getTime.substring(11, 13);
  const createTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  const date3 = getDateStr(-1); // 昨天
  const str3 = date3.split('-');
  str3[1] = str3[1].length === 1 ? '0' + str3[1] : str3[1];
  str3[2] = str3[2].length === 1 ? '0' + str3[2] : str3[2];
   
  const date0 = getDateStr(0); // 今天
  const str0 = date0.split('-');
  str0[1] = str0[1].length === 1 ? '0' + str0[1] : str0[1];
  str0[2] = str0[2].length === 1 ? '0' + str0[2] : str0[2];
   
  if (year === str3[0] && month === str3[1] && day === str3[2]) {
    return '昨天' + ' ' + hour + ':' + minute;
  } else if (year === str0[0] && month === str0[1] && day === str0[2]) {
    return '今天' + ' ' + hour + ':' + minute;
  } else {
    return createTime;
  }
}

// export class ModalHelper {
//   static show(modal: any, visible: boolean, params?: any) {
//     if (modal) { modal.show(visible, params); }
//   }
// }
