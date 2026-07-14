import { useState } from "react";
import "./AddProductItems.css";
import { FaSearch } from "react-icons/fa";

function AddProductItems() {
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(true);
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (!isOpen) {
    return null;
  }

  const handleCancel = () => {
    alert("Cancel Successfully");
    setIsOpen(false);
  };

  const handleAdd = () => {
    alert("Product Added Successfully");
    setIsOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <div className="header">
          <h3>Add product items</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
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
                        defaultValue="0"
                        min="0"
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
                        defaultValue="0"
                        min="0"
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
                        defaultValue="0"
                        min="0"
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
                        defaultValue="0"
                        min="0"
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
                        defaultValue="0"
                        min="0"
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
