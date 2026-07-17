import { useState } from "react";
import "./CustomerService.css";
import { FaTrash } from "react-icons/fa";

// function CustomerService({ closeModal }) {
function CustomerService({
  closeModal,
  products: mainProducts,
  setProducts,
}) {
  const [services, setServices] = useState([
    {
      service: "",
      price: "",
      unit: "",
      quantity: 1,
      errors: {},
    },
  ]);

  const addRow = () => {
    setServices([
      ...services,
      {
        service: "",
        price: "",
        unit: "",
        quantity: 1,
        errors: {},
      },
    ]);
  };

  const removeRow = (index) => {
    const list = [...services];
    list.splice(index, 1);

    if (list.length === 0) {
      list.push({
        service: "",
        price: "",
        unit: "",
        quantity: 1,
        errors: {},
      });
    }

    setServices(list);
  };

  const handleChange = (index, field, value) => {
    const list = [...services];
    list[index][field] = value;
    list[index].errors[field] = "";
    setServices(list);
  };

  const validate = () => {
    let valid = true;

    const list = services.map((item) => {
      const errors = {};

      if (!item.service.trim()) errors.service = "Service Name Required";

      if (!item.price) errors.price = "Price Required";

      if (!item.unit.trim()) errors.unit = "Unit Required";

      if (!item.quantity || item.quantity <= 0)
        errors.quantity = "Quantity Required";

      if (Object.keys(errors).length > 0) valid = false;

      return {
        ...item,
        errors,
      };
    });

    setServices(list);

    return valid;
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = () => {
  if (!validate()) return;

  const serviceProducts = services.map((item) => ({
    id: Date.now() + Math.random(),

    productName: item.service,
    code: "SERVICE",

    unit: item.unit,
    price: Number(item.price),

    quantity: Number(item.quantity),

    amount: Number(item.price) * Number(item.quantity),

    isEditing: false,
  }));

  setProducts([...mainProducts, ...serviceProducts]);

  closeModal();
};

  return (
    <>
      <div className="service-overlay">
        <div className="service-modal">
          <div className="modal-header">
            <h3>Custom Service</h3>
            <button className="close-icon" onClick={closeModal}>
              ×
            </button>
          </div>

          <div>
            <button className="add-row" onClick={addRow}>
              + Add
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>SERVICE</th>
                <th>PRICE</th>
                <th>UNIT</th>
                <th>QUANTITY</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {services.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      placeholder="Service name (e.g. Labour)"
                      value={item.service}
                      onChange={(e) =>
                        handleChange(index, "service", e.target.value)
                      }
                    />
                    <small>{item.errors.service}</small>
                  </td>

                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      value={item.price}
                      onChange={(e) =>
                        handleChange(index, "price", e.target.value)
                      }
                    />
                    <small>{item.errors.price}</small>
                  </td>

                  <td>
                    <input
                      type="text"
                      placeholder="Square Yards"
                      value={item.unit}
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                    />
                    <small>{item.errors.unit}</small>
                  </td>

                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                    />
                    <small>{item.errors.quantity}</small>
                  </td>

                  <td>
                    <FaTrash
                      className="delete"
                      onClick={() => removeRow(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="footer-buttons">
            <button className="cancel" onClick={handleCancel}>
              Cancel
            </button>

            <button className="save" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerService;