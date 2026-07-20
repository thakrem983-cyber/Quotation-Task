import React from "react";
function EditProductModal({
  show,
  handleClose,
  selectedProduct,
  setSelectedProduct,
  updateProduct,
}) {
  if (!show || !selectedProduct) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>

            <button className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>

              <input
                type="text"
                className="form-control"
                name="productName"
                value={selectedProduct.productName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                className="form-control"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Unit</label>

              <input
                type="text"
                className="form-control"
                name="unit"
                value={selectedProduct.unit}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>

              <input
                type="number"
                className="form-control"
                name="quantity"
                value={selectedProduct.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>

            <button
              className="btn btn-warning text-white"
              onClick={updateProduct}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
