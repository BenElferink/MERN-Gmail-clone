import { useHistory, useParams } from 'react-router-dom';
import styles from './styles/EmailListItem.module.css';
import { Delete, MarkStar, SelectOne } from '../../EmailOptions/EmailOptions';

export default function EmailCategoryItem({
  id,
  title,
  subject,
  message,
  date,
  isRead,
  isStarred,
  isTrash,
  isDraft,
  toggleIsCompose,
}) {
  const history = useHistory();
  const { category } = useParams();

  // this function converts the date object to a sweet UI date string
  const dateToString = (dateObj) => {
    let day = new Date(dateObj).getDate();
    let month = new Date(dateObj).getMonth();
    switch (month) {
      case 0:
        return `Jan ${day}`;
      case 1:
        return `Feb ${day}`;
      case 2:
        return `Mar ${day}`;
      case 3:
        return `Apr ${day}`;
      case 4:
        return `May ${day}`;
      case 5:
        return `Jun ${day}`;
      case 6:
        return `Jul ${day}`;
      case 7:
        return `Aug ${day}`;
      case 8:
        return `Sep ${day}`;
      case 9:
        return `Oct ${day}`;
      case 10:
        return `Nov ${day}`;
      case 11:
        return `Dec ${day}`;
      default:
        return 'Loading...';
    }
  };

  return (
    <div className={`${styles.item} ${isRead || isTrash || isDraft ? styles.read : styles.unread}`}>
      <SelectOne />
      {isStarred !== undefined && <MarkStar id={id} isStarred={isStarred} />}
      {isTrash || isDraft ? <Delete id={id} /> : ''}

      <div
        className={styles.message}
        onClick={() =>
          isDraft ? toggleIsCompose(id) : history.push(`/email/${category}/view/${id}`)
        }>
        <h4>{title}</h4>
        &nbsp;&nbsp;
        <p>
          <span>{subject}</span>
          &nbsp;&nbsp;
          {message}
        </p>
        &nbsp;&nbsp;
        <span>{dateToString(date)}</span>
      </div>
    </div>
  );
}
