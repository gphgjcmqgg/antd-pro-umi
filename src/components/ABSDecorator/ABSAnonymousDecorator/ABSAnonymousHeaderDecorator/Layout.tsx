import React from 'react';
import anonymousDecorator from '..';
import { Layout } from 'antd';
import { connect } from 'dva';
import ABSHeader from '../../../ABSHeader';

@anonymousDecorator()
class ABSAnonymousHeaderLayout extends React.Component<any, any> {
  componentWillMount() {
     this.props.dispatch({
      type: 'global/getMenuAndVersion',
    });
  }

  render() {
    const { menu, version, children, } = this.props;

    return (
      <Layout>
        <ABSHeader menu={menu} version={version} />
        <Layout style={{ height: '100vh' }} >
          {
            children
          }
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(ABSAnonymousHeaderLayout); 