import { useState } from "react";
import "./AddService.css";

function AddService({ closeModal, products: mainProducts, setProducts }) {
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    qty: "1",
    price: "",
    unit: "Square Yards",
    description: "",
  });

  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleAdd = () => {
    const newService = {
      id: Date.now(),
      productName: serviceData.serviceName,
      code: "SERVICE",
      unit: serviceData.unit,
      price: Number(serviceData.price),
      quantity: Number(serviceData.qty),
      amount: Number(serviceData.price) * Number(serviceData.qty),
      isEditing: false,
    };

    setProducts([...mainProducts, newService]);

    closeModal();
  };
  return (
    <div className="service-overlay">
      <div className="service-box">
        <div className="service-title">
          <h3>Add Service</h3>

          <button className="close-btn" onClick={closeModal}>
            ×
          </button>
        </div>

        <div className="service-form">
          <label>
            Service Name <span>*</span>
          </label>

          <input
            type="text"
            name="serviceName"
            placeholder="Enter or select product/service"
            value={serviceData.serviceName}
            onChange={handleChange}
          />

          <label>
            Qty <span>*</span>
          </label>

          <input
            type="number"
            name="qty"
            value={serviceData.qty}
            onChange={handleChange}
          />

          <label>
            Price <span>*</span>
          </label>

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={serviceData.price}
            onChange={handleChange}
          />

          <label>
            Unit <span>*</span>
          </label>

          <input
            type="text"
            name="unit"
            value={serviceData.unit}
            onChange={handleChange}
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Enter description (optional)"
            value={serviceData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="service-buttons">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddService;