import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import contactsTemplate from '../data/contactsTemplate.json';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import MainTitle from './MainTitle/MainTitle';

const CONTACTS = JSON.parse(localStorage.getItem('CONTACTS'));

export const App = () => {
  const [contacts, setContacts] = useState(CONTACTS ?? []);
  const [filter, setFilter] = useState('');
  const [isInitializedTemplate, setIsInitializedTemplate] = useState(
    CONTACTS && CONTACTS.length > 0 ? true : false
  );
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (!isInitializedTemplate) {
      setTimeout(() => {
        setContacts(contactsTemplate);
        setIsInitializedTemplate(true);
      }, 3000);
    }
  }, [isInitializedTemplate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);
  // useEffect(() => {
  //   window.localStorage.setItem(
  //     'isInitializedTemplate',
  //     JSON.stringify(isInitializedTemplate)
  //   );
  // }, [isInitializedTemplate]);

  useEffect(() => {
    window.localStorage.setItem('CONTACTS', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContacts = (name, number) => {
    const showAlert = true;
    const similarElement = element => element.name === name;
    if (contacts.find(similarElement)) {
      alert(name + ' is already in contacts.');
      return showAlert;
    }

    setContacts(prevState => [{ id: nanoid(), name, number }, ...prevState]);
  };

  const handlerInputFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handlerButtonDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  return (
    <div className="container">
      <MainTitle title="Phonebook" />
      <ContactForm addNewContacts={addNewContacts} />
      <MainTitle title="Contacts" />
      <Filter onChange={handlerInputFilter} filterValue={filter} />

      {isInitializedTemplate ? (
        <ContactList
          contacts={filterContacts()}
          onButtonDelete={handlerButtonDelete}
        />
      ) : (
        <>
          <p>
            You don't have any saved contacts, templates for contacts will be
            loaded
          </p>
          <p>
            Ви не маєте збережених контактів, будуть завантажені шаблони
            контактів
          </p>
          <p>{timer}</p>
        </>
      )}
    </div>
  );
};
