import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid'
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import Notification from './Notification/Notification';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const localStorageKey = 'contacts';

const storage = {
  getContacts() {
    return JSON.parse(localStorage.getItem(localStorageKey)) ?? defaultContacts;
  },
  setContacts(contacts) {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  },
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const contacts = storage.getContacts();
    setContacts(contacts);
  }, []);

  const filteredContacts = useMemo(() => {
    return !!search.length
      ? contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))
      : contacts;
  }, [contacts, search]);

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    storage.setContacts(contacts.filter(contact => contact.id !== id));
  }

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const updatedContacts = [newContact, ...contacts];
    setContacts(updatedContacts);
    storage.setContacts(updatedContacts);
  }

  return (
    <div className={css.App}>
      <h1>PhoneBook</h1>
      <div className={css.App__container}>
        <ContactForm onSubmit={handleAddContact} />
        <SearchBox
          value={search}
          onChange={setSearch}
        />
      </div>
      {!!filteredContacts.length
        ? (
          <ContactList
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
          />
        )
        : <Notification />
      }
    </div>
  )
}

export default App
