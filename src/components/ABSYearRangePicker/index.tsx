import React from 'react';
import ABSSelectField from '../ABSSelectField';
import { getAdvanceYearData } from '../../abs/views/account/Resume/util';

export interface IABSYearRangePickerProps {
  defaultStartYear: number;
  defaultEndYear: number;
  startPlaceholder?: string;
  endPlaceholder?: string;
  startTitle?: string;
  endTitle?: string;
  required?: boolean;
}
 
export interface IABSYearRangePickerState {
  
}
 
class ABSYearRangePicker extends React.Component<IABSYearRangePickerProps, IABSYearRangePickerState> {

  state = {
    startYear: this.props.defaultStartYear,
    endYear: this.props.defaultEndYear,
  };
  
  onStartYearChange = (year) => {
    this.setState({
      startYear: year,
    });
  }

  onEndYearChange = (year) => {
    this.setState({
      endYear: year,
    });
  }

  render() { 
    const { startYear, endYear } = this.state;
    const { startPlaceholder, endPlaceholder, startTitle, endTitle, required } = this.props;
    const fromYearData = getAdvanceYearData({ end: endYear });
    const toYearData = getAdvanceYearData({ start: startYear });
    return (
      <>
        <ABSSelectField 
          title={startTitle}
          selectOptions={fromYearData}  
          required={required}
          defaultValue={startYear}
          onChange={this.onStartYearChange}
          placeholder={startPlaceholder}
        />
        <ABSSelectField 
          title={endTitle} 
          selectOptions={toYearData}  
          required={required}
          defaultValue={endYear}
          onChange={this.onEndYearChange}
          placeholder={endPlaceholder}
        />
      </>
    );
  }
}
 
export default ABSYearRangePicker;