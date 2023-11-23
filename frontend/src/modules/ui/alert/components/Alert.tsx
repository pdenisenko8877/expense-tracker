import { useState, SyntheticEvent, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';

interface AlertProps extends MuiAlertProps {
  show: boolean;
  message: string;
}

export const Alert = ({ severity, message, show }: AlertProps) => {
  const [open, setOpen] = useState(false);

  console.log(open);
  console.log(show);

  useEffect(() => {
    if (show) {
      setOpen(true);
    }
  }, [show]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
