import React from 'react';
import { TextField } from 'react-md';

/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
const textInput = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <TextField
    id={input.name}
    label={label}
    value={input.value}
    {...custom}
    lineDirection={input.lineDirection}
    placeholder={input.placeholder || ''}
    className={input.className}
    onChange={input.onChange}
    type={type}
    error={touched && !!error}
    errorText={error}
  />
);

export default textInput;
