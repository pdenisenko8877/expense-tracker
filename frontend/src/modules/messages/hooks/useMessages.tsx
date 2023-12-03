import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Alert, AlertProps } from 'src/modules/ui/alert';

interface Props extends AlertProps {}

export const useMessages = () => {
  const handleShow = useCallback(({ message, severity = 'error' }: Props) => {
    toast(<Alert message={message} severity={severity} />, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'light',
    });
  }, []);

  return { show: handleShow };
};
