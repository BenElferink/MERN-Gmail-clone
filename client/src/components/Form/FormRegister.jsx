import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as api from './../../api';
import styles from './style/Form.module.css';

function Account({ toggleIsCreateNew }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({}); // used so I can compare the password and confirmed password
  password.current = watch('password', '');

  const onSubmit = async (values) => {
    try {
      const response = await api.register(values);
      console.log(`✅ ${response.status} ${response.statusText}`);
      console.log(response.data);
      toggleIsCreateNew();
    } catch (error) {
      console.log(`❌ ${error}`);
      window.alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        name='firstName'
        type='text'
        placeholder='First name (optional)'
        ref={register({
          value: /^[a-z ,.'-]+$/i,
          message: 'Invalid name',
        })}
      />
      <p>{errors.firstName && errors.firstName.message}</p>

      <input
        name='middleName'
        type='text'
        placeholder='Middle name (optional)'
        ref={register({
          value: /^[a-z ,.'-]+$/i,
          message: 'Invalid name',
        })}
      />
      <p>{errors.middleName && errors.middleName.message}</p>

      <input
        name='lastName'
        type='text'
        placeholder='Last name (optional)'
        ref={register({
          value: /^[a-z ,.'-]+$/i,
          message: 'Invalid name',
        })}
      />
      <p>{errors.lastName && errors.lastName.message}</p>

      <input
        name='email'
        type='email'
        placeholder='Email'
        ref={register({
          required: true,
          pattern: {
            // eslint-disable-next-line no-useless-escape
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Invalid email',
          },
        })}
      />
      <p>{errors.email && errors.email.message}</p>

      <input
        name='password'
        type='password'
        placeholder='Password'
        ref={register({
          required: true,
          minLength: { value: 7, message: 'Must be at least 7 characters' },
        })}
      />
      <p>{errors.password && errors.password.message}</p>

      <input
        name='passwordConfirm'
        type='password'
        placeholder='Confirm Password'
        ref={register({
          required: true,
          validate: (value) => value === password.current || 'Passwords do not match',
        })}
      />
      <p>{errors.passwordConfirm && errors.passwordConfirm.message}</p>

      <button type='submit'>Register</button>
      <a onClick={toggleIsCreateNew}>Login an existing account</a>
    </form>
  );
}

export default Account;
