import * as React from 'react';
import { ABSInput } from '../../ABSInput';
import ABSDatePicker from '../../ABSDatePicker';
import { Row, Col } from 'antd';
import moment from 'moment';
import _ from 'lodash';

export interface IRange {
  title: string;
  xMin: any;
  xMax: any;
  yMin: number;
  yMax: number;
  ySubMin: number;
  ySubMax: number;
}
interface IRangeFilterProps {
  range: IRange;
  updateChart: any;
  xType: string;
  isSubYAxis: boolean;
  xAxisDisabled?: boolean;
  yAxisLeftDisabled?: boolean;
}
interface IRangeFilterState {
  range: IRange;
}

class RangeFilter extends React.PureComponent<IRangeFilterProps, IRangeFilterState> {
  constructor(props: IRangeFilterProps) {
    super(props);
    this.state = {
      range: props.range
    };
  }
  render() {
    return (
      <div>
        {this.renderFilter()}
      </div>
    );
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({
      range: nextProps.range
    });
  }
  renderFilter() {
    const { isSubYAxis, xType, xAxisDisabled, yAxisLeftDisabled } = this.props;
    const { range } = this.state;
    let leftX = xType === 'datetime' ?
      (
        <ABSDatePicker
          value={moment(+range.xMin)}
          onChange={val => this.updateChartProperty(val.format('YYYY-MM-DD'), 'xAxis', true, false, true)}
        />
      ) :
      (
        <ABSInput
          className="abs-col-input"
          style={{ marginRight: 10 }}
          value={range.xMin.toString()}
          disabled={xAxisDisabled}
          onGetValue={val => this.updateChartProperty(val, 'xAxis', true)}
          onPressEnter={val => this.updateChartProperty(val, 'xAxis', true)}
        />
      );
    let rightX = xType === 'datetime' ?
      (
        <ABSDatePicker
          className="magnifier-datepicker"
          value={moment(+range.xMax)}
          onChange={val => this.updateChartProperty(val.format('YYYY-MM-DD'), 'xAxis', false, false, true)}
        />
      ) :
      (
        <ABSInput
          className="abs-col-input"
          style={{ marginRight: 20 }}
          value={range.xMax.toString()}
          disabled={xAxisDisabled}
          onGetValue={val => this.updateChartProperty(val, 'xAxis', false)}
          onPressEnter={val => this.updateChartProperty(val, 'xAxis', false)}
        />
      );
    return (
      <div className="chartFilter">
        <Row>
          <Col span={24}>
            <div className="abs-col">
              <div className="abs-col-label" style={{ paddingRight: 14 }}>{'标题'}</div>
              <ABSInput
                className="abs-col-content"
                value={range.title}
                onGetValue={val => this.updateChartProperty(val, 'title', true)}
                onPressEnter={val => this.updateChartProperty(val, 'title', true)}
              />
              <div className="abs-col-label">{'纵坐标(左)'}</div>
              <ABSInput
                className="abs-col-input"
                style={{ marginRight: 10 }}
                value={range.yMin.toString()}
                disabled={yAxisLeftDisabled}
                onGetValue={val => this.updateChartProperty(val, 'yAxis', true)}
                onPressEnter={val => this.updateChartProperty(val, 'yAxis', true)}
              />
              <span>-</span>
              <ABSInput
                className="abs-col-input"
                value={range.yMax.toString()}
                disabled={yAxisLeftDisabled}
                onGetValue={val => this.updateChartProperty(val, 'yAxis', false)}
                onPressEnter={val => this.updateChartProperty(val, 'yAxis', false)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="abs-col">
              <div className="abs-col-label">{'横坐标'}</div>
              {leftX}
              <span>-</span>
              {rightX}
              <div className="abs-col-label">{'纵坐标(右)'}</div>
              <ABSInput
                className="abs-col-input"
                disabled={!isSubYAxis}
                style={{ marginRight: 10 }}
                value={range.ySubMin.toString()}
                onGetValue={val => this.updateChartProperty(val, 'yAxis', true, true)}
                onPressEnter={val => this.updateChartProperty(val, 'yAxis', true, true)}
              />
              <span>-</span>
              <ABSInput
                className="abs-col-input"
                disabled={!isSubYAxis}
                value={range.ySubMax.toString()}
                onGetValue={val => this.updateChartProperty(val, 'yAxis', false, true)}
                onPressEnter={val => this.updateChartProperty(val, 'yAxis', false, true)}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  updateChartProperty(val: string, type: string, isMin: boolean, isSub: boolean = false, isXDate: boolean = false) {
    const { updateChart } = this.props;
    const { range } = this.state;
    let temp = _.cloneDeep(range);
    switch (type) {
      case 'title':
        temp.title = val;
        break;
      case 'xAxis':
        // TODO 时间轴
        if (isXDate) {
          if (isMin) {
            temp.xMin = new Date(val).getTime();
          } else {
            temp.xMax = new Date(val).getTime();
          }
        } else {
          if (isMin) {
            temp.xMin = +val;
          } else {
            temp.xMax = +val;
          }
        }
        break;
      case 'yAxis':
        if (isMin) {
          if (isSub) {
            temp.ySubMin = +val;
          } else {
            temp.yMin = +val;
          }
        } else {
          if (isSub) {
            temp.ySubMax = +val;
          } else {
            temp.yMax = +val;
          }
        }
        break;
      default:
        break;
    }

    // 调整chart
    updateChart(temp);
  }
}
export default RangeFilter;
