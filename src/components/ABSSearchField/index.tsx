import React from 'react';
import { Select, Spin, Row } from 'antd';
import './index.less';
import ISearchOption from './utils/ISearchOption';
import Title from '../../abs/views/account/Resume/components/Title';
import ABSIcon from '../ABSIcon';
import classNames from 'classnames';

const Option = Select.Option;

export interface IABSSearchFieldProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  value: string;
  fetching: boolean;
  data: ISearchOption[];
  className?: string;
  disabled?: boolean;
  fetchContent: (value: string) => void;
  handleChange: (value: number | string, option: any) => void;
  selectClassName?: string;
  required?: boolean;
}

export interface IABSSearchFieldState {

}

class ABSSearchField extends React.Component<IABSSearchFieldProps, IABSSearchFieldState> {
  renderOptions() {
    const { data } = this.props;
    return data.map((d, index: number) => (
      <Option
        key={`${d.value}`}
        title={d.text}
        value={d.value}
      >
        <Row>{d.text}</Row>
        <Row className="search-result-desc">{d.desc}</Row>
      </Option>
    ));
  }

  renderNotFoundContent = () => {
    const { fetching } = this.props;
    if (!fetching) { return null; }
    return <Spin size="small" />;
  }

  renderTitle() {
    const { title, required } = this.props;
    if (!title) { return null; }
    return (
      <Title className="search-field-title" required={required}>{title}</Title>
    );
  }
  render() {
    const {
      placeholder,
      fetchContent,
      value,
      handleChange,
      className,
      disabled,
      selectClassName,
    } = this.props;
    const classes = classNames('search-field', className);
    return (
      <div className={classes}>
        {this.renderTitle()}
        <Select
          showSearch={true}
          value={value === '' ? undefined : value}
          placeholder={placeholder}
          notFoundContent={null}
          filterOption={false}
          onSearch={fetchContent}
          onChange={handleChange}
          style={{ width: '100%' }}
          disabled={disabled}
          className={selectClassName}
          suffixIcon={<ABSIcon type="search" style={{ fontSize: '14px', color: '#999'}}/>}
        >
          {this.renderOptions()}
        </Select>
      </div>
    );
  }
}

export default ABSSearchField;