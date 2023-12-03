import dayjs from 'dayjs';
import { Controller, Control } from 'react-hook-form';
import { DatePicker as MuiDatePiker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface DatePickerProps {
  name: string;
  control: Control<any, any>;
  label?: string;
  required?: boolean;
  margin?: 'dense' | 'normal' | 'none';
  placeholder?: string;
}

export const DatePicker = ({
  name,
  control,
  label,
  required,
  margin = 'normal',
  placeholder,
}: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <MuiDatePiker
            value={field.value ? dayjs(field.value) : null}
            inputRef={field.ref}
            onChange={(date: dayjs.Dayjs | null) => {
              field.onChange(date);
            }}
            label={label}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                variant: 'outlined',
                fullWidth: true,
                error: invalid,
                helperText: error?.message,
                required,
                margin,
                placeholder,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
