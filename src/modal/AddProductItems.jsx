import { useState, useEffect } from "react";
import "./AddProductItems.css";
import { FaSearch } from "react-icons/fa";
import api from "../api/api";

function AddProductItems({ closeModal, products: mainProducts, setProducts }) {

  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);


  const [checkedRows, setCheckedRows] = useState({});
  const [quantities, setQuantities] = useState({});


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        const data = response.data.data || response.data || [];
        setBackendProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const filteredProducts = backendProducts.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.productCode.toLowerCase().includes(search.toLowerCase());

    const categoryString = Array.isArray(product.category)
      ? product.category.join(", ")
      : (product.category || "");

    const matchesCategory =
      category === "" || categoryString.toLowerCase().includes(category.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleCancel = () => {
    closeModal();
  };

  const handleAdd = () => {
    const newProducts = [];

    filteredProducts.forEach((product) => {
      const isChecked = checkedRows[product._id];
      const qty = quantities[product._id] || 0;

      if (isChecked && Number(qty) > 0) {
        newProducts.push({
          id: Date.now() + Math.random(),
          productName: product.productName,
          code: product.productCode,
          unit: product.unit,
          price: product.price,
          quantity: Number(qty),
          amount: product.price * Number(qty),
          isEditing: false,
          image: product.image || null,
        });
      }
    });

    if (newProducts.length === 0) {
      alert("plz select the product");
      return;
    }

    setProducts([...mainProducts, ...newProducts]);
    closeModal();
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    const newCheckedRows = {};
    const newQuantities = {};

    filteredProducts.forEach((p) => {
      newCheckedRows[p._id] = isChecked;
      newQuantities[p._id] = isChecked ? 1 : 0;
    });

    setCheckedRows(newCheckedRows);
    setQuantities(newQuantities);
  };
  return (
    <div className="modal">
      <div className="modal-box">
        <div className="header">
          <h3>Add product items</h3>
          <button className="close-btn" onClick={closeModal}>
            ✕
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
            className="category-dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Roofing Materials">Roofing Materials</option>
            <option value="Roofing Sheets">Roofing Sheets</option>
            <option value="Tiles">Tiles</option>
            <option value="TOOL">TOOL</option>
          </select>
        </div>

        <div className="table-container">
          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Loading products from backend...</p>
          ) : (
            <table className="product-table">
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
                  <th>CODE</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>UNIT</th>
                  <th>QUANTITY</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedRows[product._id] || false}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          setCheckedRows((prev) => ({
                            ...prev,
                            [product._id]: checked,
                          }));

                          setQuantities((prev) => ({
                            ...prev,
                            [product._id]: checked
                              ? (prev[product._id] || 1) 
                              : 0,                       
                          }));
                        }}
                      />
                    </td>

                    <td>
                      <div className="product-info">
                        {product.image ? (
                          <img src={product.image} alt={product.productName} className="product-img" />
                        ) : (
                          <div className="product-img-placeholder"></div>
                        )}
                        <span>{product.productName}</span>
                      </div>
                    </td>

                    <td>{product.productCode}</td>

                    <td>
                      {Array.isArray(product.category)
                        ? product.category.join(", ")
                        : product.category}
                    </td>

                    <td>₹{product.price}</td>

                    <td>
                      <select
                        className="unit-select"
                        value={product.unit}
                        disabled
                      >
                        <option value={product.unit}>{product.unit}</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantities[product._id] || 0}
                        min="0"
                        onChange={(e) =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product._id]: Number(e.target.value),
                          }))
                        }
                      />
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="footer">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default AddProductItems;