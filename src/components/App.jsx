import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import contactsTemplate from '../data/contactsTemplate.json';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import MainTitle from './MainTitle/MainTitle';

const CONTACTS = JSON.parse(localStorage.getItem('CONTACTS'));

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isInitializedTemplate: false,
  };

  componentDidMount() {
    if (CONTACTS && CONTACTS.length > 0) {
      this.setState({
        isInitializedTemplate: true,
        contacts: CONTACTS,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isInitializedTemplate: true,
          contacts: contactsTemplate,
        });
      }, 4000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('CONTACTS', JSON.stringify(this.state.contacts));
    }
  }

  addNewContacts = (name, number) => {
    const showAlert = true;
    const similarElement = element => element.name === name;
    if (
      // this.state.contacts.filter(contact => contact.name === name).length !== 0 // мій метод пошуку подібного ім'я через фільтр // не кращій варіант
      // this.state.contacts.some(contact => contact.name === name) // знайшов some, який перебирає масив і повертає true або false, не мутує вихідний масив
      // this.state.contacts.some(similarElement)

      this.state.contacts.find(similarElement)
    ) {
      alert(name + ' is already in contacts.');
      return showAlert;
    }

    this.setState(prevState => ({
      contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
    }));
  };

  handlerInputFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  handlerButtonDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  render() {
    const filterContacts = this.filterContacts();

    return (
      <div className="container">
        <MainTitle title="Phonebook" />
        <ContactForm addNewContacts={this.addNewContacts} />
        <MainTitle title="Contacts" />
        <Filter
          onChange={this.handlerInputFilter}
          filterValue={this.state.filter}
        />

        {this.state.isInitializedTemplate ? (
          <ContactList
            contacts={filterContacts}
            onButtonDelete={this.handlerButtonDelete}
          />
        ) : (
          <>
            <p>
              You don't have any saved contacts, templates for contacts will be
              loaded...
            </p>
            <p>
              Ви не маєте збережених контактів, будуть завантажені шаблони
              контактів...
            </p>
          </>
        )}
      </div>
    );
  }
}
