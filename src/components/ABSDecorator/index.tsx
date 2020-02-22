import RootLayout from './Layout';
import React from 'react';

interface IAnonymousRootLayoutProps {
}

const extendsRootLayout = () => WrappedComponent =>

  class ABSBaseDecorator extends React.Component<IAnonymousRootLayoutProps> {
    componentWillMount() {
      // console.log('componentWillMount');
    }

    componentDidMount() {
      // console.log('decorator did mount');
    }

    componentWillReceiveProps(nextProps: any) {
      // console.log('decorator did mount');
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