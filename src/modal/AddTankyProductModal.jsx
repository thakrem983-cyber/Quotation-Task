import React, { useState } from "react";

export default function AddTankyProductModal({ onClose, onAdd }) {
  const [items, setItems] = useState([
    { id: 1, image: "https://via.placeholder.com/40", name: "Test Product45", unit: "bags", quantity: 0, description: "abcdefg", price: 0, checked: false },
    { id: 2, image: "https://via.placeholder.com/40", name: "Roofing materials", unit: "kilogram (kg)", quantity: 0, description: "shingles", price: 0, checked: false },
  ]);

  const handleCheckbox = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const handleQtyChange = (index, val) => {
    const newItems = [...items];
    newItems[index].quantity = val;
    setItems(newItems);
  };

  const handleSubmit = () => {
    const selectedItems = items.filter(item => item.checked && item.quantity > 0);
    if (selectedItems.length > 0) {
      onAdd(selectedItems); // Main table receives this data seamlessly
      onClose();
    } else {
      alert("Please select at least one item and enter a quantity greater than 0");
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content border-0">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold">Add Tanky Product</h5>
            <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
          </div>
          
          <div className="modal-body py-4">
            
            {/* Search and Category - Screenshot jaisa */}
            <div className="d-flex justify-content-between mb-3">
              <input type="text" className="form-control w-25 shadow-none" placeholder="🔍 Search products..." />
              <select className="form-select w-25 shadow-none">
                <option>Select category</option>
              </select>
            </div>

            {/* Table wrapper for proper border */}
            <div className="table-responsive border rounded">
              <table className="table align-middle mb-0">
                <thead style={{ backgroundColor: "#f8f9fc", fontSize: "13px" }}>
                  <tr>
                    <th width="40" className="text-center"></th>
                    <th>PRODUCT NAME</th>
                    <th>UNIT</th>
                    <th width="120">QUANTITY</th>
                    <th>DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        <input 
                          type="checkbox" 
                          className="form-check-input shadow-none" 
                          checked={item.checked} 
                          onChange={() => handleCheckbox(idx)} 
                        />
                      </td>
                      
                      {/* --- YAHAN PAR FIX KIYA HAI --- */}
                      {/* td se d-flex hatakar uske andar div bana diya */}
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.image} alt="img" width="40" className="rounded border" />
                          <span className="fw-bold text-dark">{item.name}</span>
                        </div>
                      </td>
                      
                      <td>
                        <input type="text" className="form-control form-control-sm bg-light" value={item.unit} readOnly />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          value={item.quantity} 
                          onChange={(e) => handleQtyChange(idx, e.target.value)} 
                          min="0"
                        />
                      </td>
                      <td className="text-muted">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="modal-footer border-top-0 pt-0 d-flex justify-content-between">
            <button className="btn px-4 fw-bold" style={{ backgroundColor: "#f58c22", color: "white" }}>+ Add Service</button>
            <div className="d-flex gap-2">
               <button className="btn px-4 fw-bold" style={{ color: "#f58c22", border: "1px solid #f58c22" }} onClick={onClose}>Cancel</button>
               <button className="btn px-4 fw-bold" style={{ backgroundColor: "#f58c22", color: "white" }} onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}