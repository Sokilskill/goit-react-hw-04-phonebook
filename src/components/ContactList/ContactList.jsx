import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onButtonDelete }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <li className={css.item} key={id}>
            <p>
              {name}: {number}
            </p>

            <button type="button" onClick={() => onButtonDelete(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onButtonDelete: PropTypes.func.isRequired,
};

export default ContactList;
