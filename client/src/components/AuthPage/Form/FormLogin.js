import { useDispatch } from 'react-redux';
import { loginAction } from '../../../redux/actions/accountActions';
import { clearErrors } from '../../../redux/actions/clearErrors';
import { useForm } from 'react-hook-form';
import styles from './styles/Form.module.css';
import { Button, CircularProgress } from '@material-ui/core';

export default function FormLogin({ isLoading, error, user }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      email: user.email, // this is given by Redux state (if the user has successfully registered)
    },
  });

  if (error) {
    alert(error);
    setTimeout(() => {
      dispatch(clearErrors());
    }, 0);
  }

  const onSubmit = (values) => {
    dispatch(loginAction(values));
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
