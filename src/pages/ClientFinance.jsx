import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa"; 
import { Country, State, City } from "country-state-city";

// Sabhi Modals Import Karo
import AddProductModal from "../modal/AddProductModal";
import AddCustomServiceModal from "../modal/AddCustomServiceModal";
import AddTankyProductModal from "../modal/AddTankyProductModal";
import AddCreditModal from "../modal/AddCreditModal";
import AddDebitModal from "../modal/AddDebitModal";

function ClientFinance() {
  const navigate = useNavigate();

  // --- Form States ---
  const [quotationType, setQuotationType] = useState("GST");
  const [quotationNo, setQuotationNo] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  
  const [selectedCountry, setSelectedCountry] = useState("IN"); 
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  
  const [gstin, setGstin] = useState("12ABCDE1234F1Z5");
  const [subject, setSubject] = useState("");
  const [project, setProject] = useState("");
  const [notes, setNotes] = useState("");

  const [productMode, setProductMode] = useState(null); 

  // --- Table States ---
  const [products, setProducts] = useState([]);
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);

  // --- Modals Visibility ---
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false); 
  const [showTankyModal, setShowTankyModal] = useState(false); 
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showDebitModal, setShowDebitModal] = useState(false);

  // --- Auto Reset Logic ---
  useEffect(() => {
    if (products.length === 0) {
      setProductMode(null);
    }
  }, [products]);

  // --- Universal Add Logic ---
  const handleAddItems = (newItems) => {
    const formattedItems = newItems.map((item) => ({
      image: item.image || null,
      name: item.name || item.serviceName || "-",
      code: item.code || "-",
      unit: item.unit || "-",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
    }));
    setProducts([...products, ...formattedItems]);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // --- Calculations ---
  const productsTotal = products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const [discountPct, setDiscountPct] = useState("");
  const [cgstPct, setCgstPct] = useState("9");
  const [sgstPct, setSgstPct] = useState("9");
  const [otherPct, setOtherPct] = useState("");

  const discountAmt = productsTotal * (Number(discountPct) / 100);
  const taxableAmount = productsTotal - discountAmt;
  const cgstAmt = taxableAmount * (Number(cgstPct) / 100);
  const sgstAmt = taxableAmount * (Number(sgstPct) / 100);
  const otherAmt = taxableAmount * (Number(otherPct) / 100);
  const finalTotalAmount = taxableAmount + cgstAmt + sgstAmt + otherAmt;

  const totalCredits = credits.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalDebits = debits.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const profit = totalCredits - totalDebits;

  // --- Styles ---
  const orangeBtnStyle = { backgroundColor: "#f58c22", color: "white", border: "none" };
  const orangeOutlineBtnStyle = { backgroundColor: "transparent", color: "#f58c22", border: "1px solid #f58c22" };

  return (
    <div className="container-fluid py-4 bg-white" style={{ minHeight: "100vh", fontSize: "14px" }}>
      
      {/* Header */}
      <div className="d-flex align-items-center mb-2">
        <FaArrowLeft className="me-2 text-dark" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        <h4 className="fw-bold mb-0 text-dark">Add client finance</h4>
      </div>
      <p className="text-danger mb-4 fw-medium">⚠ Please approve quotation before creating client finance</p>

      {/* --- Form Section --- */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <label className="form-label fw-bold">Quotation No <span className="text-danger">*</span></label>
          <div className="input-group">
            <select className="form-select" style={{ maxWidth: "80px" }} value={quotationType} onChange={(e) => setQuotationType(e.target.value)}>
              <option>GST</option><option>CASH</option>
            </select>
            <select className="form-select" value={quotationNo} onChange={(e) => setQuotationNo(e.target.value)}>
              <option value="">Select quotation</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Client Name <span className="text-danger">*</span></label>
          <input type="text" className="form-control" placeholder="Enter client name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Date <span className="text-danger">*</span></label>
          <input type="date" className="form-control shadow-none" value={date} onChange={(e) => setDate(e.target.value)} style={{ cursor: "pointer" }} />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">Phone</label>
          <div className="input-group">
            <select className="form-select" style={{ maxWidth: "90px" }} value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}><option>🇮🇳 +91</option></select>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="col-md-8">
          <label className="form-label fw-bold">Email</label>
          <input type="email" className="form-control" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="col-md-8">
          <label className="form-label fw-bold">Address</label>
          <input type="text" className="form-control" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Pincode</label>
          <input type="text" className="form-control" placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </div>

        {/* Location Dropdowns */}
        <div className="col-md-4">
          <label className="form-label fw-bold">Country</label>
          <select className="form-select shadow-none" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(""); setSelectedCity(""); }}>
            <option value="">Select Country</option>
            {Country.getAllCountries().map((country) => <option key={country.isoCode} value={country.isoCode}>{country.name}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">State</label>
          <select className="form-select shadow-none" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(""); }} disabled={!selectedCountry}>
            <option value="">Select State</option>
            {State.getStatesOfCountry(selectedCountry).map((state) => <option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">City</label>
          <select className="form-select shadow-none" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
            <option value="">Select City</option>
            {City.getCitiesOfState(selectedCountry, selectedState).map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">GSTIN</label>
          <input type="text" className="form-control" value={gstin} onChange={(e) => setGstin(e.target.value)} />
        </div>
        <div className="col-md-8">
          <label className="form-label fw-bold">Subject <span className="text-danger">*</span></label>
          <input type="text" className="form-control" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Project</label>
          <select className="form-select" value={project} onChange={(e) => setProject(e.target.value)}><option value="">Select Project</option></select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Notes</label>
          <textarea className="form-control" rows="2" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
      </div>

      {/* --- Products Section --- */}
      <div className="mb-5">
        <h5 className="fw-bold mb-3">Products <span className="text-danger">*</span></h5>
        <div className="table-responsive mb-3">
          <table className="table align-middle" style={{ border: "1px solid #dee2e6" }}>
            <thead style={{ backgroundColor: "#f8f9fc", color: "#495057", fontSize: "13px" }}>
              <tr>
                <th className="py-3 text-center">S.NO</th>
                <th className="py-3">IMAGE</th>
                <th className="py-3">PRODUCT NAME</th>
                <th className="py-3">CODE</th>
                <th className="py-3">UNIT</th>
                <th className="py-3 text-end">PRICE</th>
                <th className="py-3 text-center">QUANTITY</th>
                <th className="py-3 text-end">AMOUNT</th>
                <th className="py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="9" className="text-center py-4 text-muted fw-bold">No products added</td></tr>
              ) : (
                products.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.image ? <img src={item.image} alt="product" style={{ width: "40px", borderRadius: "4px" }} /> : "-"}</td>
                    <td className="fw-medium">{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.unit}</td>
                    <td className="text-end">₹{item.price}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end fw-bold">₹{item.price * item.quantity}</td>
                    <td className="text-center"><FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => deleteProduct(index)} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Buttons & Calculations Container */}
        <div className="row g-4">
          <div className="col-md-7 d-flex gap-2 align-items-start">
            
            <button className="btn btn-light border fw-bold text-dark d-flex align-items-center" disabled={productMode === "tanky"} onClick={() => { setProductMode("standard"); setShowProductModal(true); }}>
              <FaPlus className="me-2 text-warning" /> Add product items
            </button>

            <button className="btn btn-light border fw-bold text-dark d-flex align-items-center" disabled={productMode === "tanky"} onClick={() => { setProductMode("standard"); setShowCustomModal(true); }}>
              <FaPlus className="me-2 text-warning" /> Custom Service
            </button>

            <button className="btn btn-light border fw-bold text-dark d-flex align-items-center" disabled={productMode === "standard"} onClick={() => { setProductMode("tanky"); setShowTankyModal(true); }}>
              <FaPlus className="me-2 text-warning" /> Add Tanky Product Items
            </button>
          </div>

          <div className="col-md-5">
             <div className="bg-light p-4 rounded border">
                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Products total</span><span className="fw-bold text-dark">₹ {productsTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
                <span>Discount</span>
                <div className="d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm" style={{ width: "80px" }}>
                    <input type="number" className="form-control" value={discountPct} onChange={(e) => setDiscountPct(e.target.value)} />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span className="text-danger fw-bold" style={{ width: "60px", textAlign: "right" }}>- ₹ {discountAmt.toFixed(2)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
                <span>CGST</span>
                <div className="d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm" style={{ width: "80px" }}>
                    <input type="number" className="form-control" value={cgstPct} onChange={(e) => setCgstPct(e.target.value)} />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span className="text-success fw-bold" style={{ width: "60px", textAlign: "right" }}>+ ₹ {cgstAmt.toFixed(2)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
                <span>SGST</span>
                <div className="d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm" style={{ width: "80px" }}>
                    <input type="number" className="form-control" value={sgstPct} onChange={(e) => setSgstPct(e.target.value)} />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span className="text-success fw-bold" style={{ width: "60px", textAlign: "right" }}>+ ₹ {sgstAmt.toFixed(2)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
                <span>Other</span>
                <div className="d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm" style={{ width: "80px" }}>
                    <input type="number" className="form-control" value={otherPct} onChange={(e) => setOtherPct(e.target.value)} />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span className="text-success fw-bold" style={{ width: "60px", textAlign: "right" }}>+ ₹ {otherAmt.toFixed(2)}</span>
                </div>
              </div>
                <div className="d-flex justify-content-between border-top pt-2 mt-2">
                  <span className="fw-bold text-dark fs-6">Total Amount</span>
                  <span className="fw-bold text-dark fs-6">₹ {finalTotalAmount.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="fw-bold mb-3">Total Credits</h5>
        <div className="table-responsive mb-3">
          <table className="table align-middle" style={{ border: "1px solid #dee2e6" }}>
            <thead style={{ backgroundColor: "#f8f9fc", color: "#495057", fontSize: "13px" }}>
              <tr>
                <th className="py-3 px-3" width="50"><input type="checkbox" className="form-check-input" /></th>
                <th className="py-3">DATE</th>
                <th className="py-3">AMOUNT</th>
                <th className="py-3">NAME</th>
                <th className="py-3">PAYMENT MODE</th>
                <th className="py-3">TRANSACTION ID</th>
                <th className="py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="7" className="text-center py-3 text-muted fw-bold">No credits added yet.</td></tr>
            </tbody>
          </table>
        </div>
        <button className="btn px-4 fw-bold" style={orangeBtnStyle} onClick={() => setShowCreditModal(true)}>
          + Add Credit
        </button>
      </div>

      {/* --- Total Debits Section --- */}
      <div className="mb-5">
        <h5 className="fw-bold mb-3">Total Debits</h5>
        <div className="table-responsive mb-3">
          <table className="table align-middle" style={{ border: "1px solid #dee2e6" }}>
            <thead style={{ backgroundColor: "#f8f9fc", color: "#495057", fontSize: "13px" }}>
              <tr>
                <th className="py-3 px-3" width="50"><input type="checkbox" className="form-check-input" /></th>
                <th className="py-3">DATE</th>
                <th className="py-3">PURPOSE</th>
                <th className="py-3">AMOUNT</th>
                <th className="py-3">PAID BY</th>
                <th className="py-3">BENEFICIARY NAME</th>
                <th className="py-3">PAYMENT MODE</th>
                <th className="py-3">TRANSACTION ID</th>
                <th className="py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="9" className="text-center py-3 text-muted fw-bold">No debits added yet.</td></tr>
            </tbody>
          </table>
        </div>
        <button className="btn px-4 fw-bold" style={orangeBtnStyle} onClick={() => setShowDebitModal(true)}>
          + Add Debit
        </button>
      </div>

      <div className="card shadow-sm border mt-4">
        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3 bg-light">
          <div className="d-flex gap-5 fw-bold" style={{ fontSize: "15px" }}>
            <span>Total Credits: <span className="text-success">₹{totalCredits.toFixed(2)}</span></span>
            <span style={{ borderLeft: "2px solid #ddd", paddingLeft: "30px" }}>Total Debits: <span className="text-danger">₹{totalDebits.toFixed(2)}</span></span>
            <span style={{ borderLeft: "2px solid #ddd", paddingLeft: "30px" }}>Profit: <span className="text-primary">₹{profit.toFixed(2)}</span></span>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-end gap-3 mt-4 mb-5">
        <button className="btn px-5 fw-bold" style={orangeOutlineBtnStyle} onClick={() => navigate(-1)}>Cancel</button>
        <button className="btn px-5 fw-bold" style={orangeBtnStyle} onClick={() => alert("Client Finance Created!")}>Create</button>
      </div>
      
      {/* Modals Mapping */}
      {showProductModal && <AddProductModal onClose={() => setShowProductModal(false)} onAdd={handleAddItems} />}
      {showCustomModal && <AddCustomServiceModal onClose={() => setShowCustomModal(false)} onAdd={handleAddItems} />}
      {showTankyModal && <AddTankyProductModal onClose={() => setShowTankyModal(false)} onAdd={handleAddItems} />}

      {/* NAYE MODALS JO RENDER NAHI HO RAHE THE */}
      <AddCreditModal 
        show={showCreditModal} 
        handleClose={() => setShowCreditModal(false)} 
      />
      <AddDebitModal 
        show={showDebitModal} 
        handleClose={() => setShowDebitModal(false)} 
      />

    </div>
  );
}

export default ClientFinance;