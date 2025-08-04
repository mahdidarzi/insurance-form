import React from 'react';
import styles from './loading.module.scss';

export type LoadingSize = '.30' | '.5' | '.75' | '1';

export interface LoadingProps {
  className?: string;
  size?: LoadingSize;
}

const Loading = ({ size = '.30' }: LoadingProps) => {
  const colors = [
    '#383A39B2',
    '#00000080',
    '#00000080',
    '#00000080',
    '#797979',
    '#969393',
    '#9C9F9F',
    '#CBCCCC',
    '#D1D2D2',
    '#EBEBEB',
    '#EBEBEB',
    '#EBEBEB',
  ];

  return (
    <div style={{ scale: size }} className={styles['lds-default']}>
      {colors.map((color, i) => (
        <div key={i} style={{ backgroundColor: color }} />
      ))}
    </div>
  );
};

export default Loading;
