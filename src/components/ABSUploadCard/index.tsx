import React from 'react';
import './index.less';
import * as Util from 'lodash';
import { Upload, Modal } from 'antd';
import { ABSAntIcon } from '../ABSAntIcon';
import { GlobalApi } from '../../abs/config/api';

interface IABSUploadCardProps {
  action?: string;
  withCredentials?: boolean;
  updateFileCode?: ({ }: any) => void;
  fileList?: any[];
  onRemove?: ({ }?: any) => void;
}

export class ABSUploadCard extends React.Component<IABSUploadCardProps, any> {

  defaultProps = {
    action: '',
    withCredentials: false,
    fileList: [],
  };

  constructor(props: any) {
    super(props);
    const { fileList } = props;
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: fileList ? fileList : [],
    };
  }

  componentWillReceiveProps(nextProps: IABSUploadCardProps) {
    if (!Util.isEqual(nextProps.fileList, this.props.fileList)) {
      this.setState({ fileList: nextProps.fileList });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = (response) => {
    const { file, fileList } = response;
    const { updateFileCode } = this.props;
    if (file.status === 'done' && updateFileCode) {
      const { data } = file.response ? file.response : '';
      let result = data && data.data ? data.data : '';
      if (!result) {
        result = file.response[0].FileCode;
      }
      updateFileCode(result);
    }
    this.setState({ fileList });
  }

  onRemove = (file) => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove();
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { action, withCredentials } = this.props;
    const uploadButton = (
      <div>
        <ABSAntIcon type="plus" />
        <div className="ant-upload-text">点击上传名片</div>
      </div>
    );
    return (
      <div className="abs-upload-div">
        <Upload
          action={action ? action : GlobalApi.uploadUrl}
          listType="picture-card"
          fileList={fileList}
          accept="image/*"
          onRemove={this.onRemove}
          withCredentials={withCredentials}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal wrapClassName="abs-upload-card-modal" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
