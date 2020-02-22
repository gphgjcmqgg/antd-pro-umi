import ABSParagraph from '../ABSParagraph';
import React from 'react';
import './index.less';

function LineSeperator() {
  return (
    <span className="line-seperator" />
  );
}

export function getDefaultColumnsData() {
  const columnsData = [
    {
      title: '参数',
      dataIndex: 'param',
      className: 'white-space-normal',
    }, {
      title: '说明',
      dataIndex: 'desc',
      render: (text) => <ABSParagraph>{text}</ABSParagraph>,
    }, {
      title: '类型',
      dataIndex: 'type',
      render: (content: string[] | string) => {
        if (Array.isArray(content)) {
          return content.reduce((acc: any[], curr, index) => {
            acc = acc.concat(<span>{curr}</span>);

            if (index !== content.length - 1) {
              acc = acc.concat(<LineSeperator />);  
            }
            return acc;
          }, []);
        }
        return content;
      }
    }, {
      title: '默认值',
      dataIndex: 'default',
      className: 'white-space-normal',
    }
  ];
  return columnsData;
}
