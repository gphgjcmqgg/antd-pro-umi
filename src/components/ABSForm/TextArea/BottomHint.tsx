import React from 'react';
import { INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH } from '../../../utils/constant';
import classNames from 'classnames';
import './BottomHint.less';

export default function BottomHint({
  value,
  className
}: {
  value: string;
  className?: string;
}) {
  let text = '';
  const classes = classNames('bottom-hint-container', className);
  if (value.length > INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH) {
    text = `已超出${value.length -
      INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH}个字`;
  } else if (
    value.length > INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH - 10 &&
    value.length < INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH
  ) {
    text = `还剩${INTERNAL_MESSAGE_MAX_TEXTAREA_CONTENT_LENGTH -
      value.length}个字`;
  }

  return (
    <div className={classes}>
      <p className="textarea-bottom-hint">{text}</p>
    </div>
  );
}
