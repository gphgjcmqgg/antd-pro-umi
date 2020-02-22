import absui from '../../models/absui';
import CommonUtils from '../../../utils/commonUtils';

const menuData = absui.state.navigationMenus.map((menu) => {
  menu.url = CommonUtils.parseUrl(`absui.html#${menu.url}`);
  return menu;
});

export const absUIMenuData  = menuData;