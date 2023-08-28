import React from 'react';
import clsx from 'clsx';

import styles from './ArrowButton.module.scss';
import ArrowIcon from '@/assets/icons/arrow.svg?inline';

interface ArrowButtonProps {
  className?: string;
  isActive?: boolean;
  isAnimated?: boolean;
  onClick?: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  className,
  isActive,
  isAnimated = false,
  onClick,
}) => {
  return (
    <button
      className={clsx(styles.root, className, {
        [styles.active]: isActive,
        [styles.animated]: isAnimated,
      })}
      onClick={onClick}
    >
      <ArrowIcon className={styles.icon} />
    </button>
  );
};
