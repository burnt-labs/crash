'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './AnimationBg.module.scss';

import Image1 from '@/assets/images/Burnt-Xion-Texture-1.jpg';
import Image2 from '@/assets/images/Burnt-Xion-Texture-2.jpg';
import Image3 from '@/assets/images/Burnt-Xion-Texture-3.jpg';

interface AnimationBgProps {
  className?: string;
}

export const AnimationBg: React.FC<AnimationBgProps> = ({ className }) => {
  const imgUrls = [Image1, Image2, Image3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imgUrls.length]);

  return (
    <div
      className={clsx(styles.root, className)}
      style={{ backgroundImage: `url(${imgUrls[currentIndex].src})` }}
    ></div>
  );
};
