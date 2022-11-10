import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  Field,
  FormField,
  Label,
  FormButton,
  ErrorText,
  Form,
} from './Form.styled';

const nameId = nanoid();
const numberId = nanoid();

export const ContactForm = ({ onSubmit }) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    delayError: 500,
    defaultValues: {
      name: '',
      number: '',
    },
  });

  return (
    <Form
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        resetField('name');
        resetField('number');
      })}
    >
      <FormField>
        <Label htmlFor={nameId}>Name</Label>
        <Field
          type="text"
          {...register('name', {
            required: 'This is required',
            maxLength: { value: 30, message: 'Max length is 30' },
            pattern: {
              value:
                /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              message:
                "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
            },
          })}
          id={nameId}
        />
        <ErrorText>{errors.name?.message}</ErrorText>
      </FormField>
      <FormField>
        <Label htmlFor={numberId}>Number </Label>
        <Field
          type="tel"
          {...register('number', {
            required: 'This is required',
            maxLength: { value: 13, message: 'Max length is 13' },
            pattern: {
              value:
                /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
              message:
                'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            },
          })}
          id={numberId}
        />
        <ErrorText>{errors.number?.message}</ErrorText>
      </FormField>
      <FormButton type="submit">Add contact</FormButton>
    </Form>
  );
};

ContactForm.prototype = {
  onSubmit: PropTypes.string.isRequired,
};
