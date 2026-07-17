import { useState } from "react";
import "./DeleteQuotation.css";

function DeleteQuotation() {
  const [showModal, setShowModal] = useState(true);

  const quotationNo = "MECH202627-009";

  const handleDelete = () => {
    alert(`${quotationNo} deleted successfully.`);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
       
        <div className="delete-header">
          <h2>Delete Quotation</h2>

          <button className="close-btn" onClick={() => setShowModal(false)}>
            ✕
          </button>
        </div>

        
        <div className="delete-body">
          <p className="delete-text">
            Are you sure you want to delete this quotation?
          </p>

        <div className="Number">
            <h2>{quotationNo}</h2>
        </div>
          {/* <h2>{quotationNo}</h2> */}

          <p className="delete-warning">This action cannot be undone.</p>
        </div>

        
        <div className="delete-footer">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteQuotation;