import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import "./AddDebitModal.css";

function AddDebitModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="md"
      backdrop="static"
    >
      <Modal.Header className="dbt-modal-header" closeButton>
        <Modal.Title>Add Debit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <div className="date-wrapper">
              <Form.Control type="date" defaultValue="2026-07-14" />

              <button type="button" className="calendar-btn">
                <FaCalendarAlt />
              </button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Purpose</Form.Label>
            <Form.Control type="text" placeholder="Enter purpose" />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control type="number" placeholder="₹ 0" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Paid By</Form.Label>
                <Form.Select>
                  <option>Select paid by</option>
                  <option>Cash</option>
                  <option>Bank</option>
                  <option>UPI</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Beneficiary Name</Form.Label>
            <Form.Control placeholder="Enter beneficiary name" />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select>
                  <option>Select payment mode</option>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Cheque</option>
                  <option>Bank Transfer</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Transaction ID</Form.Label>
                <Form.Control placeholder="Enter Transaction ID" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-warning"
          className="text-dark"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button variant="warning" className="dbt-add-btn">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDebitModal;
