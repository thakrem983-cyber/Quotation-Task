import "./DeleteQuotation.css";

// Yahan props me 'quotationNo' add kiya hai
function DeleteQuotation({ closeModal, onDelete, quotationNo }) { 
  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <div className="delete-header">
          <h2>Delete Quotation</h2>

          <button className="close-btn" onClick={closeModal}>
            ✕
          </button>
        </div>

        <div className="delete-body">
          <p className="delete-text">
            Are you sure you want to delete this quotation?
          </p>

          <div className="Number">
            {/* Ab yahan wahi number dikhega jis icon par click hua hai */}
            <h2>{quotationNo}</h2>
          </div>

          <p className="delete-warning">This action cannot be undone.</p>
        </div>

        <div className="delete-footer">
          <button className="d-cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          {/* Delete dabane par Parent wala API function chalega */}
          <button className="d-delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteQuotation;