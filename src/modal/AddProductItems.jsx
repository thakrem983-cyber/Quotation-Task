import { useState } from "react";
import "./AddProductItems.css";
import { FaSearch } from "react-icons/fa";

// function AddProductItems({ closeModal }) {
function AddProductItems({ closeModal, products: mainProducts, setProducts }) {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const [selectAll, setSelectAll] = useState(false);

  const [checkedRows, setCheckedRows] = useState({
    row1: false,
    row2: false,
    row3: false,
    row4: false,
    row5: false,
  });

  const products = [
    {
      id: 1,
      name: "Test Product45",
      code: "DH00012",
      category: "Electronics",
      price: 5000,
      unit: "bags",
    },
    {
      id: 2,
      name: "Roofing Materials",
      code: "DH00001",
      category: "Roofing Materials",
      price: 100000,
      unit: "kilogram",
    },
    {
      id: 3,
      name: "Tiles",
      code: "DH00025",
      category: "Tiles",
      price: 3000,
      unit: "pcs",
    },
  ];

  const [quantities, setQuantities] = useState({
    row1: 0,
    row2: 0,
    row3: 0,
    row4: 0,
    row5: 0,
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCancel = () => {
    closeModal();
  };

  const handleAdd = () => {
    const newProducts = [];

    if (checkedRows.row1 && Number(quantities.row1) > 0) {
      newProducts.push({
        id: Date.now() + 1,
        productName: "Test Product45",
        code: "DH00012",
        unit: "bags",
        price: 5000,
        quantity: Number(quantities.row1),
        amount: 5000 * Number(quantities.row1),
        isEditing: false,
      });
    }

    if (checkedRows.row2 && Number(quantities.row2) > 0) {
      newProducts.push({
        id: Date.now() + 2,
        productName: "Roofing materials",
        code: "DH0001",
        unit: "kilogram (kg)",
        price: 100000,
        quantity: Number(quantities.row2),
        amount: 100000 * Number(quantities.row2),
        isEditing: false,
      });
    }

    if (checkedRows.row3 && Number(quantities.row3) > 0) {
      newProducts.push({
        id: Date.now() + 3,
        productName: "Test Product23",
        code: "PROD046",
        unit: "bags",
        price: 20000,
        quantity: Number(quantities.row3),
        amount: 20000 * Number(quantities.row3),
        isEditing: false,
      });
    }

    if (checkedRows.row4 && Number(quantities.row4) > 0) {
      newProducts.push({
        id: Date.now() + 4,
        productName: "Test Product",
        code: "PROD048",
        unit: "Square Yards",
        price: 20000,
        quantity: Number(quantities.row4),
        amount: 20000 * Number(quantities.row4),
        isEditing: false,
      });
    }

    if (checkedRows.row5 && Number(quantities.row5) > 0) {
      newProducts.push({
        id: Date.now() + 5,
        productName: "Product1",
        code: "DH0005",
        unit: "bags",
        price: 1000,
        quantity: Number(quantities.row5),
        amount: 1000 * Number(quantities.row5),
        isEditing: false,
      });
    }

    setProducts([...mainProducts, ...newProducts]);

    closeModal();
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
          <table className="product-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => {
                      const checked = e.target.checked;

                      setSelectAll(checked);

                      setCheckedRows({
                        row1: checked,
                        row2: checked,
                        row3: checked,
                        row4: checked,
                        row5: checked,
                      });
                    }}
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
              {("Test Product45".toLowerCase().includes(search.toLowerCase()) ||
                search === "") &&
                (category === "" ||
                  "Electronics, Tiles".includes(category)) && (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedRows.row1}
                        onChange={(e) =>
                          setCheckedRows({
                            ...checkedRows,
                            row1: e.target.checked,
                          })
                        }
                      />
                    </td>

                    <td>
                      <div className="product-info">
                        <img
                          src="src/assets/paragliding.jpg"
                          alt=""
                          className="product-img"
                        />
                        <span>Test Product45</span>
                      </div>
                    </td>

                    <td>DH00012</td>
                    <td>Electronics, Tiles</td>
                    <td>₹5,000</td>

                    <td>
                      <select className="unit-select">
                        <option>bags</option>
                        <option>kilogram (kg)</option>
                        <option>Square Yards</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantities.row1}
                        min="0"
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            row1: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                )}

              {("Roofing materials"
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                search === "") &&
                (category === "" || "Roofing Materials".includes(category)) && (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedRows.row2}
                        onChange={(e) =>
                          setCheckedRows({
                            ...checkedRows,
                            row2: e.target.checked,
                          })
                        }
                      />
                    </td>

                    <td>
                      <div className="product-info">
                        <img
                          src="src/assets/paragliding.jpg"
                          alt=""
                          className="product-img"
                        />
                        <span>Roofing materials</span>
                      </div>
                    </td>

                    <td>DH0001</td>
                    <td>Roofing Materials</td>
                    <td>₹1,00,000</td>

                    <td>
                      <select className="unit-select">
                        <option>kilogram (kg)</option>
                        <option>bags</option>
                        <option>Square Yards</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantities.row2}
                        min="0"
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            row2: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                )}

              {("Test Product23".toLowerCase().includes(search.toLowerCase()) ||
                search === "") &&
                (category === "" || "Roofing Sheets".includes(category)) && (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedRows.row3}
                        onChange={(e) =>
                          setCheckedRows({
                            ...checkedRows,
                            row3: e.target.checked,
                          })
                        }
                      />
                    </td>

                    <td>
                      <div className="product-info">
                        <img
                          src="src/assets/paragliding.jpg"
                          alt=""
                          className="product-img"
                        />
                        <span>Test Product23</span>
                      </div>
                    </td>

                    <td>PROD046</td>
                    <td>Roofing Sheets</td>
                    <td>₹20,000</td>

                    <td>
                      <select className="unit-select">
                        <option>bags</option>
                        <option>kilogram (kg)</option>
                        <option>Square Yards</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantities.row3}
                        min="0"
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            row3: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                )}

              {("Test Product".toLowerCase().includes(search.toLowerCase()) ||
                search === "") &&
                (category === "" ||
                  "belt, Tiles, Roofing sheets".includes(category)) && (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedRows.row4}
                        onChange={(e) =>
                          setCheckedRows({
                            ...checkedRows,
                            row4: e.target.checked,
                          })
                        }
                      />
                    </td>

                    <td>
                      <div className="product-info">
                        <img
                          src="src/assets/paragliding.jpg"
                          alt=""
                          className="product-img"
                        />
                        <span>Test Product</span>
                      </div>
                    </td>

                    <td>PROD048</td>
                    <td>belt, Tiles, Roofing sheets</td>
                    <td>₹20,000</td>

                    <td>
                      <select className="unit-select">
                        <option>Square Yards</option>
                        <option>kilogram (kg)</option>
                        <option>bags</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantities.row4}
                        min="0"
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            row4: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                )}

              {("Product1".toLowerCase().includes(search.toLowerCase()) ||
                search === "") &&
                (category === "" ||
                  "Electronics, TOOL, BASE".includes(category)) && (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedRows.row5}
                        onChange={(e) =>
                          setCheckedRows({
                            ...checkedRows,
                            row5: e.target.checked,
                          })
                        }
                      />
                    </td>

                    <td>
                      <div className="product-info">
                        <img
                          src="src/assets/paragliding.jpg"
                          alt=""
                          className="product-img"
                        />
                        <span>Product1</span>
                      </div>
                    </td>

                    <td>DH0005</td>
                    <td>Electronics, TOOL, BASE</td>
                    <td>₹1,000</td>

                    <td>
                      <select className="unit-select">
                        <option>bags</option>
                        <option>kilogram (kg)</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantities.row5}
                        min="0"
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            row5: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
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