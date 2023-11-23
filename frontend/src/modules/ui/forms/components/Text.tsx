import { Controller, Control } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export type TextProps = Omit<TextFieldProps, 'variant'> & {
  name: string;
  control: Control<any, any>;
};

export const Text = ({
  name,
  control,
  label,
  type,
  margin = 'normal',
  required,
  multiline,
  maxRows = 10,
  ...props
}: TextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          {...field}
          fullWidth
          {...props}
          variant="outlined"
          label={label}
          type={type}
          margin={margin}
          required={required}
          multiline={multiline}
          maxRows={maxRows}
          error={invalid}
          helperText={error?.message}
        />
      )}
    />
  );
};
