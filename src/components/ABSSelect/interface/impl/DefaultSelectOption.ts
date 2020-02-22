import ISelectOption from '../../utils/ISelectOption';

export default class DefaultSelectOption implements ISelectOption {
  value: string;  
  
  labelName: string;

  constructor(value: string, labelName: string) {
    this.value = value;
    this.labelName = labelName;
  }
}
