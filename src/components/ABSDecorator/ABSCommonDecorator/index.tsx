import React from 'react';
import AuthLayout from './Layout';

interface IAuthRootLayoutProps {
}

const extendsRootLayout = () => WrappedComponent =>
  class ABSCommonDecorator extends React.Component<IAuthRootLayoutProps> {
    componentWillReceiveProps() {
      // console.log('ABSCommonDecorator componentWillReceiveProps');
    }
    
    render() {
      return (
        <AuthLayout>
          <WrappedComponent {...this.props} />
        </AuthLayout>
      );
    }
  };

export default extendsRootLayout;