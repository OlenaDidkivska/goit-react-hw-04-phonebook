import { FilterField, FilterLabel, FilterInput } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <FilterField>
      <FilterLabel>Find contacts by name </FilterLabel>
      <FilterInput type="text" name="name" onChange={onChange} value={value} />
    </FilterField>
  );
};

export default Filter;

Filter.prototype = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
