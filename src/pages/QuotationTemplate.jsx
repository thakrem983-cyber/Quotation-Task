import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./QuotationTemplate.css";

function QuotationTemplate() {
  const navigate = useNavigate();
  const [savedTemplates, setSavedTemplates] = useState([]);

  // LocalStorage se saved templates load karo
  const loadTemplates = () => {
    const data = JSON.parse(localStorage.getItem("quotationTemplates")) || [];
    setSavedTemplates(data);
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Delete Handler
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Card click triggers na ho
    if (window.confirm("you wants to delete this  templeate")) {
      const updatedList = savedTemplates.filter((item) => item.id !== id);
      setSavedTemplates(updatedList);
      localStorage.setItem("quotationTemplates", JSON.stringify(updatedList));
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <FaArrowLeft
          className="me-3"
          style={{ cursor: "pointer", fontSize: "22px" }}
          onClick={() => navigate(-1)}
        />
        <h3 className="mb-0 fw-bold">QUOTATION TEMPLATE</h3>
      </div>

      <div className="row g-4">
        {/* 1. Blank Quotation Card */}
        <div className="col-lg-3 col-md-4">
          <div
            className="card template-card shadow-sm border-0 h-100"
            onClick={() => navigate("/addquotation")}
            style={{ cursor: "pointer", minHeight: "220px" }}
          >
            <div className="template-preview d-flex justify-content-center align-items-center flex-grow-1 py-4">
              <FaPlus size={50} color="#ff9800" />
            </div>
            <div className="template-footer p-3 bg-white border-top text-center">
              <h6 className="mb-0 fw-semibold text-dark">Blank Quotation</h6>
            </div>
          </div>
        </div>

        {/* 2. Dynamically Created Saved Templates */}
        {savedTemplates.length > 0 &&
          savedTemplates.map((item) => (
            <div className="col-lg-3 col-md-4" key={item.id}>
              <div 
                className="card template-card shadow-sm border-0 h-100"
                style={{ cursor: "pointer", minHeight: "220px" }}
                onClick={() => navigate("/addquotation", { state: { templateData: item } })}
              >
                <div 
                  className="template-preview bg-light d-flex flex-column justify-content-center align-items-center p-3 text-center flex-grow-1"
                >
                  <h6 className="text-dark fw-bold mb-1">
                    {item.quotationName || "Untitled Quotation"}
                  </h6>
                 
                </div>

                <div className="template-footer d-flex justify-content-between align-items-center p-3 bg-white border-top">
                  <h6 className="text-truncate mb-0 fw-semibold text-dark" style={{ maxWidth: "60%" }}>
                    {item.quotationName || "Untitled"}
                  </h6>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm text-white"
                      title="Edit / Load Template"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/addquotation", { state: { templateData: item } });
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-warning btn-sm text-white"
                      title="Delete"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default QuotationTemplate;