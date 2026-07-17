import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./QuotationTemplate.css";

function QuotationTemplate() {
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("quotationTemplate"));

  const templates = [
    {
      id: 1,
      name: "Roofing Material",
      image: "https://via.placeholder.com/300x220",
    },
    {
      id: 2,
      name: "Tensile Work",
      image: "https://via.placeholder.com/300x220",
    },
    {
      id: 3,
      name: "Polycarbonate Work",
      image: "https://via.placeholder.com/300x220",
    },
  ];

  return (
    <div className="container py-4">

      <div className="d-flex align-items-center mb-4">
        <FaArrowLeft
          className="me-3"
          style={{ cursor: "pointer", fontSize: "22px" }}
          onClick={() => navigate(-1)}
        />

        <h3 className="mb-0">
          QUOTATION TEMPLATE
        </h3>
      </div>

      <div className="row g-4">

        <div className="col-lg-3 col-md-4">
          <div
            className="card template-card shadow-sm border-0"
            onClick={() => navigate("/addquotation")}
            style={{ cursor: "pointer" }}
          >
            <div className="template-preview d-flex justify-content-center align-items-center">
              <FaPlus size={50} color="#ff9800" />
            </div>

            <div className="template-footer">
              <h6 className="mb-0">Blank Quotation</h6>
            </div>
          </div>
        </div>

        {saved && (
          <div className="col-lg-3 col-md-4">
            <div className="card template-card shadow-sm border-0">

              <div className="template-preview bg-light d-flex justify-content-center align-items-center">
                <h6 className="text-muted text-center px-3">
                  {saved.quotationName}
                </h6>
              </div>

              <div className="template-footer">
                <h6 className="text-truncate mb-0">
                  {saved.quotationName}
                </h6>

                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    title="Delete"
                    onClick={() => {
                      if (window.confirm("Delete this quotation?")) {
                        localStorage.removeItem("quotationTemplate");
                        navigate(0); // Refresh page
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      
        {templates.map((item) => (
          <div className="col-lg-3 col-md-4" key={item.id}>

            <div className="card template-card shadow-sm border-0">

              <img
                src={item.image}
                alt={item.name}
                className="template-preview"
              />

              <div className="template-footer">

                <h6 className="mb-0 text-truncate">
                  {item.name}
                </h6>

                <div>
                  <button className="btn btn-warning btn-sm me-2">
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    title="Delete"
                    onClick={() => {
                      if (window.confirm("Delete this quotation?")) {
                        localStorage.removeItem("quotationTemplate");
                        navigate(0); // Refresh page
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>

              </div>

            </div>

          </div>
        ))}
        
        <div className="quotation-footer">
          <div className="d-flex justify-content-end align-items-center">

            <button
              className="btn btn-light pagination-btn"
              disabled
            >
              ←
            </button>

            <button className="btn pagination-active mx-2">
              1
            </button>

            <button
              className="btn btn-light pagination-btn"
              disabled
            >
              →
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}

export default QuotationTemplate;