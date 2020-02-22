import React from 'react';
import { FILTER_DEFAULT_START_DATE, 
  FILTER_DEFAULT_END_DATE, 
  FILTER_DEFAULT_TODAY_DATE, 
  FILTER_DEFAULT_YEAR_START_DATE } from '../../../utils/constant';
import ABSRangeDatePicker from '../../ABSRangeDatePicker';
import moment from 'moment';
import commonUtils from '../../../utils/commonUtils';
import FilterPanelType from '../enums/FilterPanelType';

export interface IHeaderProps {
  title?: string;
  type?: FilterPanelType;
}
 
export interface IHeaderState {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const DATE_FORMAT = 'YYYY-MM-DD';
 
class Header extends React.Component<IHeaderProps, IHeaderState> {
  static defaultProps = {
    title: '统计日期',
  };

  constructor(props: any) {
    super(props);
    const filterParms = commonUtils.getParams();
    let initStartDate = moment(FILTER_DEFAULT_START_DATE, DATE_FORMAT);
    let initEndDate = moment(FILTER_DEFAULT_END_DATE, DATE_FORMAT);
    if (filterParms.use_today && filterParms.use_today === 'true') {
      initEndDate = moment(FILTER_DEFAULT_TODAY_DATE, DATE_FORMAT);
    }
    if (filterParms.start_date) {
      initStartDate = moment(filterParms.start_date, DATE_FORMAT);
    }
    if (filterParms.end_date) {
      initEndDate = moment(filterParms.end_date, DATE_FORMAT);
    }
    const { type } = this.props;
    if (type === FilterPanelType.organization) {
      initStartDate = moment(FILTER_DEFAULT_YEAR_START_DATE, DATE_FORMAT);
      initEndDate = moment(FILTER_DEFAULT_END_DATE, DATE_FORMAT);
    }
    this.state = {
      startDate: initStartDate,
      endDate: initEndDate,
    };
  }

  onStartDateChange = (value: moment.Moment) => {
    this.setState({ startDate: value });
  }

  onEndDateChange = (value: moment.Moment) => {
    this.setState({ endDate: value });
  }

  extraValue() {
    const { startDate, endDate } = this.state;
    const startDateString = startDate.format(DATE_FORMAT);
    const endDateString = endDate.format(DATE_FORMAT);
    return {
      statistics_date: {
        start: startDateString,
        end: endDateString,
      },
    };
  }

  initDateValue() {
    const { type } = this.props;
    if (type === FilterPanelType.organization) {
      this.setState({
        startDate: moment(FILTER_DEFAULT_YEAR_START_DATE, DATE_FORMAT),
        endDate: moment(FILTER_DEFAULT_END_DATE, DATE_FORMAT)
      });
    } else {
      this.setState({
        startDate: moment(FILTER_DEFAULT_START_DATE, DATE_FORMAT),
        endDate: moment(FILTER_DEFAULT_END_DATE, DATE_FORMAT)
      });
    }
  }

  render() { 
    const { startDate, endDate } = this.state;
    const { title } = this.props;
    return (
      <ABSRangeDatePicker 
        title={title}
        startValue={startDate}
        endValue={endDate}
        onStartDateChange={this.onStartDateChange}
        onEndDateChange={this.onEndDateChange}
      />
    );
  }
}
 
export default Header;