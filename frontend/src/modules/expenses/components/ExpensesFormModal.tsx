import { Token } from 'src/modules/app/types';
import { Modal, ModalProps } from 'src/modules/ui/modal';

import { ExpensesForm } from './ExpensesForm';

interface ExpenseFormProps extends ModalProps {
  token: Token;
}

export const ExpensesFormModal = ({ token, open, onClose }: ExpenseFormProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Додати витрати">
      <ExpensesForm token={token} />
    </Modal>
  );
};
