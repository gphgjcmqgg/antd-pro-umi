import React from 'react';
import { connect } from 'dva';
import { SearchType } from './utils/enum';
import ABSSearchField from '../ABSSearchField';
import ISearchOption from '../ABSSearchField/utils/ISearchOption';
import authService from '../../abs/services/auth/authService';

export interface IGlobalSearchFieldProps {
  defaultValue?: string;
  dispatch: any;
  type: SearchType;
  handleChange: (id: number, text: string, desc: string) => void;
  title: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  required?: boolean;
}

export interface IGlobalSearchFieldState {
  fetching: boolean;
  text: string;
  data: ISearchOption[];
}

const SEARCH_RESULT_COUNT = 10;

class ABSGlobalSearchField extends React.Component<IGlobalSearchFieldProps, IGlobalSearchFieldState> {
  lastFetchId: number = 0;
  timer;

  constructor(props: IGlobalSearchFieldProps) {
    super(props);
    const { defaultValue } = props;
    this.state = {
      fetching: false,
      text: defaultValue ? defaultValue : '',
      data: [],
    };
  }

  componentWillReceiveProps(nextProps: IGlobalSearchFieldProps) {
    const { defaultValue } = nextProps;
    this.setState({ text: defaultValue ? defaultValue : '', });
  }

  fetchContent = (value: string) => {
    const { type } = this.props;
    const isLogin = authService.checkIsLogin();
    let dispatchType = 'global/search';
    if (!isLogin) {
      dispatchType = 'global/searchOrganization';
    }
    if (!value) {
      this.setState({ data: [], fetching: false });
      return;
    }
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.dispatch({
        type: dispatchType,
        payload: {
          keyword: value,
          search_type: type,
          count: SEARCH_RESULT_COUNT,
        },
      }).then((response) => {
        if (fetchId !== this.lastFetchId || !Array.isArray(response)) { return; }
        const data: ISearchOption[] = response.map(item => {
          const { id, title, description } = item;
          return {
            text: title,
            value: id,
            desc: description,
          };
        });
        if (type === SearchType.organization) {
          data.unshift({
            text: value,
            value: 0,
            desc: value,
          });
        }
        this.setState({ data, fetching: false });
      });
    }, 500);
     
  }

  handleChange = (value: number, option: any) => {
    const { props } = option;
    const { data } = this.state;
    const text = props && props.title ? props.title : '';
    let desc = '';
    if (Array.isArray(data) && data.length > 0) {
      for (const item of data) {
        const { desc: d, value: v } = item;
        if (value === v) {
          desc = d;
          break;
        }
      }
    }
    this.setState({
      text,
      data: [],
      fetching: false,
    });
    const { handleChange } = this.props;
    handleChange(value, text, desc);
  }

  render() {
    const {
      data,
      text,
      fetching,
    } = this.state;
    const { title, placeholder, className, selectClassName, required, disabled } = this.props;
    return (
      <ABSSearchField
        title={title}
        placeholder={placeholder}
        fetchContent={this.fetchContent}
        data={data}
        value={text}
        fetching={fetching}
        handleChange={this.handleChange}
        disabled={disabled}
        className={className}
        selectClassName={selectClassName}
        required={required}
      />
    );
  }
}

const mapStateToProps = ({ global }) => {
  return { ...global };
};

export default connect(mapStateToProps)(ABSGlobalSearchField);