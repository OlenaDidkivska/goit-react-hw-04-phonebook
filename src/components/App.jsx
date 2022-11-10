import { useState, useEffect } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './Form/Form';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PhonebookContainer, ContactsMassage } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getCheckedContacts = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  const formSubmitHandler = ({ name, number }) => {
    console.log(name, number);
    const checkNewContact = getCheckedContacts(name);

    if (checkNewContact) {
      Notify.info(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      setContacts(state => [...state, contact]);

      Notify.success('Contact successfully added');
    }
  };

  const changeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    Notify.info('Сontact deleted successfully');
  };

  const visibleContacts = getVisibleContacts();

  return (
    <PhonebookContainer>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      {contacts.length !== 0 ? (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ul>
            {visibleContacts.map(contact => (
              <Contacts
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
                onDelete={deleteContact}
              />
            ))}
          </ul>
        </>
      ) : (
        <ContactsMassage>
          Your phonebook is empty, add your first contact
        </ContactsMassage>
      )}
    </PhonebookContainer>
  );
}
