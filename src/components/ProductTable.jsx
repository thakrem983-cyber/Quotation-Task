import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import "./product.css";

function ProductTable({
  products,
  setProducts,
  deleteProduct,
  editProduct,
  saveProduct,
  errors,
  isView = false,
}) {
  const handleChange = (id, e) => {
    const { name, value, files } = e.target;

    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = {
          ...product,
          [name]: name === "image" ? files[0] : value,
        };

        updatedProduct.amount =
          Number(updatedProduct.price) * Number(updatedProduct.quantity);

        return updatedProduct;
      }

      return product;
    });

    setProducts(updatedProducts);
  };

  return (
    <div className="mt-4">
      <h5 className="mb-3 fw-semibold">Products</h5>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>S.NO</th>
              <th>IMAGE</th>
              <th>PRODUCT NAME</th>
              <th>CODE</th>
              <th>UNIT</th>
              <th>PRICE</th>
              <th>QUNTITY</th>
              <th>AMOUNT</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>

                <td>
                  {product.isEditing ? (
                    <div className="text-center">
                      <label
                        htmlFor={`image-${product.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        {product.image ? (
                          <img
                            src={URL.createObjectURL(product.image)}
                            alt="Product"
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "45px",
                              height: "45px",
                              background: "#efefef",
                              borderRadius: "8px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              margin: "auto",
                              fontSize: "20px",
                              color: "#999",
                            }}
                          >
                            +
                          </div>
                        )}
                      </label>

                      <input
                        id={`image-${product.id}`}
                        type="file"
                        accept="image/*"
                        name="image"
                        className="d-none"
                        onChange={(e) => handleChange(product.id, e)}
                        disabled={isView}
                      />
                      {errors.image && (
                        <div className="text-danger small mt-1">
                          {errors.image}
                        </div>
                      )}
                    </div>
                  ) : product.image ? (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Product"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        background: "#efefef",
                        borderRadius: "8px",
                        margin: "auto",
                      }}
                    ></div>
                  )}
                </td>

                <td>
                  {product.isEditing ? (
                    <>
                      <input
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.productName ? "is-invalid" : ""
                        }`}
                        name="productName"
                        value={product.productName}
                        onChange={(e) => handleChange(product.id, e)}
                        disabled={isView}
                      />

                      {errors.productName && (
                        <div className="invalid-feedback">
                          {errors.productName}
                        </div>
                      )}
                    </>
                  ) : (
                    product.productName || "-"
                  )}
                </td>

                <td>
                  {product.isEditing ? (
                    <>
                      <input
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.code ? "is-invalid" : ""
                        }`}
                        name="code"
                        value={product.code}
                        onChange={(e) => handleChange(product.id, e)}
                        disabled={isView}
                      />

                      {errors.code && (
                        <div className="invalid-feedback">{errors.code}</div>
                      )}
                    </>
                  ) : (
                    product.code || "-"
                  )}
                </td>

                <td>
                  {product.isEditing ? (
                    <>
                      <input
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.unit ? "is-invalid" : ""
                        }`}
                        name="unit"
                        value={product.unit}
                        onChange={(e) => handleChange(product.id, e)}
                        disabled={isView}
                      />

                      {errors.unit && (
                        <div className="invalid-feedback">{errors.unit}</div>
                      )}
                    </>
                  ) : (
                    product.unit || "-"
                  )}
                </td>

                <td style={{ width: "120px" }}>
                  {product.isEditing ? (
                    <>
                      <input
                        type="number"
                        className={`form-control form-control-sm ${
                          errors.price ? "is-invalid" : ""
                        }`}
                        name="price"
                        value={product.price}
                        onChange={(e) => handleChange(product.id, e)}
                        disabled={isView}
                      />

                      {errors.price && (
                        <div className="invalid-feedback">{errors.price}</div>
                      )}
                    </>
                  ) : (
                    `₹${product.price}`
                  )}
                </td>
                <td style={{ width: "100px" }}>
                  {product.isEditing ? (
                    <>
                      <input
                        type="number"
                        className={`form-control form-control-sm ${
                          errors.quantity ? "is-invalid" : ""
                        }`}
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleChange(product.id, e)}
                        disabled={isView}
                      />

                      {errors.quantity && (
                        <div className="invalid-feedback">
                          {errors.quantity}
                        </div>
                      )}
                    </>
                  ) : (
                    product.quantity
                  )}
                </td>

               <td>₹{(Number(product.amount) || 0).toFixed(2)}</td>

             
                <td>
                  {!isView && (
                    <div className="d-flex justify-content-center gap-3">
                      <FaEye
                        className="text-secondary"
                        style={{ cursor: "pointer" }}
                      />

                      <FaEdit
                        className="text-warning"
                        style={{ cursor: "pointer" }}
                        onClick={() => editProduct(product.id)}
                      />

                      <FaTrash
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteProduct(product.id)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;