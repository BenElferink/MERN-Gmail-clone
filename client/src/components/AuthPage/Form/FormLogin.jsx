import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import login from './../../../redux/actions/login';
import clearErrors from './../../../redux/actions/clearErrors';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import styles from './style/Form.module.css';

function FormLogin() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.userReducer);
  if (error) {
    alert(error);
    setTimeout(() => {
      dispatch(clearErrors());
    }, 0);
  }

  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      // this is given by Redux state (if the user has successfully registered)
      email: user.email,
    },
  });

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
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

        <Button type='submit' disabled={formState.isSubmitting}>
          Login
        </Button>
      </form>
    );
  }
}

export default FormLogin;
