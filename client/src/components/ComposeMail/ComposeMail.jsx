import React, { useContext } from 'react';
import { TokenContext } from '../../context/TokenContextAPI';
import * as api from './../../api';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import styles from './style/ComposeMail.module.css';

function ComposeMail({ userEmail, updateUserData }) {
  const { token } = useContext(TokenContext);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      from: userEmail,
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await api.sendEmail(values, token);
      console.log(`✅ ${response.status} ${response.statusText}`);
      console.log(response.data);
      updateUserData();
      toggleIsCompose();
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.compose}>
      <div className={styles.compose__header}>
        <h5>New Message</h5>
        <span>&times;</span>
      </div>

      <div className={styles.compose__inpGroup}>
        <label htmlFor='from'>From:</label>
        <input
          name='from'
          id='from'
          type='email'
          ref={register({
            required: true,
            // eslint-disable-next-line no-useless-escape
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          readOnly
        />
      </div>

      <div className={styles.compose__inpGroup}>
        <label htmlFor='to'>To:</label>
        <input
          name='to'
          id='to'
          type='email'
          ref={register({
            required: true,
            // eslint-disable-next-line no-useless-escape
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
      </div>

      <div className={styles.compose__inpGroup}>
        <label htmlFor='subject'>Subject:</label>
        <input
          name='subject'
          id='subject'
          type='text'
          ref={register({
            required: true,
          })}
        />
      </div>

      <textarea
        name='message'
        ref={register({
          required: true,
        })}
      />

      <div className={styles.compose__send}>
        <Button type='submit'>Send</Button>
        <span>
          <p>{errors.to?.type === 'required' && 'Recipient is required'}</p>
          <p>{errors.to?.type === 'pattern' && 'Invalid email'}</p>
          <p>{errors.subject?.type === 'required' && 'Subject is required'}</p>
          <p>{errors.message?.type === 'required' && 'Email message is required'}</p>
        </span>
      </div>
    </form>
  );
}

export default ComposeMail;
