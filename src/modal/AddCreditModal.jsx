import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import "./AddCreditModal.css";

function AddCreditModal({ show, handleClose }) {
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
            <Form.Label>Amount Received</Form.Label>

            <Form.Control type="number" placeholder="₹ 0" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Client Name</Form.Label>

            <Form.Control placeholder="Enter client name" />
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
          className="cdt-cancel-btn"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button variant="warning" className="cdt-add-btn">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCreditModal;
