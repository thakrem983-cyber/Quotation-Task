import { useState } from "react";
import React from "react";
import { useEffect } from "react";

function QuotationForm({
  formData,
  setFormData,
  setValidateQuotation,
  isView = false,
  heading
}) {
  const validateForm = () => {
    let newErrors = {};

    if (!formData.quotationNumber.trim()) {
      newErrors.quotationNumber = "Quotation Number is required";
    }

    if (!formData.quotationName.trim()) {
      newErrors.quotationName = "Quotation Name is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (typeof setValidateQuotation === "function") {
      setValidateQuotation(() => validateForm);
    }
  }, [formData, setValidateQuotation]);

  const handleChange = (e) => {
    if (isView) return;

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="mt-4">
     <h3 className="mb-4">{heading}</h3>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Quotation Number</label>

          <div className="input-group">
            <select
              className="form-select"
              style={{ maxWidth: "100px" }}
              name="quotationType"
              value={formData.quotationType}
              onChange={handleChange}
              disabled={isView}
            >
              <option value="GST">GST</option>
              <option value="Cash">Cash</option>
            </select>

            <input
              type="text"
              className="form-control"
              placeholder="Quotation Number"
              name="quotationNumber"
              value={formData.quotationNumber}
              onChange={handleChange}
              disabled={isView}
            />
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Quotation Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="Quotation Name"
            name="quotationName"
            value={formData.quotationName}
            onChange={handleChange}
            disabled={isView}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Date</label>

          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            disabled={isView}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Client Name</label>

          <div className="input-group">
            <select
              className="form-select"
              style={{ maxWidth: "90px" }}
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isView}
            >
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="Miss">Miss</option>
            </select>

            <input
              type="text"
              className="form-control"
              placeholder="Client Name"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              disabled={isView}
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Subject</label>

          <input
            type="text"
            className="form-control"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isView}
          />
        </div>
      </div>
    </div>
  );
}

export default QuotationForm;
