import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import saveDraft from './../../../redux/actions/saveDraft';
import updateDraft from '../../../redux/actions/updateDraft';
import sendEmail from './../../../redux/actions/sendEmail';
import deleteEmail from '../../../redux/actions/deleteEmail';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import styles from './style/ComposeMail.module.css';

function ComposeMail({ toggleIsCompose, composeDraft }) {
  const dispatch = useDispatch();
  const registeredEmail = useSelector((state) => state.userReducer.user.email);
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      from: registeredEmail,
      to: composeDraft?.to || '',
      subject: composeDraft?.subject || '',
      message: composeDraft?.message || '',
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

  const onClose = () => {
    if (!composeDraft) {
      // the following is used to save a message as draft
      // (only if one of the fields are not empty)
      if (to.current !== '' || subject.current !== '' || message.current !== '') {
        let form = {
          from: from.current,
          to: to.current,
          subject: subject.current,
          message: message.current,
        };
        dispatch(saveDraft(form));
      }
    } else {
      // the following is used to update the existing draft
      let form = {
        to: to.current,
        subject: subject.current,
        message: message.current,
      };
      dispatch(updateDraft(composeDraft._id, form));
    }

    toggleIsCompose();
  };

  // the following function sends the message
  // (the server also creates a random reply to be received by the user)
  const onSubmit = (values) => {
    if (!composeDraft) {
      dispatch(sendEmail(values));
    } else {
      // but if the component was called by clicking on a draft,
      // then the email is sent, but the draft is deleted too!
      dispatch(sendEmail(values));
      dispatch(deleteEmail(composeDraft._id));
    }
    toggleIsCompose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.compose}>
      <div className={styles.header}>
        <h5>New Message</h5>
        <span onClick={onClose}>&times;</span>
      </div>

      <div className={styles.inpGroup}>
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

      <div className={styles.inpGroup}>
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

      <div className={styles.inpGroup}>
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

      <div className={styles.send}>
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
