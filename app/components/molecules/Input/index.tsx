import React from 'react';
import classNames from 'classnames';
import styles from './input.module.scss';
import { Typography } from '@/app/components/atoms';
import { FieldError } from 'react-hook-form';

export interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: FieldError | string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  disabled = false,
  className,
}: InputProps) => {
  return (
    <div dir='rtl'
      className={classNames(styles.wrapper, className)}>
      {/* {label && (
        <Typography variant="text-medium-14-100-gray" as="label" htmlFor={name}>
          {label}
        </Typography>
      )} */}
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        disabled={disabled}
      // className={styles.inputError}
      className={classNames(styles.inputtemp, { [styles.inputError]: error })}

      />
      {error && (
        <Typography variant="text-normal-14-100-red" as="p" className={classNames (styles.errorText,'mt-1')}>
          {typeof error === 'string' ? error : error.message}
        </Typography>
      )}
    </div>
  );
};

export default Input;
