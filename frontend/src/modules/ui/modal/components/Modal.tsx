import { IconButton, Dialog, DialogProps, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps extends Omit<DialogProps, 'onClose'> {
  onClose: (reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'submitClick') => void;
}

export const Modal = ({
  open,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen,
  scroll = 'body',
  onClose,
  children,
  title,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose('backdropClick')}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      scroll={scroll}
      fullWidth={fullWidth}>
      <IconButton
        onClick={() => onClose('closeButtonClick')}
        sx={{
          fontSize: 20,
          position: 'absolute',
          right: 5,
          top: 5,
        }}>
        <CloseIcon fontSize="inherit" />
      </IconButton>

      {title && (
        <DialogTitle variant="h2" component="h3">
          {title}
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
