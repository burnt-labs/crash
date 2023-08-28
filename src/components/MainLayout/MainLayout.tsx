import React from 'react';
import { Header } from '../Header';

import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>{children}</main>
  </>
);
