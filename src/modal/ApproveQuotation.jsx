import { useState } from "react";
import "./ApproveQuotation.css";

function ApproveQuotation({ closeModal, onApprove }) {
  const [paymentReceived, setPaymentReceived] = useState(null);

  // YES Form
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paidTo, setPaidTo] = useState("");

  // NO Form
  const [expectedDate, setExpectedDate] = useState("");
  const [note, setNote] = useState("");
  // const [isOpen, setIsOpen] = useState(true);
  const [activeButton, setActiveButton] = useState("");
  
  const [selectedButton, setSelectedButton] = useState("");
  console.log(selectedButton);

  const handleApprove = () => {
  onApprove();
  closeModal();
};
  const handleCancel = () => {
  closeModal();
};
  const handleFinance = () => {};

  // if (!isOpen) {
  //   return null;
  // }
  return (
    <div className="approve-modal-overlay">
      <div className="approve-quotation-modal">
        <div className="approve-modal-header">
          <h2>Approve Quotation #MECH202627-009</h2>

          <button className="approve-close-btn" onClick={closeModal}>
            ✕
          </button>
        </div>

        <div className="approve-modal-content">
          <p className="approve-description">
            Please select whether the payment has been received.
          </p>

          <div className="approve-button-group">
            <button
              className={paymentReceived === true ? "approve-active-btn" : "approve-normal-btn"}
              onClick={() => setPaymentReceived(true)}
            >
              YES
            </button>

            <button
              className={
                paymentReceived === false ? "approve-active-btn" : "approve-normal-btn"
              }
              onClick={() => setPaymentReceived(false)}
            >
              NO
            </button>
          </div>

          {paymentReceived !== null && (
            <div className="approve-container">
              {paymentReceived === true && (
                <div className="approve-payment-section">
                  <div className="approve-field-group">
                    <h3>Payment Details</h3>
                    <label>
                      Amount Details <span>*</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                  />

                  <div className="approve-row">
                    <div className="approve-field-group">
                      <label>
                        Payment Mode <span>*</span>
                      </label>

                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                      >
                        <option value="">Select mode</option>
                        <option>Cash</option>
                        <option>NEFT</option>
                        <option>Net Banking</option>
                        <option>Bank Transfer</option>
                        <option>Cheque</option>
                        <option>UPI</option>
                        <option>Card</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="approve-field-group">
                      <label>
                        Paid To <span>*</span>
                      </label>

                      <select
                        value={paidTo}
                        onChange={(e) => setPaidTo(e.target.value)}
                      >
                        <option value="">Select receiver</option>
                        <option>Milestone</option>
                        <option>Ankit Shrishagar</option>
                        <option>NeelKamal Shahu</option>
                      </select>
                    </div>
                  </div>

                  <div className="approve-note-box">
                    <span>Note:</span> The payment will be recorded and added to
                    the client's finance.
                  </div>

                  <div className="approve-footer-buttons">
                    <button
                      className={`approve-approve-btn ${
                        selectedButton === "approve" ? "approve-selected-btn" : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("approve");
                        handleApprove();
                      }}
                    >
                      Approve & Save
                    </button>

                    <button
                      className={`approve-cancel-btn ${
                        selectedButton === "cancel" ? "approve-selected-btn" : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("cancel");
                        handleCancel();
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                  <button
                    className={`approve-finance-btn ${
                      selectedButton === "finance" ? "approve-selected-btn" : ""
                    }`}
                    onClick={() => {
                      setSelectedButton("finance");
                      handleFinance();
                    }}
                  >
                    Create Finance
                  </button>
                </div>
              )}

              {paymentReceived === false && (
                <div className="approve-payment-section">
                  <h3>Expected Advance Date *</h3>

                  <input
                    type="date"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                  />

                  <h3>Note</h3>

                  <textarea
                    rows="4"
                    placeholder="Enter note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />

                  <div className="approve-footer-buttons">
                    <button
                      className={`approve-approve-btn ${
                        selectedButton === "approve" ? "approve-selected-btn" : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("approve");
                        handleApprove();
                      }}
                    >
                      Approve & Save
                    </button>

                    <button
                      className={`approve-cancel-btn ${
                        selectedButton === "cancel" ? "approve-selected-btn" : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("cancel");
                        handleCancel();
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                  <button
                    className={`approve-finance-btn ${
                      selectedButton === "finance" ? "approve-selected-btn" : ""
                    }`}
                    onClick={() => {
                      setSelectedButton("finance");
                      handleFinance();
                    }}
                  >
                    Create Finance
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApproveQuotation;
