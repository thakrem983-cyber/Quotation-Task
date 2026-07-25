import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../api/api";
import "./AddDebitModal.css";

function AddDebitModal({ show, handleClose, onAddDebit, financeId }) {
  // 1. Form Data States
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // 2. Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!purpose.trim()) {
      alert("Please enter purpose.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Backend Controller ke req.body schema ke mutabiq Payload Object
    const payload = {
      date,
      purpose,
      amount: Number(amount),
      paidBy,
      beneficiaryName,
      paymentMode,
      transactionId,
    };

    try {
      setSubmitting(true);

      // 🛑 STEP 1: Agar existing Finance Record ID pass hui hai, toh direct API Call hit karein
      if (financeId) {
        const response = await api.post(
          `/client-finance/${financeId}/debit`,
          payload,
        );
        alert(response.data?.message || "Debit added successfully!");
      }

      // 🛑 STEP 2: Parent Component (ClientFinance.jsx) ke State / Table ko Update Karein
      if (typeof onAddDebit === "function") {
        onAddDebit(payload);
      }

      // Reset Form Fields
      setPurpose("");
      setAmount("");
      setPaidBy("");
      setBeneficiaryName("");
      setPaymentMode("");
      setTransactionId("");

      handleClose();
    } catch (error) {
      console.error("Error adding debit:", error);
      alert(error.response?.data?.message || "Failed to add debit.");
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
      dialogClassName="debit-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add Debit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="add-debit-form" onSubmit= {handleSubmit}>
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
              <div className="calendar-btn">
                <FaCalendarAlt />
              </div>
            </div>
          </Form.Group>

          {/* Purpose */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Purpose</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            {/* Amount Paid */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Amount Paid</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="₹ 0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            {/* Paid By */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Paid By</Form.Label>
                <Form.Select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  required
                >
                  <option value="">Select paid by</option>
                  <option value="Company">Company</option>
                  <option value="Self">Self</option>
                  <option value="Admin">Admin</option>
                  <option value="Partner">Partner</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Beneficiary Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Beneficiary Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter beneficiary name"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            {/* Payment Mode */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Payment Mode</Form.Label>
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
                <Form.Label className="fw-medium">Transaction ID</Form.Label>
                <Form.Control
                  type="text"
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
          onClick={handleClose}
          disabled={submitting}
          style={{ color: "#f58c22", borderColor: "#f58c22" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-debit-form"
          disabled={submitting}
          style={{
            backgroundColor: "#f58c22",
            borderColor: "#f58c22",
            color: "#fff",
          }}
        >
          {submitting ? "Adding..." : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDebitModal;