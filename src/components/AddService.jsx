import { useState } from "react";
import "./AddService.css";

function AddService({ closeModal }) {
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    qty: "1",
    price: "",
    unit: "Square Yards",
    description: "",
  });

  const [services, setServices] = useState([]);

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
    if (serviceData.serviceName === "" || serviceData.price === "") {
      alert("Please fill required fields");
      return;
    }

    const newService = {
      id: Date.now(),
      serviceName: serviceData.serviceName,
      qty: serviceData.qty,
      price: serviceData.price,
      unit: serviceData.unit,
      description: serviceData.description,
    };

    setServices([...services, newService]);

    console.log(newService);

    alert("Service Added Successfully");

    setServiceData({
      serviceName: "",
      qty: "1",
      price: "",
      unit: "Square Yards",
      description: "",
    });

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