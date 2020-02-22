import ISelect from '../ISelect';

export default class DefaultSelect implements ISelect {
  value: number;  

  labelName: string;

  relatedkeys: number[];

  constructor(value: number, labelName: string) {
    this.value = value;
    this.labelName = labelName;
  }
}