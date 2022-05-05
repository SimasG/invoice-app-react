import { StyledDeleteInvoiceModal } from "../../styles/modals/DeleteInvoiceModal.styled";

const DeleteInvoiceModal = () => {
  return (
    <StyledDeleteInvoiceModal>
      <div className="delete-invoice-modal-container">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice #XM9141? This action cannot be
          undone.
        </p>
        <div className="btn-container">
          <button className="cancel-btn">Cancel</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </StyledDeleteInvoiceModal>
  );
};

export default DeleteInvoiceModal;
