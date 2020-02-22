import React from 'react';
import ABSForm, { IControls } from '../ABSForm';

export interface IABSInternalMessageProps {
  onConfirm: (values: any) => void;
  controls: IControls[];
  wrapperWidth?: number;
}

export interface IABSInternalMessageState {}

class ABSInternalMessage extends React.Component<
  IABSInternalMessageProps,
  IABSInternalMessageState
> {
  render() {
    const { onConfirm, controls, wrapperWidth } = this.props;
    return (
      <ABSForm
        controls={controls}
        onConfirm={onConfirm}
        wrapperWidth={wrapperWidth}
      />
    );
  }
}

export default ABSInternalMessage;
