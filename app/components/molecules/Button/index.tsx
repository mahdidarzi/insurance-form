import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';
import { Typography, Loading } from '@/app/components/atoms';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outline-filled'
  | 'cta'
  | 'minimal';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={classNames(
        styles.button,
        styles[variant],
        { [styles.disabled]: disabled },
        className
      )}
    >
    
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {loading && <span className='ml-[0px] max-w-[30px] max-h-[49px] flex items-center justify-center'><Loading /></span>}
          {children}
        </span>
    </button>
  );
};

export default Button;
