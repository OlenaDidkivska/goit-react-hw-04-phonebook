import React from 'react';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import {
  Field,
  FormField,
  Label,
  FormButton,
  ErrorText,
  Form,
} from './Form.styled';
import * as yup from 'yup';

const nameId = nanoid();
const numberId = nanoid();
const paternName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const paternNumber =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      paternName,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .matches(
      paternNumber,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .max(13)
    .required(),
});

export const FormEl = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <FormField>
          <Label htmlFor={nameId}>Name</Label>
          <Field type="text" name="name" id={nameId} />
          <ErrorMessage
            name="name"
            render={message => <ErrorText>{message}</ErrorText>}
          />
        </FormField>
        <FormField>
          <Label htmlFor={numberId}>Number </Label>
          <Field type="tel" name="number" id={numberId} />
          <ErrorMessage
            name="number"
            render={message => <ErrorText>{message}</ErrorText>}
          />
        </FormField>
        <FormButton type="submit">Add contact</FormButton>
      </Form>
    </Formik>
  );
};

FormEl.prototype = {
  onSubmit: PropTypes.string.isRequired,
};
