import React, { useContext, useRef } from 'react';
import { TokenContext } from '../../context/TokenContextAPI';
import * as api from './../../api';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import styles from './style/ComposeMail.module.css';

function ComposeMail({ userEmail, toggleIsCompose }) {
  const { token } = useContext(TokenContext);
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      from: userEmail,
    },
  });

  // The following references purposes are to "pull" the form data from the useForm hook,
  // whenever the message will be saved as a draft
  const from = useRef({});
  const to = useRef({});
  const subject = useRef({});
  const message = useRef({});
  from.current = watch('from', '');
  to.current = watch('to', '');
  subject.current = watch('subject', '');
  message.current = watch('message', '');

  // the following function is used to save a message as draft
  // (only if one of the fields are not empty)
  const onClose = async () => {
    try {
      if (to.current !== '' || subject.current !== '' || message.current !== '') {
        let form = {
          from: from.current,
          to: to.current,
          subject: subject.current,
          message: message.current,
        };

        const response = await api.saveDraft(form, token);
        console.log(`✅ ${response.status} ${response.statusText}`);
        console.log(response.data);
      }
      toggleIsCompose();
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  // the following function sends the message
  // (the server also creates a random reply to be received by the user)
  const onSubmit = async (values) => {
    try {
      const response = await api.sendEmail(values, token);
      console.log(`✅ ${response.status} ${response.statusText}`);
      console.log(response.data);
      toggleIsCompose();
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.compose}>
      <div className={styles.compose__header}>
        <h5>New Message</h5>
        <span onClick={onClose}>&times;</span>
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
