import React from 'react';
import clsx from 'clsx';

import { appConfig } from '@/config';
import { shortenAddress } from '@/utils';

import styles from './TxBox.module.scss';

export interface TxBoxData {
  hash: string;
  x: number;
  y: number;
}

interface TxBoxProps extends TxBoxData {
  className?: string;
  size: number;
  clickable?: boolean;
}

export const TxBox: React.FC<TxBoxProps> = ({
  className,
  hash,
  x,
  y,
  size,
  clickable = false,
}) => {
  const classNames = clsx(styles.root, className);
  const rootStyles = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
    paddingTop: `${size}%`,
  };

  const content = (
    <span className={styles.content}>TX #{shortenAddress(hash)}</span>
  );

  if (!clickable) {
    return (
      <div className={classNames} style={rootStyles}>
        {content}
      </div>
    );
  }

  return (
    <a
      className={classNames}
      href={`${appConfig.xionExplorerUrl}/tx/${hash}`}
      target="_blank"
      style={rootStyles}
    >
      {content}
    </a>
  );
};
