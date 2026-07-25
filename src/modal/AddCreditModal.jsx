import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../api/api";
import "./AddCreditModal.css";

function AddCreditModal({ show, handleClose, onAddCredit }) {
  // 1. Form Data States
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // 2. Data Fetching & Loading States
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 3. Modal open hote hi Backend se Clients/Approved Quotations Fetch karna
  useEffect(() => {
    if (show) {
      const fetchClients = async () => {
        setLoading(true);
        try {
          const response = await api.get("/client-finance/approved-quotations");
          setClients(response.data || []);
        } catch (error) {
          console.error("Clients fetch karne me error aaya:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchClients();
    }
  }, [show]);

  // 4. Form Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClientId) {
      alert("Please select a client.");
      return;
    }

    // Selected Client Name nikalna
    const selectedClientObj = clients.find((c) => c._id === selectedClientId);

    const payload = {
      date,
      amount: Number(amount),
      clientName: selectedClientObj
        ? selectedClientObj.clientName || selectedClientObj.name
        : "",
      paymentMode,
      transactionId,
    };

    try {
      setSubmitting(true);

      // 🛑 STEP A: Parent Table/State ko instant update karo (Isse Table me Row Dikhne Lagegi)
      if (typeof onAddCredit === "function") {
        onAddCredit(payload);
      }

      // 🛑 STEP B: (Optional) Backend API hit - agar zaroorat ho
      const targetFinanceId = selectedClientObj?.financeId || selectedClientId;
      try {
        await api.post(`/client-finance/${targetFinanceId}/credit`, payload);
      } catch (apiError) {
        // Form Level par hum already local array update kar chuke hain,
        // to API error par user flow disrupt nahi hoga.
        console.warn("Backend API not updated yet (Form Mode):", apiError);
      }

      // Form Reset
      setAmount("");
      setSelectedClientId("");
      setPaymentMode("");
      setTransactionId("");

      // Close Modal
      handleClose();
    } catch (error) {
      console.error("Credit add karne me error aaya:", error);
      alert("Failed to add credit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      dialogClassName="credit-modal"
    >
      <Modal.Header className="cdt-modal-header" closeButton>
        <Modal.Title>Add Credit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="add-credit-form" onSubmit={handleSubmit}>
          {/* Date */}
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <div className="date-wrapper">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <button type="button" className="calendar-btn">
                <FaCalendarAlt />
              </button>
            </div>
          </Form.Group>

          {/* Amount Received */}
          <Form.Group className="mb-3">
            <Form.Label>Amount Received</Form.Label>
            <Form.Control
              type="number"
              placeholder="₹ 0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>

          {/* Client Name */}
          <Form.Group className="mb-3">
            <Form.Label>Client Name</Form.Label>
            <Form.Select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              required
            >
              <option value="">
                {loading ? "Loading clients..." : "Select Client"}
              </option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.clientName || client.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            {/* Payment Mode */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  required
                >
                  <option value="">Select payment mode</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Transaction ID */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Transaction ID</Form.Label>
                <Form.Control
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-warning"
          className="cdt-cancel-btn"
          onClick={handleClose}
          disabled={submitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="add-credit-form"
          variant="warning"
          className="cdt-add-btn"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCreditModal;