import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import uploadImage from '../../../../redux/actions/uploadImage';
import { Avatar, Button } from '@material-ui/core';
import styles from './style/EditImageModal.module.css';

function EditImageModal({ toggleShowEditImage }) {
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const upload = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('image', image);
    dispatch(uploadImage(formData));
  };

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={upload}>
        <span onClick={toggleShowEditImage}>&times;</span>
        <Avatar className={styles.avatar} src={image && URL.createObjectURL(image)} />
        <p>Select a profile picture</p>
        <label>
          <input
            type='file'
            name='image'
            filename='image'
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          Select image
        </label>
        <Button type='submit' disabled={!image}>
          Upload
        </Button>
      </form>
    </div>
  );
}

export default EditImageModal;
