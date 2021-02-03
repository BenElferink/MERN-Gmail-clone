import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImageAction } from '../../../../redux/actions/accountActions';
import styles from './styles/EditImageModal.module.css';
import FileBase64 from 'react-file-base64';
import { Avatar, Button } from '@material-ui/core';

export default function EditImageModal({ toggleShowEditImage }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');

  const upload = (e) => {
    e.preventDefault();
    dispatch(uploadImageAction({ image }));
    toggleShowEditImage();
  };

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={upload}>
        <span onClick={toggleShowEditImage}>&times;</span>

        <Avatar className={styles.avatar} src={image.base64} />
        <p>Select a profile picture (max 10mb)</p>
        <label>
          <FileBase64 multiple={false} onDone={(file) => setImage(file)} />
          Select image
        </label>
        <Button type='submit' disabled={!image}>
          Upload
        </Button>
      </form>
    </div>
  );
}
