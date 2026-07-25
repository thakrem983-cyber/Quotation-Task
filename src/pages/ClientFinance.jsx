import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import api from "../api/api";
import "./ClientFinance.css";

import AddProductItems from "../modal/AddProductItems";
import CustomerService from "../modal/CustomerService";
import AddTankyProduct from "../modal/AddTankyProduct";
import AddCreditModal from "../modal/AddCreditModal";
import AddDebitModal from "../modal/AddDebitModal";
import AddService from "../modal/AddService";

function ClientFinance() {
  const navigate = useNavigate();
  const location = useLocation();
  const quotationData = location.state?.quotationData;

  // API & Loading States
  const [quotations, setQuotations] = useState([]);
  const [loadingQuotations, setLoadingQuotations] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
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

  // Tables Data
  const [products, setProducts] = useState([]);
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);

  // Modals Visibility
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showTankyModal, setShowTankyModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showDebitModal, setShowDebitModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // Calculation States
  const [discountPct, setDiscountPct] = useState("");
  const [cgstPct, setCgstPct] = useState("9");
  const [sgstPct, setSgstPct] = useState("9");
  const [otherPct, setOtherPct] = useState("");

  // 1. Fetch Approved Quotations List when quotationType changes
  useEffect(() => {
    fetchApprovedQuotations();
  }, [quotationType]);

  const fetchApprovedQuotations = async () => {
    try {
      setLoadingQuotations(true);
      const res = await api.get(
        `/client-finance/approved-quotations?type=${quotationType}`
      );
      setQuotations(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error fetching approved quotations:", err);
    } finally {
      setLoadingQuotations(false);
    }
  };

  // 2. Fetch specific quotation details by ID and populate form fields
  const fetchQuotationDetails = async (quotationId) => {
    if (!quotationId) return;

    try {
      const res = await api.get(`/quotations/${quotationId}`);
      const quotation = res.data?.data || res.data;

      if (quotation) {
        setClientName(quotation.clientName || quotation.name || "");
        setDate(quotation.date || new Date().toISOString().split("T")[0]);
        setSubject(quotation.subject || "");
        setNotes(quotation.notes || "");

        const rawPhone = quotation.phone || "";
        const cleanPhone = rawPhone.replace(/\D/g, "");
        setPhone(cleanPhone.slice(-10));

        setEmail(quotation.email || "");
        setAddress(quotation.address || "");
        setPincode(quotation.pincode || "");
        setGstin(quotation.gstin || "12ABCDE1234F1Z5");
        setProject(quotation.project || "");

        if (quotation.country) setSelectedCountry(quotation.country);
        if (quotation.state) setSelectedState(quotation.state);
        if (quotation.city) setSelectedCity(quotation.city);

        if (quotation.products && Array.isArray(quotation.products)) {
          handleModalSetProducts(quotation.products);
        }
      }
    } catch (err) {
      console.error("Error fetching quotation details:", err);
    }
  };

  // Dropdown Selection Handler
  const handleQuotationSelect = (eOrId) => {
    const quotationId = typeof eOrId === "string" ? eOrId : eOrId.target.value;
    setQuotationNo(quotationId);
    fetchQuotationDetails(quotationId);
  };

  // 3. Auto-select Quotation passed via `location.state`
  useEffect(() => {
    if (quotationData?._id) {
      // Set type if present in state
      if (quotationData.type) {
        setQuotationType(quotationData.type);
      }
      setQuotationNo(quotationData._id);
      fetchQuotationDetails(quotationData._id);
    }
  }, [quotationData]);

  useEffect(() => {
    if (products.length === 0) {
      setProductMode(null);
    }
  }, [products]);

  // Product Helper Methods
  const handleModalSetProducts = (updatedProducts) => {
    const formattedProducts = updatedProducts.map((item) => ({
      ...item,
      image: item.image || null,
      name: item.name || item.productName || item.service || item.serviceName || "-",
      code: item.code || "-",
      unit: item.unit || "-",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || Number(item.qty) || 1,
    }));
    setProducts(formattedProducts);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Credit Handlers
  const handleAddCredit = (newCreditData) => {
    const formattedCredit = {
      date: newCreditData.date || new Date().toISOString().split("T")[0],
      amount: Number(newCreditData.amountReceived || newCreditData.amount || 0),
      clientName: newCreditData.clientName || clientName || "-",
      paymentMode: newCreditData.paymentMode || "-",
      transactionId: newCreditData.transactionId || newCreditData.txnId || "-",
    };

    setCredits((prev) => [...prev, formattedCredit]);
    setShowCreditModal(false);
  };

  const deleteCredit = (index) => {
    setCredits((prev) => prev.filter((_, i) => i !== index));
  };

  // Debit Handlers
  const handleAddDebit = (newDebitData) => {
    const formattedDebit = {
      date: newDebitData.date || new Date().toISOString().split("T")[0],
      purpose: newDebitData.purpose || "-",
      amount: Number(newDebitData.amount || 0),
      paidBy: newDebitData.paidBy || "-",
      beneficiaryName: newDebitData.beneficiaryName || "-",
      paymentMode: newDebitData.paymentMode || "-",
      transactionId: newDebitData.transactionId || "-",
    };

    setDebits((prev) => [...prev, formattedDebit]);
    setShowDebitModal(false);
  };

  const deleteDebit = (index) => {
    setDebits((prev) => prev.filter((_, i) => i !== index));
  };

  // Total Calculations
  const productsTotal = products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  const discountAmt = productsTotal * (Number(discountPct) / 100);
  const taxableAmount = productsTotal - discountAmt;
  const cgstAmt = taxableAmount * (Number(cgstPct) / 100);
  const sgstAmt = taxableAmount * (Number(sgstPct) / 100);
  const otherAmt = taxableAmount * (Number(otherPct) / 100);
  const finalTotalAmount = taxableAmount + cgstAmt + sgstAmt + otherAmt;

  const totalCredits = credits.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalDebits = debits.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const profit = totalCredits - totalDebits;

  // Styles
  const orangeBtnStyle = { backgroundColor: "#f58c22", color: "white", border: "none" };
  const orangeOutlineBtnStyle = { backgroundColor: "transparent", color: "#f58c22", border: "1px solid #f58c22" };

  // Submit Handler
  const handleCreate = async () => {
    if (!clientName.trim()) {
      alert("Client Name is required.");
      return;
    }

    if (phone && phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        quotationId: quotationNo,
        quotationType,
        clientName,
        date,
        phone,
        email,
        address,
        pincode,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        gstin,
        subject,
        project,
        notes,
        products,
        credits,
        debits,
        productsTotal,
        finalTotalAmount,
        totalCredits,
        totalDebits,
        profit,
      };

      const res = await api.post("/client-finance", payload);

      if (res.status === 200 || res.status === 201) {
        alert("Client Finance Created Successfully!");
        navigate("/client-financeMain/create");
      }
    } catch (err) {
      console.error("Error creating client finance:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to save client finance. Please check backend response or console.";
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-4 bg-white" style={{ minHeight: "100vh", fontSize: "14px" }}>
      <div className="d-flex align-items-center mb-2">
        <FaArrowLeft className="me-2 text-dark" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        <h4 className="fw-bold mb-0 text-dark">Add client finance</h4>
      </div>
      <p className="text-danger mb-4 fw-medium">⚠ Please approve quotation before creating client finance</p>

      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <label className="form-label fw-bold">Quotation No <span className="text-danger">*</span></label>
          <div className="input-group">
            <select className="form-select" style={{ maxWidth: "80px" }} value={quotationType} onChange={(e) => setQuotationType(e.target.value)}>
              <option value="GST">GST</option>
              <option value="CASH">CASH</option>
            </select>
            <select className="form-select" value={quotationNo} onChange={handleQuotationSelect} disabled={loadingQuotations}>
              <option value="">{loadingQuotations ? "Loading..." : "Select quotation"}</option>
              {quotations.map((q) => (
                <option key={q._id} value={q._id}>
                  {q.quotationNumber || q._id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Client Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter client name"
            value={clientName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value)) setClientName(value);
            }}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Date <span className="text-danger">*</span></label>
          <input type="date" className="form-control shadow-none" value={date} onChange={(e) => setDate(e.target.value)} style={{ cursor: "pointer" }} />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">Phone</label>
          <div className="input-group">
            <select className="form-select" style={{ maxWidth: "90px" }} value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
              <option>🇮🇳 +91</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) setPhone(value);
              }}
            />
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
          <input
            type="text"
            className="form-control"
            placeholder="Enter pincode"
            value={pincode}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) setPincode(value);
            }}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">Country</label>
          <select className="form-select shadow-none" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(""); setSelectedCity(""); }}>
            <option value="">Select Country</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">State</label>
          <select className="form-select shadow-none" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(""); }} disabled={!selectedCountry}>
            <option value="">Select State</option>
            {State.getStatesOfCountry(selectedCountry).map((state) => (
              <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">City</label>
          <select className="form-select shadow-none" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
            <option value="">Select City</option>
            {City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
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
          <input type="text" className="form-control" placeholder="Enter or select Project" value={project} onChange={(e) => setProject(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Notes</label>
          <textarea className="form-control" rows="2" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
      </div>

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
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted fw-bold">No products added</td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      {item.image ? (
                        <img src={`http://localhost:5000/uploads/${item.image}`} alt="product" style={{ width: "40px", borderRadius: "4px" }} />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="fw-medium">{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.unit}</td>
                    <td className="text-end">₹{item.price}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end fw-bold">₹{item.price * item.quantity}</td>
                    <td className="text-center">
                      <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => deleteProduct(index)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="row g-4">
          <div className="col-md-7 d-flex gap-2 align-items-start">
            <button className="btn btn-light border text-dark d-flex align-items-center" disabled={productMode === "tanky"} onClick={() => { setProductMode("standard"); setShowProductModal(true); }}>
              <FaPlus className="me-2 text-warning" /> Add product items
            </button>

            <button className="btn btn-light border text-dark d-flex align-items-center" disabled={productMode === "tanky"} onClick={() => { setProductMode("standard"); setShowCustomModal(true); }}>
              <FaPlus className="me-2 text-warning" /> Custom Service
            </button>

            <button className="btn btn-light border text-dark d-flex align-items-center" disabled={productMode === "standard"} onClick={() => { setProductMode("tanky"); setShowTankyModal(true); }}>
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
              {credits.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-3 text-muted fw-bold">
                    No credits added yet.
                  </td>
                </tr>
              ) : (
                credits.map((item, index) => (
                  <tr key={index}>
                    <td className="px-3"><input type="checkbox" className="form-check-input" /></td>
                    <td>{item.date}</td>
                    <td className="text-success fw-bold">₹{item.amount}</td>
                    <td>{item.clientName}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.transactionId}</td>
                    <td className="text-center">
                      <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => deleteCredit(index)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button className="btn px-4 fw-bold" style={orangeBtnStyle} onClick={() => setShowCreditModal(true)}>
          + Add Credit
        </button>
      </div>

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
              {debits.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-3 text-muted fw-bold">
                    No debits added yet.
                  </td>
                </tr>
              ) : (
                debits.map((item, index) => (
                  <tr key={index}>
                    <td className="px-3"><input type="checkbox" className="form-check-input" /></td>
                    <td>{item.date}</td>
                    <td>{item.purpose}</td>
                    <td className="text-danger fw-bold">₹{item.amount}</td>
                    <td>{item.paidBy}</td>
                    <td>{item.beneficiaryName}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.transactionId}</td>
                    <td className="text-center">
                      <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => deleteDebit(index)} />
                    </td>
                  </tr>
                ))
              )}
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
        <button className="btn px-5 fw-bold" style={orangeBtnStyle} onClick={handleCreate} disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </button>
      </div>

      {/* Modals */}
      {showProductModal && <AddProductItems closeModal={() => setShowProductModal(false)} products={products} setProducts={handleModalSetProducts} />}
      {showCustomModal && <CustomerService closeModal={() => setShowCustomModal(false)} products={products} setProducts={handleModalSetProducts} />}
      {showTankyModal && <AddTankyProduct closeModal={() => setShowTankyModal(false)} products={products} setProducts={handleModalSetProducts} openAddService={() => setShowAddServiceModal(true)} />}
      {showAddServiceModal && <AddService closeModal={() => setShowAddServiceModal(false)} products={products} setProducts={handleModalSetProducts} />}
      {showCreditModal && <AddCreditModal show={showCreditModal} handleClose={() => setShowCreditModal(false)} onAddCredit={handleAddCredit} />}
      {showDebitModal && <AddDebitModal show={showDebitModal} handleClose={() => setShowDebitModal(false)} onAddDebit={handleAddDebit} />}
    </div>
  );
}

export default ClientFinance;