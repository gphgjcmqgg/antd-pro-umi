import React from 'react';
import { Layout } from 'antd';
import ABSErrorBoundary from '../ABSErrorBoundary';
import '../../styles/layout.less';

export interface IRootLayoutProps {
  children: React.ReactNode;
}

export interface IRootLayoutState {

}

class RootLayout extends React.Component<IRootLayoutProps, IRootLayoutState> {
  render() {
    const { children } = this.props;

    return (
      <Layout>
        <ABSErrorBoundary>
          {
            children
          }
        </ABSErrorBoundary>
      </Layout>
    );
  }
}

export default RootLayout;