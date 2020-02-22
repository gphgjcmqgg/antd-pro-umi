import React from 'react';
import AuthLayout from './Layout';

interface IAuthRootLayoutProps {
}

const extendsRootLayout = () => WrappedComponent =>
  class ABSAuthDecorator extends React.Component<IAuthRootLayoutProps> {
    componentWillReceiveProps() {
      // console.log('decorator componentWillReceiveProps');
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