import RootLayout from './Layout';
import React from 'react';

const extendsRootLayout = () => WrappedComponent =>
  class ABSAnonymousDecorator extends React.Component<any> {
    componentWillMount() {
    //  console.log('ABSAnonymousDecorator componentWillMount');
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