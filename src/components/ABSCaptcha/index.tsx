import React from 'react';
import './index.less';
import classNames from 'classnames';
import { getRandomArray, getRandomNumber } from './util';
// import { string } from 'prop-types';
import { connect } from 'dva';
import { GlobalApi } from '@/config/api';

export interface IABSCaptchaProps {
  className?: string;
  isChange?: boolean;
  // onChangeCode: () => void;
  dispatch?: any;
  // code: string;
}

export interface IABSCaptchaState {
  refresh: boolean;
  // codeStyle: any[];
  captcha: string;
}

class ABSCaptcha extends React.PureComponent<IABSCaptchaProps, IABSCaptchaState> {
  constructor(props: any) {
    super(props);
    this.state = {
      refresh: false,
      // codeStyle: this.getCodeStyle(),
      captcha: ''
    };
  }

  componentDidMount() {
    this.getCaptcha();
  }

  componentWillReceiveProps(nextProps: IABSCaptchaProps) {
    if (nextProps.isChange !== this.props.isChange) {
      this.getCaptcha();
    }
  }

  getCaptcha = () => {
    
    this.props.dispatch({
      type: 'login/getCaptcha',
    }).then((response: any) => {
      console.log(response);
      this.setState({ captcha: response });
    });
  }

  onClickMaskView = () => {
    // const { onChangeCode } = this.props;
    // this.setState({ codeStyle: this.getCodeStyle() });
    this.getCaptcha();
  }

  onMouseLeaveMaskView = () => {
    this.setState({ refresh: false });
  }

  onMouseEnter = () => {
    this.setState({ refresh: true });
  }

  canvas() {
    const canvas: any = document.getElementById('bgi');
    if (!canvas) {
      return;
    }
    let ctx = canvas.getContext('2d');
    canvas.height = ctx.height;
    // ctx.clearRect(0, 0, canvas.width(), canvas.height())
    ctx.strokeStyle = `rgb(${getRandomArray(100, 10, 3).toString()})`;
    for (let i = 0; i < 7; i++) {
      ctx.lineTo(getRandomNumber(200, 0), getRandomNumber(200, 10));
      ctx.moveTo(getRandomNumber(200, 0), getRandomNumber(200, 0));
      ctx.stroke();
    }
  }

  getCodeStyle() {
    // const { code } = this.props;
    // const codeStyles: any[] = [];
    // for (let i = 0; i < code.length; i++) {
    //   const style = {
    //     transform: `rotate(${getRandomNumber(75, -75).toString()}deg)`,
    //     color: `rgb(${getRandomArray(100, 255, 3).toString()})`
    //   };
    //   codeStyles.push(style);
    // }
    // return codeStyles;
  }

  render() {
    const { className } = this.props;
    const captchaStyle = classNames('abs-captcha', className);
    return (
      <div className={captchaStyle} >
        {/* <canvas id="bgi" width="200" height="200" /> */}
        {this.renderCaptchaCodeView()}
        {this.renderMaskView()}
      </div>
    );
  }

  renderCaptchaCodeView() {
    // const { code } = this.props;
    const { captcha } = this.state;
    // const codeData = getCodeData(code);
    return (
      <div className="abs-captcha-code" onMouseEnter={this.onMouseEnter}>
        <img className="abs-captcha-code-img" src={captcha !== '' ? GlobalApi.downloadFile + captcha : ''} />
        {/* {codeData.map((value, i) => {
          const style = codeStyle && codeStyle.length > i ? codeStyle[i] : null;
          return (
            <div 
              key={i} 
              className="abs-captcha-code-item" 
              style={style} 
              onMouseEnter={this.onMouseEnter}
            >
              {value}
            </div>
          );
        })} */}
      </div>
    );
  }

  renderMaskView() {
    const { refresh } = this.state;
    if (!refresh) {
      return null;
    }
    return (
      <div
        className="abs-captcha-mask"
        onClick={this.onClickMaskView}
        onMouseLeave={this.onMouseLeaveMaskView}
      >
        看不清？点击刷新
      </div>
    );
  }
}

// export default ABSCaptcha;

function mapStateToProps(state: any) {
  return { ...state.account };
}

export default connect(mapStateToProps)(ABSCaptcha); 