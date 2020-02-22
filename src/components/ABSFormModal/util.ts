import { ILabeledValue } from '../ABSForm';

export function formatPayload(payload: Object) {
  let keys = Object.keys(payload);
  for (let i = 0; i < keys.length; i++) {
    if (Array.isArray(payload[keys[i]])) {
      payload[keys[i]] = payload[keys[i]]
        .map((item: ILabeledValue) => {
          return item.key;
        })
        .join(',');
    }
  }
  return payload;
}
interface IInternalMessageFormat {
  sender: string;
  recipient: string;
  time: string;
  title: string;
  content: string;
}

export function formatInternalMessageContent({
  sender,
  recipient,
  time,
  title,
  content
}: IInternalMessageFormat) {
  return `




---------------------------------------------------------------------------------------------------------------
发件人： ${sender}
时间： ${time}
收件人： ${recipient}
站内信主题： ${title}
  
${content}`;
}