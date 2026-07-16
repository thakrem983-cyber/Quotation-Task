import "./AddTankyProduct.css";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function AddTankyProduct({ closeModal, openAddService }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/35",
      name: "Test Product45",
      Category: "Cement",
      unit: "bags",
      quantity: 0,
      description: "abcdefg",
      checked: false,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/35",
      name: "Roofing materials",
      Category: "Steel",
      unit: "kilogram (kg)",
      quantity: 0,
      description: "shingles",
      checked: false,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/35",
      name: "Test Product23",
      category: "Paint",
      unit: "bags",
      quantity: 0,
      description: "-",
      checked: false,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/35",
      name: "Test Product",
      unit: "Square Yards",
      quantity: 0,
      description: "-",
      checked: false,
    },
  ]);
  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    setSelectAll(checked);

    const updatedProducts = products.map((item) => ({
      ...item,
      checked: checked,
    }));

    setProducts(updatedProducts);
  };

  const handleQuantity = (id, value) => {
    const updatedProducts = products.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: value,
        };
      }
      return item;
    });

    setProducts(updatedProducts);
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleAdd = () => {
    alert("Added Successfully");
    closeModal();
  };

  const handleAddService = () => {
  openAddService();
};

  const handleUnit = (id, value) => {
    const updatedProducts = products.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          unit: value,
        };
      }

      return item;
    });

    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((item) => {
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());

    const categoryMatch = category === "" || item.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <>
      <div className="tanky-overlay">
        <div className="tanky-modal">
          <div className="tanky-header">
            <h3>Add Tanky Product</h3>
            <button className="close-icon" onClick={closeModal}>
              ×
            </button>
          </div>

          <div className="top-section">
            <div className="search-container">
              <FaSearch className="search-icon" />

              <input
                type="text"
                placeholder="Search products..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Cement">Cement</option>
              <option value="Steel">Steel</option>
              <option value="Paint">Paint</option>
            </select>
          </div>

          <div className="table-area">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>PRODUCT NAME</th>
                  <th>UNIT</th>
                  <th>QUANTITY</th>
                  <th>DESCRIPTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {
                          const updatedProducts = products.map((product) =>
                            product.id === item.id
                              ? {
                                  ...product,
                                  checked: !product.checked,
                                }
                              : product,
                          );

                          setProducts(updatedProducts);

                          setSelectAll(
                            updatedProducts.every((product) => product.checked),
                          );
                        }}
                      />
                    </td>

                    <td className="product-name">
                      <img src="src/assets/riding.jpg" alt="" />
                      <span>{item.name}</span>
                    </td>

                    <td>
                      <select
                        className="unit-input"
                        value={item.unit}
                        onChange={(e) => handleUnit(item.id, e.target.value)}
                      >
                        <option value="bags">Bags</option>
                        <option value="kg">Kilogram (kg)</option>
                        <option value="pieces">Square Yards</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantity(item.id, e.target.value)
                        }
                      />
                    </td>

                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="footer-section">
            <button className="service-btn" onClick={handleAddService}>
              + Add Service
            </button>

            <div className="amount-box">
              <label>Total Amount : ₹</label>

              <input type="number" />
            </div>

            <div className="buttons">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>

              <button className="add-btn" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTankyProduct;
