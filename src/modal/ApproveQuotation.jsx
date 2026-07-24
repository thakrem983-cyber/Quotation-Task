import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./ApproveQuotation.css";
import api from "../api/api";

function ApproveQuotation({
  closeModal,
  onApprove,
  quotationId,
  quotationNumber,
}) {
  const navigate = useNavigate(); 

  const [paymentReceived, setPaymentReceived] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); 

  
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paidTo, setPaidTo] = useState("");

  
  const [expectedDate, setExpectedDate] = useState("");
  const [note, setNote] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const handleApprove = async () => {
    try {
      setLoading(true);

      
      if (paymentReceived === false && !expectedDate) {
        alert("Bhai, Expected Advance Date select karna zaroori hai!");
        setLoading(false);
        return;
      }

      
      if (paymentReceived === true) {
        if (!amount || !paymentMode || !paidTo) {
          alert("Please fill all payment details.");
          setLoading(false);
          return;
        }
      }

      const today = new Date().toISOString().split("T")[0];
      
      const approvePayload = {
        expectedAdvanceDate: paymentReceived === false ? expectedDate : today,
        expectedDate: paymentReceived === false ? expectedDate : today,
        note: paymentReceived === false ? note : "Payment Received",
      };
      
      await api.put(`/quotations/${quotationId}/approve`, approvePayload);

      
      if (paymentReceived === true) {
        const paymentPayload = {
          quotationId: quotationId,
          amount: Number(amount),
          paymentMode: paymentMode,
          receivedBy: paidTo,
          remarks: "Advance payment on approval",
        };
        await api.post("/payments", paymentPayload);
      }

      alert("Quotation Approved Successfully!");
      setIsSaved(true); 
      onApprove(); 
      
     

    } catch (error) {
      console.error("Backend se ye error aayi:", error.response?.data || error.message);
      const backendMsg = error.response?.data?.message || "Failed to approve quotation";
      alert(`Error: ${backendMsg}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    closeModal();
  };

  const handleFinance = () => {
   
    navigate('/client-finance', { 
      state: { 
        quotation: {
          id: quotationId,
          quotationNumber: quotationNumber,
          
          advanceAmount: paymentReceived ? amount : 0 
        }
      } 
    });
  };

  return (
    <div className="approve-modal-overlay">
      <div className="approve-quotation-modal">
        <div className="approve-modal-header">
          <h2>Approve Quotation #{quotationNumber || "Unknown"}</h2>

          <button
            className="approve-close-btn"
            onClick={closeModal}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <div className="approve-modal-content">
          <p className="approve-description">
            Please select whether the payment has been received.
          </p>

          <div className="approve-button-group">
            <button
              className={
                paymentReceived === true
                  ? "approve-active-btn"
                  : "approve-normal-btn"
              }
              onClick={() => setPaymentReceived(true)}
              disabled={isSaved} 
            >
              YES
            </button>

            <button
              className={
                paymentReceived === false
                  ? "approve-active-btn"
                  : "approve-normal-btn"
              }
              onClick={() => setPaymentReceived(false)}
              disabled={isSaved} 
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
                    disabled={isSaved}  
                  />

                  <div className="approve-row">
                    <div className="approve-field-group">
                      <label>
                        Payment Mode <span>*</span>
                      </label>
                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        disabled={isSaved}
                      >
                        <option value="">Select mode</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                        <option value="NEFT">NEFT</option>
                        <option value="RTGS">RTGS</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>

                    <div className="approve-field-group">
                      <label>
                        Paid To <span>*</span>
                      </label>
                      <select
                        value={paidTo}
                        onChange={(e) => setPaidTo(e.target.value)}
                        disabled={isSaved}
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
                        selectedButton === "approve"
                          ? "approve-selected-btn"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("approve");
                        handleApprove();
                      }}
                      disabled={loading || isSaved} 
                    >
                      {loading ? "Saving..." : isSaved ? "Saved!" : "Approve & Save"}
                    </button>

                    <button
                      className={`approve-cancel-btn ${
                        selectedButton === "cancel"
                          ? "approve-selected-btn"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("cancel");
                        handleCancel();
                      }}
                    >
                      {isSaved ? "Close" : "Cancel"}
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
                    disabled={!isSaved} 
                    style={{
                      opacity: isSaved ? 1 : 0.5,
                      cursor: isSaved ? "pointer" : "not-allowed"
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
                    disabled={isSaved}
                  />

                  <h3>Note</h3>

                  <textarea
                    rows="4"
                    placeholder="Enter note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={isSaved}
                  />

                  <div className="approve-footer-buttons">
                    <button
                      className={`approve-approve-btn ${
                        selectedButton === "approve"
                          ? "approve-selected-btn"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("approve");
                        handleApprove();
                      }}
                      disabled={loading || isSaved}
                    >
                      {loading ? "Saving..." : isSaved ? "Saved!" : "Approve & Save"}
                    </button>

                    <button
                      className={`approve-cancel-btn ${
                        selectedButton === "cancel"
                          ? "approve-selected-btn"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("cancel");
                        handleCancel();
                      }}
                    >
                      {isSaved ? "Close" : "Cancel"}
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
                    disabled={!isSaved} 
                    style={{
                      opacity: isSaved ? 1 : 0.5,
                      cursor: isSaved ? "pointer" : "not-allowed"
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