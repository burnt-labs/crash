import React from 'react';
import { Header } from '../Header';
import { StackNavigatorProvider } from '@/providers/NavigatorProvider';

import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <StackNavigatorProvider>
    <Header />
    <main className={styles.main}>{children}</main>
  </StackNavigatorProvider>
);
