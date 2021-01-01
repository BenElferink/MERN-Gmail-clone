import React, { useContext } from 'react';
import { TokenContext } from '../../context/TokenContextAPI';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import * as api from './../../api';
import styles from './style/Form.module.css';

function Account({ toggleIsCreateNew }) {
  const { setToken } = useContext(TokenContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await api.login(values);
      console.log(`✅ ${response.status} ${response.statusText}`);
      console.log(response.data);
      setToken(response.data.token);
    } catch (error) {
      console.log(`❌ ${error}`);
      window.alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

      <Button type='submit'>Login</Button>
      <a onClick={toggleIsCreateNew}>Create a new account</a>
    </form>
  );
}

export default Account;
