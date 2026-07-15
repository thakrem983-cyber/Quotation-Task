import ProductTable from "./ProductTable";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Section.css";
import EditProductModal from "./EditProductModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddProductItems from "./AddProductItems";
import CustomerService from "./CustomerService";
import AddTankyProduct from "./AddTankyProduct";
import AddService from "./AddService";

function ProductSection({
  products,
  setProducts,
  summary,
  setSummary,
  formData,
  setValidateProducts,
  isView = false,
}) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCustomerServiceModal, setShowCustomerServiceModal] =
    useState(false);
  const [showAddTankyProductModal, setShowAddTankyProductModal] =
    useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const [selectionMode, setSelectionMode] = useState(null); 

 
  useEffect(() => {
    if (products.length === 0) {
      setSelectionMode(null);
    }
  }, [products]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        productName: "",
        code: "",
        unit: "",
        price: 0,
        quantity: 1,
        amount: 0,
        isEditing: true,
        image: null,
      },
    ]);
  };
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };
  const editProduct = (id) => {
    const product = products.find((p) => p.id === id);

    setSelectedProduct({ ...product });

    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const updateProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...selectedProduct,
            amount:
              Number(selectedProduct.price) * Number(selectedProduct.quantity),
          }
        : product,
    );

    setProducts(updatedProducts);

    handleClose();
  };
  const saveProduct = (id) => {
    const product = products.find((p) => p.id === id);

    let newErrors = {};

    if (!product.productName.trim()) {
      newErrors.productName = "Product Name is required";
    }

    if (!product.code.trim()) {
      newErrors.code = "Code is required";
    }

    if (!product.unit.trim()) {
      newErrors.unit = "Unit is required";
    }

    if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (Number(product.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, isEditing: false } : p,
    );

    setProducts(updatedProducts);
  };
  const validateAllProducts = () => {
    for (let product of products) {
      if (
        !product.productName.trim() ||
        !product.code.trim() ||
        !product.unit.trim() ||
        Number(product.price) <= 0 ||
        Number(product.quantity) <= 0
      ) {
        alert("Please complete product details");
        return false;
      }

      if (product.isEditing) {
        alert("Please save product details first");
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (setValidateProducts) {
      setValidateProducts(() => validateAllProducts);
    }
  }, [products, setValidateProducts]);

  const productsTotal = products.reduce((total, product) => {
    return total + product.amount;
  }, 0);
  const discountAmount = (productsTotal * summary.discount) / 100;

  const taxableAmount = productsTotal - discountAmount;

  const cgstAmount =
    formData.quotationType === "Cash"
      ? 0
      : (taxableAmount * summary.cgst) / 100;

  const sgstAmount =
    formData.quotationType === "Cash"
      ? 0
      : (taxableAmount * summary.sgst) / 100;

  const otherAmount = (taxableAmount * summary.other) / 100;

  const finalAmount = taxableAmount + cgstAmount + sgstAmount + otherAmount;

  return (
    <>
      <div className=" mt-4">
        <hr />
        <ProductTable
          products={products}
          setProducts={setProducts}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
          saveProduct={saveProduct}
          errors={errors}
          isView={isView}
        />
        <hr />
        <EditProductModal
          show={showModal}
          handleClose={handleClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          updateProduct={updateProduct}
        />
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex gap-2">
              
             
              <button
                className="custom-btn"
                onClick={() => {
                  setSelectionMode("regular");
                  setShowAddProductModal(true);
                }}
                disabled={isView || selectionMode === "tanky"}
                style={{
                  opacity: isView || selectionMode === "tanky" ? 0.4 : 1,
                  cursor: isView || selectionMode === "tanky" ? "not-allowed" : "pointer",
                  transition: "opacity 0.3s ease"
                }}
              >
                <FaPlusCircle className="text-warning me-2" />
                Add Product Items
              </button>

             
              <button
                className="custom-btn"
                onClick={() => {
                  setSelectionMode("regular");
                  setShowCustomerServiceModal(true);
                }}
                disabled={isView || selectionMode === "tanky"}
                style={{
                  opacity: isView || selectionMode === "tanky" ? 0.4 : 1,
                  cursor: isView || selectionMode === "tanky" ? "not-allowed" : "pointer",
                  transition: "opacity 0.3s ease"
                }}
              >
                <FaPlusCircle className="text-warning me-2" />
                Custom Service
              </button>

              
              <button
                className="custom-btn"
                onClick={() => {
                  setSelectionMode("tanky");
                  setShowAddTankyProductModal(true);
                }}
                disabled={isView || selectionMode === "regular"}
                style={{
                  opacity: isView || selectionMode === "regular" ? 0.4 : 1,
                  cursor: isView || selectionMode === "regular" ? "not-allowed" : "pointer",
                  transition: "opacity 0.3s ease"
                }}
              >
                <FaPlusCircle className="text-warning me-2" />
                Add Tanky Product
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary">Products Total</span>
                  <strong>₹ {productsTotal.toFixed(2)}</strong>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary">Discount</span>

                  <div className="input-group" style={{ width: "90px" }}>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={summary.discount}
                      disabled={isView}
                      onChange={(e) =>
                        setSummary({
                          ...summary,
                          discount: Number(e.target.value),
                        })
                      }
                    />
                    <span className="input-group-text">%</span>
                  </div>

                  <span className="text-danger fw-semibold">
                    - ₹ {discountAmount.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary">CGST</span>

                  <div className="input-group" style={{ width: "90px" }}>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={
                        formData.quotationType === "Cash" ? 0 : summary.cgst
                      }
                      disabled={isView || formData.quotationType === "Cash"}
                      onChange={(e) =>
                        setSummary({
                          ...summary,
                          cgst: Number(e.target.value),
                        })
                      }
                    />
                    <span className="input-group-text">%</span>
                  </div>

                  <span className="text-success fw-semibold">
                    + ₹ {cgstAmount.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary">SGST</span>

                  <div className="input-group" style={{ width: "90px" }}>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={
                        formData.quotationType === "Cash" ? 0 : summary.sgst
                      }
                      disabled={isView || formData.quotationType === "Cash"}
                      onChange={(e) =>
                        setSummary({
                          ...summary,
                          sgst: Number(e.target.value),
                        })
                      }
                    />
                    <span className="input-group-text">%</span>
                  </div>

                  <span className="text-success fw-semibold">
                    + ₹ {sgstAmount.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="text-secondary">Other</span>

                  <div className="input-group" style={{ width: "90px" }}>
                    <input
                      type="number"
                      className="form-control text-center"
                      disabled={isView}
                      value={summary.other}
                      onChange={(e) =>
                        setSummary({
                          ...summary,
                          other: Number(e.target.value),
                        })
                      }
                    />
                    <span className="input-group-text">%</span>
                  </div>

                  <span className="text-success fw-semibold">
                    + ₹ {otherAmount.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <h5>Total Amount</h5>
                  <h5>₹ {finalAmount.toFixed(2)}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddProductModal && (
        <AddProductItems closeModal={() => setShowAddProductModal(false)} />
      )}
      {showCustomerServiceModal && (
        <CustomerService
          closeModal={() => setShowCustomerServiceModal(false)}
        />
      )}
      {showAddServiceModal && (
        <AddService closeModal={() => setShowAddServiceModal(false)} />
      )}
      {showAddTankyProductModal && (
        <AddTankyProduct
          closeModal={() => setShowAddTankyProductModal(false)}
          openAddService={() => {
            setShowAddTankyProductModal(false);
            setShowAddServiceModal(true);
          }}
        />
      )}
    </>
  );
}

export default ProductSection;