import { Controller, Control } from 'react-hook-form';
import { TextField, TextFieldProps, MenuItem } from '@mui/material';

import { Option } from '../interfaces';

export interface TextProps extends Omit<TextFieldProps, 'variant'> {
  name: string;
  control: Control<any, any>;
  options?: Option[];
}

export const Text = ({
  name,
  control,
  label,
  type,
  margin = 'normal',
  required,
  multiline,
  maxRows = 10,
  select,
  options,
  ...props
}: TextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          value={field.value ?? ''}
          inputRef={field.ref}
          onChange={value => {
            field.onChange(value);
          }}
          fullWidth
          {...props}
          variant="outlined"
          label={label}
          type={type}
          select={select}
          margin={margin}
          required={required}
          multiline={multiline}
          maxRows={maxRows}
          error={invalid}
          helperText={error?.message}>
          {Array.isArray(options) &&
            options.map(option => (
              <MenuItem value={option.value} key={option.value}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
};
