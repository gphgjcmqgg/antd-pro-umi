import { EventEmitter } from 'events';
import { SHARE_SUCCESS_MESSAGE } from '../../../utils/constant';

export default new EventEmitter();

export enum EVENT_NAME {
  GET_REGISTER = 'get_register'
}

export const InstructionsList = [{
  title: '163邮箱：',
  content: '通讯录→导出通讯录→按文件格式导出通讯录→CSV格式'
},
{
  title: '腾讯邮箱：',
  content: '通讯录→工具→导出联系人→CSV格式'
},
{
  title: '139邮箱：',
  content: '通讯录→更多→导出通讯录→导出'
},
{
  title: '263邮箱：',
  content: '通讯录→更多→导出→CSV格式'
},
{
  title: '阿里邮箱：',
  content: '通讯录→导出联系人→CSV格式'
}];

export const defaultLinkContent = '这里有ABS行业最新的动态、热点和资讯，一起来看看吧\n';
export const CopySuccessMessage = SHARE_SUCCESS_MESSAGE;
export const EmailInvitationPlaceholder = '输入邮箱地址，多个邮箱请用英文逗号隔开。\n如：sy@163.com,Lm@163.com';

export const LinkInvitationHeaderImg = require('../../../assets/images/LinkInvitation.png');
export const EmailInvitationHeaderImg = require('../../../assets/images/EmailInvitation.png');
export const AddressBookInvitationHeaderImg = require('../../../assets/images/AddressBookInvitation.png');

// 邮箱格式转换   //和验证
// const emailRegular = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
export function setEmailList(emailContent: string) {
  let emailList = (emailContent.replace(/\s*/g, '')).split(',');
  // for (let i = 0; i < emailList.length; i++) {
  //   if (!emailRegular.test(emailList[i])) {
  //     return emailList[i];
  //   }
  // }
  return emailList;
}