import { Token } from 'src/modules/app/types';
import { Modal, ModalProps } from 'src/modules/ui/modal';

import { ExpensesFormEdit } from './ExpensesFormEdit';

interface ExpenseFormProps extends ModalProps {
  token: Token;
  editId: number;
}

export const ExpensesFormEditModal = ({ token, editId, open, onClose }: ExpenseFormProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Редагувати витрати">
      <ExpensesFormEdit token={token} editId={editId} />
    </Modal>
  );
};
