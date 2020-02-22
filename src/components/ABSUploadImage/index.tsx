import React from 'react';
import './index.less';
import * as Util from 'lodash';
import { Upload, Modal } from 'antd';
import { ABSAntIcon } from '../ABSAntIcon';
import { GlobalApi } from '../../abs/config/api';
import { ShowUploadListInterface } from 'antd/lib/upload/interface';
import ABSMessage from '../ABSMessage';

interface IABSUploadImageProps {
  action?: string;
  withCredentials?: boolean;
  updateFileCode?: ({ }: any) => void;
  fileList?: any[];
  onRemove?: ({ }?: any) => void;
  description?: string;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  maxImageSize?: number;
  hasVideo?: boolean;
}

export class ABSUploadImage extends React.Component<IABSUploadImageProps, any> {

  defaultProps = {
    action: '',
    withCredentials: false,
    fileList: [],
  };

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  isCanUpload = true;

  componentDidMount() {
    const { fileList = [] } = this.props;
    this.setState({ fileList });
  }

  componentWillReceiveProps(nextProps: IABSUploadImageProps) {
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
    let { file, fileList } = response;
    const { updateFileCode } = this.props;
    if (file.status === 'done' && updateFileCode) {
      const { data } = file.response ? file.response : '';
      let result = data && data.data ? data.data : '';
      if (!result) {
        result = file.response[0].FileCode;
      }
      updateFileCode(result);
    } else if (file.status === 'error') {
      ABSMessage.error(`${file.name}上传失败！`);
      fileList = [];
    }
    if (!this.isCanUpload) {
      fileList = [];
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

  beforeUpload = (file) => {
    const { hasVideo } = this.props;
    if (hasVideo) {
      const videoType = ['avi', 'flv', 'mpg', 'mpeg', 'mpe', 'm1v', 'm2v', 'mpv2', 'mp2v', 'dat', 'ts', 'tp', 'tpr', 'pva', 'pss', 'mp4', 'm4v',
        'm4p', 'm4b', '3gp', '3gpp', '3g2', '3gp2', 'ogg', 'mov', 'qt', 'amr', 'rm', 'ram', 'rmvb', 'rpm'];
      const isVideoType = videoType.find(item => ('video/' + item) === file.type);
      if (isVideoType) {
        return true;
      }

      ABSMessage.error('您上传的文件格式不对，请上传视频格式!');
      return false;
    } else {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
      if (!isJPG) {
        ABSMessage.error('您上传的文件格式不对，请上传图片格式!');
        return false;
      }
      const { maxImageSize } = this.props;
      const maxSize = maxImageSize ? maxImageSize : 2;
      const isLimit = file.size / 1024 / 1024 < maxSize;
      if (!isLimit) {
        this.isCanUpload = false;
        ABSMessage.error(`图片的大小不超过${maxSize}MB!`);
        return false;
      }
      this.isCanUpload = true;
      return true;
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { action, withCredentials, description, showRemoveIcon, showPreviewIcon, hasVideo } = this.props;
    const uploadButton = (
      <div>
        <ABSAntIcon type="plus" />
        <div className="ant-upload-text">{description}</div>
      </div>
    );
    const showUploadList: ShowUploadListInterface = {};
    showUploadList.showRemoveIcon = showRemoveIcon ? showRemoveIcon : true;
    showUploadList.showPreviewIcon = showPreviewIcon ? showPreviewIcon : true;
    const list = fileList ? fileList : [];
    return (
      <div className="abs-upload-div">
        <Upload
          action={action ? action : GlobalApi.uploadImgUrl}
          listType="picture-card"
          fileList={list}
          accept={hasVideo ? 'video/*' : 'image/*'}
          onRemove={this.onRemove}
          withCredentials={withCredentials}
          showUploadList={showUploadList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
        >
          {list.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal wrapClassName="abs-upload-image-modal" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}