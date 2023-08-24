import React from 'react';
import clsx from 'clsx';

import styles from './ArrowButton.module.scss';

import ArrowIcon from '@/assets/icons/arrow.svg?inline';

interface ArrowButtonProps {
  className?: string;
  onClick?: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button className={clsx(styles.root, className)} onClick={onClick}>
      <ArrowIcon className={styles.icon} />
    </button>
  );
};
