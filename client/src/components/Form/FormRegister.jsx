import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import createAccount from './../../redux/actions/register';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import styles from './style/Form.module.css';

function Account({ toggleIsCreateNew }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm();

  // used so I can compare the password and confirmed password
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (values) => {
    dispatch(createAccount(values));
    toggleIsCreateNew();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        name='firstName'
        type='text'
        placeholder='First name (optional)'
        ref={register({
          pattern: /^[a-z ,.'-]+$/i,
        })}
      />
      <p>{errors.firstName?.type === 'pattern' && 'Invalid name'}</p>

      <input
        name='middleName'
        type='text'
        placeholder='Middle name (optional)'
        ref={register({
          pattern: /^[a-z ,.'-]+$/i,
        })}
      />
      <p>{errors.middleName?.type === 'pattern' && 'Invalid name'}</p>

      <input
        name='lastName'
        type='text'
        placeholder='Last name (optional)'
        ref={register({
          pattern: /^[a-z ,.'-]+$/i,
        })}
      />
      <p>{errors.lastName?.type === 'pattern' && 'Invalid name'}</p>

      <input
        name='email'
        type='email'
        placeholder='Email'
        ref={register({
          required: true,
          // eslint-disable-next-line no-useless-escape
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      <p>{errors.email?.type === 'required' && 'Email is required'}</p>
      <p>{errors.email?.type === 'pattern' && 'Invalid email'}</p>

      <input
        name='password'
        type='password'
        placeholder='Password'
        ref={register({
          required: true,
          minLength: 7,
        })}
      />
      <p>{errors.password?.type === 'required' && 'Password is required'}</p>
      <p>{errors.password?.type === 'minLength' && 'Must be at least 7 characters'}</p>

      <input
        name='passwordConfirm'
        type='password'
        placeholder='Confirm Password'
        ref={register({
          required: true,
          validate: (value) => value === password.current,
        })}
      />
      <p>{errors.passwordConfirm?.type === 'required' && 'Password confirmation is required'}</p>
      <p>{errors.passwordConfirm?.type === 'validate' && 'Passwords do not match'}</p>

      <Button type='submit'>Register</Button>
      <a onClick={toggleIsCreateNew}>Login an existing account</a>
    </form>
  );
}

export default Account;
