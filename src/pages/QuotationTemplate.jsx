import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./QuotationTemplate.css";


const API_URL = "http://localhost:5000/api/quotations"; 

function QuotationTemplate() {
  const navigate = useNavigate();
  const [savedTemplates, setSavedTemplates] = useState([]);

  
  const loadTemplates = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const result = await response.json();
        console.log("Backend se aaya poora data:", result);

        
        const allData = result.data || result.quotations || result;

        if (Array.isArray(allData)) {
          
          const templatesOnly = allData.filter((item) => item.saveAsTemplate === true);
          setSavedTemplates(templatesOnly);
        } else {
          console.error("Backend se array nahi mila:", allData);
          setSavedTemplates([]);
        }
      } else {
        console.error("Failed to fetch templates");
      }
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

 
  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    
    if (window.confirm("Do you want to delete this template?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
         
          const updatedList = savedTemplates.filter((item) => item._id !== id && item.id !== id);
          setSavedTemplates(updatedList);
        } else {
          alert("Failed to delete template from server.");
        }
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    }
  };

  return (
    <div className="container py-4">
     
      <div className="d-flex align-items-center mb-4">
        <FaArrowLeft
          className="me-3"
          style={{ cursor: "pointer", fontSize: "22px" }}
          onClick={() => navigate(-1)}
        />
        <h3 className="mb-0 fw-bold">QUOTATION TEMPLATE</h3>
      </div>

      <div className="row g-4">
        
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

        
        {savedTemplates.length > 0 &&
          savedTemplates.map((item) => (
            <div className="col-lg-3 col-md-4" key={item._id || item.id}> 
              <div 
                className="card template-card shadow-sm border-0 h-100"
                style={{ cursor: "pointer", minHeight: "220px" }}
                onClick={() => navigate("/addquotation", { state: { templateData: item } })}
              >
                <div 
                  className="template-preview bg-light d-flex flex-column justify-content-center align-items-center p-3 text-center flex-grow-1"
                >
                  <h6 className="text-dark fw-bold mb-1">
                    {item.quotationName || item.clientName || "Untitled Quotation"}
                  </h6>
                </div>

                <div className="template-footer d-flex justify-content-between align-items-center p-3 bg-white border-top">
                  <h6 className="text-truncate mb-0 fw-semibold text-dark" style={{ maxWidth: "60%" }}>
                    {item.quotationName || item.clientName || "Untitled"}
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
                      onClick={(e) => handleDelete(e, item._id || item.id)}
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