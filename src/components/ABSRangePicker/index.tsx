import React from 'react';
import ABSDatePicker from '../ABSDatePicker';
import moment from 'moment';
import './index.less';

export interface IABSRangePickerProps {
  label?: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  onStartDateChange: (value: moment.Moment) => void;
  onEndDateChange: (value: moment.Moment) => void;
}
 
export interface IABSRangePickerState {
  startDate: moment.Moment;
  endDate: moment.Moment;
}
 
class ABSRangePicker extends React.Component<IABSRangePickerProps, IABSRangePickerState> {
  constructor(props: IABSRangePickerProps) {
    super(props);
    const { startDate, endDate } = props;
    this.state = {
      startDate: startDate,
      endDate: endDate,
    };
  }
  
  renderLabel() {
    const { label } = this.props;
    if (label) {
      return <div className="abs-filter-label">{label}</div>;
    }
    return null;
  }

  disabledStartDate = (startDate: moment.Moment) => {
    const endDate = this.state.endDate;
    return startDate && endDate > moment().endOf('day') || startDate.valueOf() > (endDate as moment.Moment).valueOf();
  }

  disabledEndDate = (endDate: moment.Moment) => {
    const { startDate } = this.state;
    return endDate && endDate > moment().endOf('day') || endDate.valueOf() <= (startDate as moment.Moment).valueOf();
  }

  onStartDateChange = (value: moment.Moment) => {
    const { onStartDateChange } = this.props;
    this.setState({
      startDate: value,
    });
    if (onStartDateChange) {
      onStartDateChange(value);
    }
  }

  onEndDateChange = (value: moment.Moment) => {
    const { onEndDateChange } = this.props;
    this.setState({
      endDate: value,
    });
    if (onEndDateChange) {
      onEndDateChange(value);
    }
  }

  render() { 
    const { startDate, endDate } = this.props;
    return (
      <div className="abs-range-picker">
        <div className="abs-filter">
          {this.renderLabel()}
          <ABSDatePicker defaultValue={startDate} onChange={this.onStartDateChange} disabledDate={this.disabledStartDate} />
        </div>
        <div className="abs-filter-line" />
        <div className="abs-filter">
          <ABSDatePicker defaultValue={endDate} onChange={this.onEndDateChange} disabledDate={this.disabledEndDate}/>
        </div>
      </div>
    );
  }
}
 
export default ABSRangePicker;