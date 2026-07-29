import "./AddTankyProduct.css";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import api from "../api/api";

function AddTankyProduct({
  closeModal,
  openAddService,
  products: mainProducts,
  setProducts,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [tankyProducts, setTankyProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      console.log("API Response:", res.data);

      const formattedProducts = res.data.data.map((product) => ({
        id: product._id,
        image: product.image,
        name: product.productName,
        productCode: product.productCode,
        category: product.category,
        unit: product.unit,
        quantity: 0,
        price: product.price,
        description: product.description || "-",
        checked: false,
      }));

      console.log("Formatted Products:", formattedProducts);

      setTankyProducts(formattedProducts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    setSelectAll(checked);

    const updatedProducts = tankyProducts.map((item) => ({
      ...item,
      checked: checked,
    }));

    setTankyProducts(updatedProducts);
  };

  const handleQuantity = (id, value) => {
    const qty = Number(value);

    const updatedProducts = tankyProducts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: qty,
          checked: qty > 0,
        };
      }
      return item;
    });

    setTankyProducts(updatedProducts);
    setSelectAll(updatedProducts.every((item) => item.checked));
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleAdd = () => {
    const selectedProducts = tankyProducts
      .filter((item) => item.checked && item.quantity > 0)
      .map((item) => ({
        id: item.id,
        productId: item.id,
        productName: item.name,

        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
        amount: item.price * item.quantity,
        isEditing: false,
      }));

    setProducts([...mainProducts, ...selectedProducts]);
    closeModal();
  };

  const handleAddService = () => {
    openAddService();
  };

  const handleUnit = (id, value) => {
    const updatedProducts = tankyProducts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          unit: value,
        };
      }

      return item;
    });

    setTankyProducts(updatedProducts);
  };

  const filteredProducts = tankyProducts.filter((item) => {
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());

    const categoryMatch = category === "" || item.category?.includes(category);

    return searchMatch && categoryMatch;
  });

  const categories = [
    ...new Set(tankyProducts.flatMap((item) => item.category || [])),
  ];

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

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
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
                          const updatedProducts = tankyProducts.map(
                            (product) =>
                              product.id === item.id
                                ? {
                                    ...product,
                                    checked: !product.checked,
                                    quantity: !product.checked ? 1 : 0, // checked => 1, unchecked => 0
                                  }
                                : product,
                          );

                          setTankyProducts(updatedProducts);

                          setSelectAll(
                            updatedProducts.every((product) => product.checked),
                          );
                        }}
                      />
                    </td>

                    <td className="product-name">
                      <img
                        src={
                          item.image // ✅ SAHI: yahan 'item' aayega
                            ? item.image
                            : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='45' height='45'%3E%3Crect width='45' height='45' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23333333'%3ENo Img%3C/text%3E%3C/svg%3E"
                        }
                        alt={item.name}
                        width={35}
                        height={35}
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35'%3E%3Crect width='35' height='35' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='8' fill='%23333333'%3ENo Img%3C/text%3E%3C/svg%3E";
                        }}
                      />

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
