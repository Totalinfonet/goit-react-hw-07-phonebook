import { useMemo } from 'react';
import { ContactItem } from '../ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts';
import { selectContacts, selectFilter } from '../../redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <List>
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={() => handleDeleteContact(contact.id)}
        />
      ))}
    </List>
  );
};
