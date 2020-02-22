import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import styles from './Welcome.less';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    
    <p style={{ textAlign: 'center', marginTop: 824 }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
);
