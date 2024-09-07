import css from './Contact.module.css';
import UserIcon from '../../assets/user.svg';
import PhoneIcon from '../../assets/phone.svg';

const Contact = ({ name, number, onDelete }) => {
  return (
    <li className={css.Contact}>
      <div className={css.Contact__info}>
        <div className={css.Contact__row}>
          <img src={UserIcon} />
          {name}
        </div>
        <div className={css.Contact__row}>
          <img src={PhoneIcon} />
          {number}
        </div>
      </div>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default Contact;