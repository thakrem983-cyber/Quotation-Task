import { useState } from "react";
import "./ApproveQuotation.css";
import api from "../api/api"; // <-- API import zaroor karna

// Props mein quotationId aur quotationNumber add kiya
function ApproveQuotation({
  closeModal,
  onApprove,
  quotationId,
  quotationNumber,
}) {
  const [paymentReceived, setPaymentReceived] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state add ki

  // YES Form
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paidTo, setPaidTo] = useState("");

  // NO Form
  const [expectedDate, setExpectedDate] = useState("");
  const [note, setNote] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const handleApprove = async () => {
    try {
      setLoading(true);

      // 1. Agar user ne NO dabaya aur Date khali chhod di
      if (paymentReceived === false && !expectedDate) {
        alert("Bhai, Expected Advance Date select karna zaroori hai!");
        setLoading(false);
        return;
      }

      // 2. Agar user ne YES dabaya aur amount waghera nahi daala
      if (paymentReceived === true) {
        if (!amount || !paymentMode || !paidTo) {
          alert("Please fill all payment details.");
          setLoading(false);
          return;
        }
      }

      // 3. Backend ko wahi naam bhejo jo usko chahiye (expectedAdvanceDate)
      // Agar 'YES' select kiya hai toh safety ke liye aaj ki date bhej dete hain taaki error na aaye
      const today = new Date().toISOString().split("T")[0];
      
      const approvePayload = {
        expectedAdvanceDate: paymentReceived === false ? expectedDate : today,
        expectedDate: paymentReceived === false ? expectedDate : today, // Dono bhej diye, backend jo chahe rakh le 😂
        note: paymentReceived === false ? note : "Payment Received",
      };
      
      await api.put(`/quotations/${quotationId}/approve`, approvePayload);

      // 4. Agar Payment YES thi, toh Payments array mein save karo
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
      onApprove(); // Table ko refresh karega
      closeModal(); // Popup band karega

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

  const handleFinance = () => {};

  return (
    <div className="approve-modal-overlay">
      <div className="approve-quotation-modal">
        <div className="approve-modal-header">
          {/* H2 ko dynamic bana diya */}
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
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Approve & Save"}
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
                        selectedButton === "approve"
                          ? "approve-selected-btn"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedButton("approve");
                        handleApprove();
                      }}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Approve & Save"}
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
