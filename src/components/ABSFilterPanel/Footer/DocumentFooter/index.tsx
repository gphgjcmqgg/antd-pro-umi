import React from 'react';
import MonthField from '../../../../abs/views/account/Resume/components/field/MonthField';

export interface IFooterProps {

}

export interface IFooterState {

}

class DocumentFooter extends React.Component<IFooterProps, IFooterState> {
  dateField: MonthField | null;

  getValue(): string {
    if (!this.dateField) { return ''; }
    const s = this.dateField.getValue();
    return s;
  }

  reset(value: string) {
    const d = this.dateField;
    if (d) { d.reset(value); }
  }

  render() {
    return (
      <div>
        <MonthField
          title="支付日"
          ref={view => this.dateField = view}
          placeholder="请输入支付日"
        />
      </div>
    );
  }
}

export default DocumentFooter;