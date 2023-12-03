import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export interface AlertProps extends MuiAlertProps {
  message: string;
}

export const Alert = ({ severity, message }: AlertProps) => {
  return (
    <MuiAlert severity={severity} sx={{ width: '100%' }}>
      {message}
    </MuiAlert>
  );
};
