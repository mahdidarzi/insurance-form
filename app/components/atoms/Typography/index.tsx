import React, { JSX, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './typography.module.scss';

export type TypographyVariant =
  | 'text-medium-16-100'
  | 'text-medium-14-100-gray'
  | 'text-normal-14-100-black'
  | 'text-normal-14-100-gray'
  | 'text-semibold-18-100-black'
  | 'text-normal-12-100-gray'
  | 'text-normal-14-28-black'
  | 'text-medium-16-100-gray'
  | 'text-normal-14-100-red'
  | 'text-medium-18-100'
  | 'text-medium-16-170';

export interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variant: TypographyVariant;
}

const Typography = ({
  children,
  className,
  as: Tag = 'p',
  variant,
}: TypographyProps) => {
 return (
    <Tag className={classNames(styles[variant], className)}>
      {children}
    </Tag>
 )
};

export default Typography;
