import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendEmailAction,
  saveDraftAction,
  updateDraftAction,
} from '../../../redux/actions/emailActions';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import styles from './styles/ComposeMail.module.css';

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
  // and used whenever the message will be saved as a draft
  const from = useRef({});
  const to = useRef({});
  const subject = useRef({});
  const message = useRef({});
  from.current = watch('from', '');
  to.current = watch('to', '');
  subject.current = watch('subject', '');
  message.current = watch('message', '');

  // the following function sends the message
  // (the server also creates a random reply to be received by the user)
  const onSubmit = (values) => {
    if (!composeDraft) {
      dispatch(sendEmailAction(values));
    } else {
      // but if the component was called by clicking on a draft,
      // then the email is sent, and the draft is updated too!
      dispatch(sendEmailAction(values));
      let form = {
        to: to.current,
        subject: subject.current,
        message: message.current,
      };
      dispatch(updateDraftAction(composeDraft._id, form));
    }
    toggleIsCompose();
  };

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
        dispatch(saveDraftAction(form));
      }
    } else {
      // the following is used to update the existing draft
      let form = {
        to: to.current,
        subject: subject.current,
        message: message.current,
      };
      dispatch(updateDraftAction(composeDraft._id, form));
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
