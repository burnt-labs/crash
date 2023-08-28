import React from 'react';
import clsx from 'clsx';

import { appConfig } from '@/config';
import { shortenAddress } from '@/utils';

import styles from './TxCard.module.scss';

export interface TxCardItem {
  hash: string;
  x: number;
  y: number;
}

interface TxCardProps extends TxCardItem {
  className?: string;
  size: number;
}

export const TxCard: React.FC<TxCardProps> = ({
  className,
  hash,
  x,
  y,
  size,
}) => {
  return (
    <a
      className={clsx(styles.root, className)}
      href={`${appConfig.xionExplorerUrl}/tx/${hash}`}
      target="_blank"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        paddingTop: `${size}%`,
      }}
    >
      <span className={styles.content}>TX #{shortenAddress(hash)}</span>
    </a>
  );
};
