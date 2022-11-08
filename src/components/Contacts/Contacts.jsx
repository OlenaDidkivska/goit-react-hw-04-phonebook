import { ContactItem, ContactNumber, FilterButton } from './Contacts.styled';
import PropTypes from 'prop-types';

export const Contacts = ({ id, name, number, onDelete }) => {
  return (
    <ContactItem key={id}>
      {name}: <ContactNumber href={`tel:${number}`}>{number}</ContactNumber>{' '}
      <FilterButton type="button" onClick={() => onDelete(id)}>
        Delete
      </FilterButton>
    </ContactItem>
  );
};

Contacts.prototype = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};
