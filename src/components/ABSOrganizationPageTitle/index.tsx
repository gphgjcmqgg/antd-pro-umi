import React from 'react';
import './index.less';
import _ from 'lodash';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import ABSLink from '../ABSLink';
import ABSImage from '../ABSImage';
import commonUtils from '../../utils/commonUtils';
import ABSLabelValueList from '../ABSLabelValueList';
import RouteConfig from '../../abs/config/routeConfig';
import ABSIconText from '../ABSIconText';
import FormModal from './FormModal';
import { VoteConfigs } from '../../ABSComponents/Vote/config';
import VoteButton from '../../ABSComponents/Vote';

export interface IABSOrganizationPageTitleProps {
  dispatch: ({ }: any) => Promise<any>;
  isEdit: boolean;
  organizationCore: any;
  organizationID: string;
}

export interface IABSOrganizationPageTitleState {
  organizationId: number;
}

class ABSOrganizationPageTitle extends React.Component<IABSOrganizationPageTitleProps, IABSOrganizationPageTitleState> {

  private formModal: any;
  constructor(props: any) {
    super(props);
    this.state = {
      organizationId: 0
    };
  }
  componentDidMount() {
    const organizationID = this.getOrganizationID();
    this.getDetailData(organizationID);
  }

  componentWillReceiveProps(nextProps: any) {
    const { organizationID } = nextProps;
    if (this.props.organizationID !== organizationID) {
      this.getDetailData(organizationID);
    }
  }
  
  getDetailData = (organizationID: number) => {
    const { dispatch } = this.props;
    dispatch({
       type: 'organization/getOrganizationCore', 
       payload: { organization_id: organizationID } 
    }).then((res) => {
      if (res) {
        this.setState({ organizationId: res.id});
      }
    });
  }
  
  getOrganizationID() {
    const { organization_id = null } = commonUtils.getParams();
    return organization_id;
  }

  renderPrizes() {
    const { organizationCore } = this.props;
    const { prize_models } = organizationCore;
    if (!prize_models) {
      return null;
    }
    const data: Array<any> = [];
    prize_models.map((item, index) => {
      const { name, description_page, icon_url, tooltip } = item;
      const url = description_page ? RouteConfig.firstDealRank : undefined;
      data.push(
        <div className="abs-organization-prizes" key={index}>
          <Tooltip placement="bottomLeft" title={<div dangerouslySetInnerHTML={{ __html: '<span class="abs-organization-prizes-tooltip-title">' + name + '</span>' + tooltip }} />}>
            <a href={url} target="_blank">
              <ABSImage className="abs-organization-prizes-img-title" style={{ marginLeft: 6 }} logo={icon_url} height={28} />
            </a>
          </Tooltip>
        </div>);
    });
    return [...data];
  }

  renderIconAndName() {
    const { organizationCore } = this.props;
    const { logo_file_url = '', full_name, short_name } = organizationCore ? organizationCore : '';
    return (
      <div className="abs-organization-head">
        {
          logo_file_url === null ? null :
            <ABSImage className="abs-organization-head-logo" logo={logo_file_url} width={142} height={50} />
        }
        <div className="abs-organization-head-left">
          <div className="abs-organization-head-left-head">
            <h2 className="abs-organization-head-left-title">{full_name}</h2>
            {this.renderPrizes()}
            {this.renderVoteButton()}
          </div>
          <div style={{marginTop: 5}}>
            <p className="abs-organization-head-left-subtitle subtitle-float">{short_name}</p>
            {this.renderContect()}
            {this.renderLink()}
          </div>
        </div>
      </div>
    );
  }

  renderContect() {
    const { organizationCore } = this.props;
    const { contact = '' } = organizationCore ? organizationCore : '';
    const item = [{ title: '联系方式', content: commonUtils.formatContent(contact, false, false, false, 0, 0) }];
    return (
      <ABSLabelValueList list={item} className="subtitle-float" />
    );
  }

  renderLink() {
    const { organizationCore, isEdit } = this.props;
    const { website } = organizationCore ? organizationCore : '';
    const item = [{
      title: '机构网址',
      content: website ? <ABSLink target="_blank" to={website} >{commonUtils.formatContent(website)}</ABSLink> : <span style={{ display: 'inline-block', minWidth: 250 }}>{commonUtils.formatContent(website)}</span>
    }];
    return (
      <div className="abs-organization-head-right subtitle-float">
        <ABSLabelValueList list={item} />
        {isEdit ? <ABSIconText icon="write-mail" text="编辑" className="abs-organization-head-right-edit" onClick={this.onUpdateInfo} /> : null}
      </div>
    );
  }

  renderVoteButton() {
    const { organizationId } = this.state;
    if (!organizationId) { return; }
    const expertVote = _.cloneDeep(VoteConfigs.organizationVote);
    expertVote.payload.related_id = organizationId;
    return (
      <div className="abs-organization-btn">
        <VoteButton config={expertVote} />
      </div>
    );
  }

  render() {
    const { organizationCore } = this.props;
    return (
      <div>
        <div className="abs-organization">
          {this.renderIconAndName()}
        </div>
        <FormModal ref={refs => { this.formModal = refs; }} onSave={this.onSave} organizationCore={organizationCore} />
      </div>
    );
  }

  onUpdateInfo = () => {
    if (this.formModal) {
      this.formModal.toggle();
    }
  }

  onSave = (params: any) => {
    const { dispatch } = this.props;
    dispatch({ type: 'organization/getOrganizationInfoUpdate', payload: params }).then(() => {
      this.formModal.toggle();
    });
    if (!params.file_code) {
      return;
    }
    dispatch({ type: 'organization/getOrganizationLogoUpdate', payload: params });
  }
}

const mapStateToProps = ({ global, organization }) => {
  const organizationCore = _.get(organization, 'organizationCore', {});
  const isEdit = _.get(organization, 'isEdit', {});
  return { 
    organizationID: _.get(global, 'params.organizationID', 0),
    organizationCore,
    isEdit };
};

export default connect(mapStateToProps)(ABSOrganizationPageTitle);