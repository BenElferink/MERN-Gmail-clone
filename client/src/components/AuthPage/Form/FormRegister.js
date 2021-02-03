import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../../redux/actions/accountActions';
import { clearErrors } from '../../../redux/actions/clearErrors';
import { useForm } from 'react-hook-form';
import styles from './styles/Form.module.css';
import { Button, CircularProgress } from '@material-ui/core';

export default function FormRegister({ isLoading, error }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch, formState } = useForm();
  const password = useRef({}); // used so I can compare the password and confirmed password
  password.current = watch('password', '');

  if (error) {
    alert(error);
    setTimeout(() => {
      dispatch(clearErrors());
    }, 0);
  }

  const onSubmit = (values) => {
    dispatch(registerAction(values));
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress color='secondary' />
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          name='firstName'
          type='text'
          placeholder='First name'
          ref={register({
            required: true,
            pattern: /^[a-z ,.'-]+$/i,
          })}
        />
        <p>{errors.email?.type === 'required' && 'First name is required'}</p>
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
          placeholder='Last name'
          ref={register({
            required: true,
            pattern: /^[a-z ,.'-]+$/i,
          })}
        />
        <p>{errors.email?.type === 'required' && 'Last name is required'}</p>
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

        <Button type='submit' disabled={formState.isSubmitting}>
          Register
        </Button>
      </form>
    );
  }
}
