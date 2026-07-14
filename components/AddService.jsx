import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./AddService.css";
import { useNavigate } from "react-router-dom";

function AddService({ closeModal }) {
  const navigate = useNavigate();

  const [showPage, setShowPage] = useState(true);

  if (!showPage) {
    return null;
  }

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

  const handleAdd = () => {
    if (serviceData.serviceName === "" || serviceData.price === "") {
      alert("Please fill required fields");
      return;
    }

    console.log(serviceData);

    alert("Service Added Successfully");

    closeModal();

    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("");

    const handleAdd = () => {
      if (!serviceName || !price) {
        alert("Please fill all fields");
        return;
      }

      const newService = {
        id: Date.now(),
        serviceName,
        price,
      };

      setServices([...services, newService]);

      setServiceName("");
      setPrice("");

      alert("Service added successfully");
    };
  };

  return (
    <div className="service-overlay">
      <div className="service-box">
        <div className="service-title">
          <h3>Add Service</h3>

          <button className="close-icon" onClick={() => setShowPage(false)}>
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
          <button
            className="cancel-btn"
            onClick={() => navigate("/add-tanky-product")}
          >
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
