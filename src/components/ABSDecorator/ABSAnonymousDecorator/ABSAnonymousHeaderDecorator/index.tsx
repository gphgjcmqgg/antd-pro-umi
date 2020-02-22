import RootLayout from './Layout';
import React from 'react';

const extendsRootLayout = () => WrappedComponent =>
  class ABSAnonymousHeaderDecorator extends React.Component<any> {
    componentWillMount() {
      // console.log('ABSAnonymousHeaderDecorator componentWillMount');
    }

    render() {
      return (
        <RootLayout>
          <WrappedComponent {...this.props} />
        </RootLayout>
      );
    }
  };

export default extendsRootLayout;