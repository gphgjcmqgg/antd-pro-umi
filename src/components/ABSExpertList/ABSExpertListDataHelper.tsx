import { IControls } from '../ABSForm';

export default class ABSExpertListDataHelper {
  static getControls({ key, label }: { key: string; label: string }) {
    const controls: IControls[] = [
      {
        type: 'search',
        label: '收件人',
        id: 'user_ids',
        required: true,
        placeholder: '收件人',
        style: { width: 400 },
        maxCount: 1,
        defaultValue: [{ key, label }]
      },
      {
        type: 'input',
        label: '站内信主题',
        id: 'title',
        required: true,
        style: { width: 668 }
      },
      {
        type: 'textarea',
        label: '站内信内容',
        id: 'content',
        className: 'internal-message-textarea-write',
        style: { width: 668, height: 366 },
        bottomTextClassName: 'bottom-hint-class-name'
      }
    ];
    return controls;
  }
}
