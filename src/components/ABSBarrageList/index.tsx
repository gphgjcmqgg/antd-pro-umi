import React from 'react';
import ABSBarrage, { IBarrage } from '../ABSBarrage';
import './index.less';

export interface IABSBarrageListProps {
  barrageList: IBarrage[];
  velocity?: number;
}
 
export interface IABSBarrageListState {
  left: number;
}

class ABSBarrageList extends React.Component<IABSBarrageListProps, IABSBarrageListState> {

  static defaultProps = {
    velocity: 1,
  };

  barrageList;
  containerWidth;
  requestFrameId;

  constructor(props: IABSBarrageListProps) {
    super(props);
    this.state = {
      left: Number.MAX_SAFE_INTEGER,
    };
  }

  componentDidMount() {
    const containerWidth = this.barrageList.parentNode.offsetWidth;
    this.containerWidth = containerWidth;

    this.setState({
      left: containerWidth,
    }, () => {
      this.requestFrameId = requestAnimationFrame(this.move);
    });
  }

  componentWillUnmount() {
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
    }
  }

  move = () => {
    const { left } = this.state;
    const { velocity } = this.props;
    const vel = velocity ? velocity : 1;
    const barrageListWidth = this.barrageList.offsetWidth;
    this.setState(prevState => ({ left: prevState.left - vel }), () => {
      
      if (left < -barrageListWidth) {
        this.setState({ left: this.containerWidth });
      }
      this.requestFrameId = requestAnimationFrame(this.move);
    });
  }

  renderBarrageList() {
    const { barrageList } = this.props;
    return barrageList.map((barrage, index) => {
      return <ABSBarrage barrage={barrage} key={index} />;
    });
  }

  render() { 
    const { left } = this.state;
    return (
      <div className="abs-barrage-list" style={{ left: left }} ref={view => this.barrageList = view}>
        {this.renderBarrageList()}
      </div>
    );
  }
}
 
export default ABSBarrageList;