import { IControls } from '../ABSForm';
import {
  INTERNAL_MESSAGE_MAX_TEXTAREA_TITLE_LENGTH,
  INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH
} from '../../utils/constant';

const handleValidatorContent = (rule: any, value: any, callback: any) => {
  if (value && value.length > INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH) {
    callback(
      `内容不能超过${INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH}字符！`
    );
  } else {
    callback();
  }
};

const handleValidatorTitle = (rule: any, value: any, callback: any) => {
  if (value && value.length > INTERNAL_MESSAGE_MAX_TEXTAREA_TITLE_LENGTH) {
    callback(`主题不能超过${INTERNAL_MESSAGE_MAX_TEXTAREA_TITLE_LENGTH}字符！`);
  } else {
    callback();
  }
};

export default class ABSFormModalContainerDataHelper {
  static formatControls(controls: IControls[]) {
    if (Array.isArray(controls)) {
      return controls.map((control: IControls) => {
        if (control.id === 'title' && !control.validator) {
          control.validator = handleValidatorTitle;
        }
        if (control.id === 'content' && !control.validator) {
          control.validator = handleValidatorContent;
        }
        return control;
      });
    }
    return controls;
  }
}
