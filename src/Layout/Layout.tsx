import React from 'react';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className={styles.contentWrapper}>{children}</div>;
};

export default Layout;
