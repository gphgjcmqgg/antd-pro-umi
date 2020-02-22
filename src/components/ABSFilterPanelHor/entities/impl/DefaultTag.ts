import ITag from '../ITag';

export default class DefaultTag implements ITag {
  id: number;

  content: string;

  selected: boolean;

  relatedkeys: number[];

  constructor(id: number, content: string, selected: boolean) {
    this.id = id;
    this.content = content;
    this.selected = selected;
  }
}