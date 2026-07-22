import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function AddCustomServiceModal({ onClose, onAdd }) {
  const [services, setServices] = useState([
    { serviceName: "", price: 0, unit: "Square Yards", quantity: 1 }
  ]);

  const addRow = () => {
    setServices([...services, { serviceName: "", price: 0, unit: "Square Yards", quantity: 1 }]);
  };

  const removeRow = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleSubmit = () => {
    // Filter empty rows
    const validServices = services.filter(s => s.serviceName.trim() !== "");
    if(validServices.length > 0) {
      onAdd(validServices);
      onClose();
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold">Custom Service</h5>
            <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
          </div>
          
          <div className="modal-body py-4">
            <div className="text-end mb-3">
              <button className="btn btn-sm btn-outline-warning fw-bold text-warning" style={{ borderColor: "#f58c22", color: "#f58c22" }} onClick={addRow}>+ Add</button>
            </div>

            <table className="table align-middle">
              <thead style={{ fontSize: "13px", color: "#6c757d" }}>
                <tr>
                  <th>SERVICE</th>
                  <th width="150">PRICE</th>
                  <th width="150">UNIT</th>
                  <th width="100">QUANTITY</th>
                  <th width="40"></th>
                </tr>
              </thead>
              <tbody>
                {services.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input type="text" className="form-control shadow-none" placeholder="Service name (e.g. Labour)" value={row.serviceName} onChange={(e) => handleChange(idx, "serviceName", e.target.value)} />
                    </td>
                    <td>
                      <input type="number" className="form-control shadow-none" value={row.price} onChange={(e) => handleChange(idx, "price", e.target.value)} />
                    </td>
                    <td>
                      <input type="text" className="form-control shadow-none" value={row.unit} onChange={(e) => handleChange(idx, "unit", e.target.value)} />
                    </td>
                    <td>
                      <input type="number" className="form-control shadow-none" value={row.quantity} onChange={(e) => handleChange(idx, "quantity", e.target.value)} />
                    </td>
                    <td className="text-center">
                      <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => removeRow(idx)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-footer border-top-0 pt-0">
            <button className="btn px-4 fw-bold" style={{ backgroundColor: "#f58c22", color: "white" }} onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}