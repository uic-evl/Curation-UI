import React from 'react';
import { TextField } from 'react-md';

const textInput = field => (
  <TextField
    id={field.input.name}
    label={field.label}
    lineDirection={field.lineDirection}
    placeholder={field.placeholder || ''}
    className={field.className}
    value={field.input.value}
    onChange={field.input.onChange}
    type={field.type}
  />
);

export default textInput;
