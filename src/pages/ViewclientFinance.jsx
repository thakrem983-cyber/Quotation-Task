import React, { useState } from "react";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

import AddCreditModal from "../modal/AddCreditModal";
import AddDebitModal from "../modal/AddDebitModal";

function EditClientFinance() {
  const navigate = useNavigate();

  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showDebitModal, setShowDebitModal] = useState(false);

  
  const [quotationType, setQuotationType] = useState("GST");
  const [quotationNo, setQuotationNo] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstin, setGstin] = useState("");
  const [subject, setSubject] = useState("");
  const [project, setProject] = useState("");
  const [notes, setNotes] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  
  const [errors, setErrors] = useState({});


  const [products, setProducts] = useState([]);
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);


  const [discountPct, setDiscountPct] = useState("0");
  const [cgstPct, setCgstPct] = useState("0");
  const [sgstPct, setSgstPct] = useState("0");
  const [otherPct, setOtherPct] = useState("0");

  
  const handleClientNameChange = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(val)) {
      setClientName(val);
      if (errors.clientName) setErrors((prev) => ({ ...prev, clientName: "" }));
    }
  };

  
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,10}$/.test(val)) {
      setPhone(val);
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

 
  const handlePincodeChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,6}$/.test(val)) {
      setPincode(val);
      if (errors.pincode) setErrors((prev) => ({ ...prev, pincode: "" }));
    }
  };

  
  const handleQuotationTypeChange = (e) => {
    const type = e.target.value;
    setQuotationType(type);
    if (type === "CASH") {
      setCgstPct("0");
      setSgstPct("0");
      setGstin("");
      setErrors((prev) => ({ ...prev, gstin: "" }));
    }
  };

  const handleNumericInput = (setter) => (e) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setter(val);
    }
  };

 
  const validateForm = () => {
    let newErrors = {};

   
    if (!quotationNo) {
      newErrors.quotationNo = "Please select quotation number";
    }

    
    if (!clientName.trim()) {
      newErrors.clientName = "Client Name is required";
    }

    
    if (!date) {
      newErrors.date = "Date is required";
    }

    
    if (phone && phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format (e.g. example@domain.com)";
      }
    }

    
    if (pincode && pincode.length !== 6) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    
    if (quotationType === "GST" && gstin) {
      const gstinRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(gstin.toUpperCase())) {
        newErrors.gstin = "Invalid GSTIN format (e.g. 22AAAAA0000A1Z5)";
      }
    }


    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    
    if (products.length === 0) {
      newErrors.products = "Please add at least one product";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const productsTotal = products.reduce(
    (acc, curr) =>
      acc + (Number(curr.quantity) || 0) * (Number(curr.price) || 0),
    0,
  );

  const discountAmt = productsTotal * ((Number(discountPct) || 0) / 100);
  const taxableAmount = productsTotal - discountAmt;

  const cgstAmt =
    quotationType === "CASH"
      ? 0
      : taxableAmount * ((Number(cgstPct) || 0) / 100);
  const sgstAmt =
    quotationType === "CASH"
      ? 0
      : taxableAmount * ((Number(sgstPct) || 0) / 100);
  const otherAmt = taxableAmount * ((Number(otherPct) || 0) / 100);

  const finalTotalAmount = taxableAmount + cgstAmt + sgstAmt + otherAmt;

  const totalCredits = credits.reduce(
    (acc, curr) => acc + (Number(curr.amount) || 0),
    0,
  );
  const totalDebits = debits.reduce(
    (acc, curr) => acc + (Number(curr.amount) || 0),
    0,
  );
  const profit = totalCredits - totalDebits;

 
  const handleCreateFinance = () => {
    if (validateForm()) {
      alert("Form Submitted Successfully!");
      console.log("Valid Data Submitted", {
        quotationType,
        quotationNo,
        clientName,
        phone,
        email,
        address,
        pincode,
        gstin,
        subject,
        products,
      });
    } else {
      alert("Please fix the validation errors in the form.");
    }
  };

  const orangeBtnStyle = {
    backgroundColor: "#f58c22",
    color: "white",
    border: "none",
  };
  const orangeOutlineBtnStyle = {
    backgroundColor: "transparent",
    color: "#f58c22",
    border: "1px solid #f58c22",
  };

  return (
    <div
      className="container-fluid py-4 bg-white"
      style={{ minHeight: "100vh", fontSize: "14px" }}
    >
     
      <div className="d-flex align-items-center mb-2">
        <FaArrowLeft
          className="me-2 text-dark"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h4 className="fw-bold mb-0 text-dark">View client finance</h4>
      </div>
      

     
      <div className="row g-3 mb-5">
       
        <div className="col-md-4">
          <label className="form-label fw-bold">
            Quotation No <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <select
              className="form-select"
              style={{ maxWidth: "80px" }}
              value={quotationType}
              onChange={handleQuotationTypeChange}
            >
              <option value="GST">GST</option>
              <option value="CASH">CASH</option>
            </select>
            <select
              className={`form-select ${errors.quotationNo ? "is-invalid" : ""}`}
              value={quotationNo}
              onChange={(e) => {
                setQuotationNo(e.target.value);
                if (errors.quotationNo)
                  setErrors({ ...errors, quotationNo: "" });
              }}
            >
              <option value="">Select quotation</option>
              <option value="Q-1001">Q-1001</option>
              <option value="Q-1002">Q-1002</option>
            </select>
          </div>
          {errors.quotationNo && (
            <small className="text-danger">{errors.quotationNo}</small>
          )}
        </div>

        
        <div className="col-md-4">
          <label className="form-label fw-bold">
            Client Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.clientName ? "is-invalid" : ""}`}
            placeholder="Enter client name (Letters only)"
            value={clientName}
            onChange={handleClientNameChange}
          />
          {errors.clientName && (
            <small className="text-danger">{errors.clientName}</small>
          )}
        </div>

       
        <div className="col-md-4">
          <label className="form-label fw-bold">
            Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors({ ...errors, date: "" });
            }}
          />
          {errors.date && <small className="text-danger">{errors.date}</small>}
        </div>

     
        <div className="col-md-4">
          <label className="form-label fw-bold">Phone</label>
          <div className="input-group">
            <select
              className="form-select"
              style={{ maxWidth: "90px" }}
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
            >
              <option value="+91">🇮🇳 +91</option>
            </select>
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              placeholder="10 digit phone number"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          {errors.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}
        </div>

       
        <div className="col-md-8">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter valid email (e.g. name@domain.com)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>

     
        <div className="col-md-8">
          <label className="form-label fw-bold">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        
        <div className="col-md-4">
          <label className="form-label fw-bold">Pincode</label>
          <input
            type="text"
            className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
            placeholder="6 digit pincode"
            value={pincode}
            onChange={handlePincodeChange}
          />
          {errors.pincode && (
            <small className="text-danger">{errors.pincode}</small>
          )}
        </div>

      
        <div className="col-md-4">
          <label className="form-label fw-bold">Country</label>
          <select
            className="form-select"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
              setSelectedCity("");
            }}
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

       
        <div className="col-md-4">
          <label className="form-label fw-bold">State</label>
          <select
            className="form-select"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {State.getStatesOfCountry(selectedCountry).map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        
        <div className="col-md-4">
          <label className="form-label fw-bold">City</label>
          <select
            className="form-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {City.getCitiesOfState(selectedCountry, selectedState).map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        
        <div className="col-md-4">
          <label className="form-label fw-bold">GSTIN</label>
          <input
            type="text"
            className={`form-control ${errors.gstin ? "is-invalid" : ""}`}
            placeholder="Enter GSTIN"
            value={gstin}
            disabled={quotationType === "CASH"}
            onChange={(e) => {
              setGstin(e.target.value.toUpperCase());
              if (errors.gstin) setErrors({ ...errors, gstin: "" });
            }}
          />
          {errors.gstin && (
            <small className="text-danger">{errors.gstin}</small>
          )}
        </div>

      
        <div className="col-md-8">
          <label className="form-label fw-bold">
            Subject <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (errors.subject) setErrors({ ...errors, subject: "" });
            }}
          />
          {errors.subject && (
            <small className="text-danger">{errors.subject}</small>
          )}
        </div>

        
        <div className="col-md-6">
          <label className="form-label fw-bold">Project</label>
          <select
            className="form-select"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select Project</option>
            <option value="Project A">Project A</option>
            <option value="Project B">Project B</option>
          </select>
        </div>

        
        <div className="col-md-6">
          <label className="form-label fw-bold">Notes</label>
          <textarea
            className="form-control"
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>

      
      <div className="mb-5">
        <h5 className="fw-bold mb-3">
          Products <span className="text-danger">*</span>
        </h5>
        <div className="table-responsive mb-3">
          <table
            className="table align-middle"
            style={{ border: "1px solid #dee2e6" }}
          >
            <thead
              style={{
                backgroundColor: "#f8f9fc",
                color: "#495057",
                fontSize: "13px",
              }}
            >
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
                  <td
                    colSpan="9"
                    className="text-center py-4 text-muted fw-bold"
                  >
                    No products added
                  </td>
                </tr>
              ) : (
                products.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td>
                      <img
                        src={item.image || "https://via.placeholder.com/40"}
                        alt=""
                        width="40"
                        height="40"
                        className="rounded"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.unit}</td>
                    <td className="text-end">
                      ₹ {(Number(item.price) || 0).toFixed(2)}
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">
                      ₹{" "}
                      {(
                        (Number(item.quantity) || 0) * (Number(item.price) || 0)
                      ).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProduct(idx)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

     
        <div className="row g-4">
          <div className="col-md-7 d-flex gap-2 align-items-start flex-wrap">
            <button
              className="btn btn-light border fw-bold text-dark d-flex align-items-center"
              onClick={() => setShowProductModal(true)}
            >
              <FaPlus className="me-2 text-warning" /> Add product items
            </button>
            <button className="btn btn-light border fw-bold text-dark d-flex align-items-center">
              <FaPlus className="me-2 text-warning" /> Custom Service
            </button>
            <button className="btn btn-light border fw-bold text-dark d-flex align-items-center">
              <FaPlus className="me-2 text-warning" /> Add Tanky Product Items
            </button>
          </div>
          <div className="col-md-5">
            <div className="bg-light p-4 rounded border">
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Products total</span>
                <span className="fw-bold text-dark">
                  ₹ {productsTotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
                <span>Discount</span>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="input-group input-group-sm"
                    style={{ width: "90px" }}
                  >
                    <input
                      type="text"
                      className="form-control text-end"
                      value={discountPct}
                      onChange={handleNumericInput(setDiscountPct)}
                    />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span
                    className="text-danger fw-bold"
                    style={{ width: "80px", textAlign: "right" }}
                  >
                    - ₹ {discountAmt.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
                <span>CGST</span>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="input-group input-group-sm"
                    style={{ width: "90px" }}
                  >
                    <input
                      type="text"
                      className="form-control text-end"
                      value={cgstPct}
                      disabled={quotationType === "CASH"}
                      onChange={handleNumericInput(setCgstPct)}
                    />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span
                    className="text-success fw-bold"
                    style={{ width: "80px", textAlign: "right" }}
                  >
                    + ₹ {cgstAmt.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
                <span>SGST</span>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="input-group input-group-sm"
                    style={{ width: "90px" }}
                  >
                    <input
                      type="text"
                      className="form-control text-end"
                      value={sgstPct}
                      disabled={quotationType === "CASH"}
                      onChange={handleNumericInput(setSgstPct)}
                    />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span
                    className="text-success fw-bold"
                    style={{ width: "80px", textAlign: "right" }}
                  >
                    + ₹ {sgstAmt.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
                <span>Other</span>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="input-group input-group-sm"
                    style={{ width: "90px" }}
                  >
                    <input
                      type="text"
                      className="form-control text-end"
                      value={otherPct}
                      onChange={handleNumericInput(setOtherPct)}
                    />
                    <span className="input-group-text bg-white">%</span>
                  </div>
                  <span
                    className="text-success fw-bold"
                    style={{ width: "80px", textAlign: "right" }}
                  >
                    + ₹ {otherAmt.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between border-top pt-2 mt-2">
                <span className="fw-bold text-dark fs-6">Total Amount</span>
                <span className="fw-bold text-dark fs-6">
                  ₹ {finalTotalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="mb-4">
        <h5 className="fw-bold mb-3">Total Credits</h5>
        <div className="table-responsive mb-3">
          <table
            className="table align-middle"
            style={{ border: "1px solid #dee2e6" }}
          >
            <thead
              style={{
                backgroundColor: "#f8f9fc",
                color: "#495057",
                fontSize: "13px",
              }}
            >
              <tr>
                <th className="py-3 px-3" width="50">
                  <input type="checkbox" className="form-check-input" />
                </th>
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
                  <td
                    colSpan="7"
                    className="text-center py-3 text-muted fw-bold"
                  >
                    No credits added yet.
                  </td>
                </tr>
              ) : (
                credits.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-3">
                      <input type="checkbox" className="form-check-input" />
                    </td>
                    <td>{item.date}</td>
                    <td>₹ {(Number(item.amount) || 0).toFixed(2)}</td>
                    <td>{item.name}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.transactionId}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCredit(idx)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button
          className="btn px-4 fw-bold"
          style={orangeBtnStyle}
          onClick={() => setShowCreditModal(true)}
          
        >
          + Add Credit
        </button>
      </div>

      
      <div className="mb-5">
        <h5 className="fw-bold mb-3">Total Debits</h5>
        <div className="table-responsive mb-3">
          <table
            className="table align-middle"
            style={{ border: "1px solid #dee2e6" }}
          >
            <thead
              style={{
                backgroundColor: "#f8f9fc",
                color: "#495057",
                fontSize: "13px",
              }}
            >
              <tr>
                <th className="py-3 px-3" width="50">
                  <input type="checkbox" className="form-check-input" />
                </th>
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
                  <td
                    colSpan="9"
                    className="text-center py-3 text-muted fw-bold"
                  >
                    No debits added yet.
                  </td>
                </tr>
              ) : (
                debits.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-3">
                      <input type="checkbox" className="form-check-input" />
                    </td>
                    <td>{item.date}</td>
                    <td>{item.purpose}</td>
                    <td>₹ {(Number(item.amount) || 0).toFixed(2)}</td>
                    <td>{item.paidBy}</td>
                    <td>{item.beneficiaryName}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.transactionId}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteDebit(idx)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button
          className="btn px-4 fw-bold"
          style={orangeBtnStyle}
          onClick={() => setShowDebitModal(true)}
         
        >
          + Add Debit
        </button>
      </div>


      <div className="card shadow-sm border mt-4">
        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3 bg-light">
          <div className="d-flex gap-5 fw-bold" style={{ fontSize: "15px" }}>
            <span>
              Total Credits:{" "}
              <span className="text-success">₹{totalCredits.toFixed(2)}</span>
            </span>
            <span style={{ borderLeft: "2px solid #ddd", paddingLeft: "30px" }}>
              Total Debits:{" "}
              <span className="text-danger">₹{totalDebits.toFixed(2)}</span>
            </span>
            <span style={{ borderLeft: "2px solid #ddd", paddingLeft: "30px" }}>
              Profit: <span className="text-primary">₹{profit.toFixed(2)}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-3 mt-4 mb-5">
        <button
          className="btn px-5 fw-bold"
          style={orangeOutlineBtnStyle}
          onClick={() => navigate(-1)}
          
        >
          Cancel
        </button>
        <button
          className="btn px-5 fw-bold"
          style={orangeBtnStyle}
          
          onClick={() => alert("Create Button Clicked")}
        >
          Create
        </button>
      </div>

     

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

export default EditClientFinance;