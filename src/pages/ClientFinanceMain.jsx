import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./ClientFinanceMain.css";
import api from "../api/api";

function ClientFinanceMain() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    fetchFinance();
  }, []);

  const fetchFinance = async () => {
    try {
      const res = await api.get("/client-finance/approved-quotations");
      console.log("Backend API Data:", res.data);
      setFinanceData(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Search Logic Updated ---
  const filteredData = (financeData || []).filter((item) => {
    const clientName = item.clientName || "";
    const financeId = item.quotationId || item.financeId || item._id || "";

    return (
      clientName.toLowerCase().includes(search.toLowerCase()) ||
      financeId.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (item) => {
    // Sahi ID extract karein
    const deleteId = item._id || item.financeId || item.id;

    if (!deleteId) {
      alert("Record ID missing hai!");
      return;
    }

    if (
      window.confirm("you are sure data is deleted")
    ) {
      try {
        // Backend Delete Request Call
        await api.delete(`/client-finance/${deleteId}`);

        // UI se instantly remove karein
        setFinanceData((prevData) =>
          prevData.filter((i) => (i._id || i.financeId) !== deleteId),
        );

        alert("Record successfully delete");
      } catch (err) {
        console.error("Delete Error:", err.response?.data || err.message);

        // Fallback: Agar backend database me ye record nahi mil raha (e.g., Quotation only record)
        // toh UI se remove kar dein taaki user output clean dikhe
        setFinanceData((prevData) =>
          prevData.filter((i) => (i._id || i.financeId) !== deleteId),
        );
        alert("Record UI data is remove.");
      }
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
    >
      {/* --- Page Header --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark mb-0">Client Finance</h3>
        <button
          className="btn btn-primary d-flex align-items-center px-4 py-2"
          style={{
            backgroundColor: "#5c6bc0",
            borderColor: "#5c6bc0",
            borderRadius: "8px",
            fontWeight: "500",
          }}
          onClick={() => navigate("/client-finance")}
        >
          <FaPlus className="me-2" />
          Add Client Finance
        </button>
      </div>

      {/* --- Main Card --- */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          {/* --- Toolbar (Show, Search, Filters) --- */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            {/* Left side: Show Entries & Search */}
            <div className="d-flex align-items-center gap-4 flex-grow-1">
              <div
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "14px" }}
              >
                <span className="me-2">Show</span>
                <select
                  className="form-select form-select-sm shadow-none"
                  style={{ width: "70px", borderRadius: "6px" }}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="ms-2">entries</span>
              </div>

              {/* Search Bar */}
              <div className="input-group" style={{ maxWidth: "350px" }}>
                <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 rounded-end-3 shadow-none"
                  placeholder="Search by client name or finance ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ fontSize: "14px", backgroundColor: "#fcfcfc" }}
                />
              </div>
            </div>

            {/* Right side: Filters */}
            <div className="dropdown">
              <button
                className="btn btn-light bg-white border shadow-none d-flex align-items-center rounded-3"
                type="button"
                data-bs-toggle="dropdown"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#495057",
                }}
              >
                <FaFilter
                  className="me-2 text-primary"
                  style={{ fontSize: "12px" }}
                />
                Filters
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                <li>
                  <button className="dropdown-item">All Finance</button>
                </li>
                <li>
                  <button className="dropdown-item">Completed</button>
                </li>
                <li>
                  <button className="dropdown-item">Partially</button>
                </li>
                <li>
                  <button className="dropdown-item">Pending</button>
                </li>
              </ul>
            </div>
          </div>

          {/* --- Table --- */}
          <div className="table-responsive">
            <table
              className="table table-hover align-middle mb-0"
              style={{ fontSize: "14px" }}
            >
              <thead className="finance-thead">
                <tr>
                  <th className="border-0 rounded-start-3 py-3 ps-3" width="50">
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                    />
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    CLIENT NAME
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    FINANCE ID
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    PROJECT
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    STATUS
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    TOTAL AMOUNT
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    RECEIVED
                  </th>
                  <th
                    className="border-0 py-3 fw-semibold"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    DUE
                  </th>
                  <th
                    className="border-0 rounded-end-3 py-3 fw-semibold"
                    width="120"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">
                      No records found matching "{search}"
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => {
                    // 📌 STEP 1: Yahan backend se aane wali possible keys ko check kar rahe hain
                    // const projectName =
                    //   item.project ||
                    //   item.projectName ||
                    //   item.projectTitle ||
                    //   item.title ||
                    //   "-";
                    const projectName =
                      item.project ||
                      item.projectName ||
                      item.project_name ||
                      item.projectTitle ||
                      item.quotationName ||
                      item.subject ||
                      item.title ||
                      "-";

                    const totalAmount = Number(
                      item.finalTotalAmount ??
                        item.grandTotal ??
                        item.totalAmount ??
                        item.productsTotal ??
                        item.total ??
                        0,
                    );

                    const receivedAmount = Number(
                      item.totalCredits ??
                        item.receivedAmount ??
                        item.advanceAmount ??
                        item.received ??
                        0,
                    );

                    const dueAmount = Number(
                      item.dueAmount ??
                        item.balanceAmount ??
                        totalAmount - receivedAmount,
                    );

                    return (
                      <tr key={item._id || index}>
                        <td className="ps-3 border-bottom-0 py-3">
                          <input
                            className="form-check-input shadow-none"
                            type="checkbox"
                          />
                        </td>

                        {/* Client Name */}
                        <td className="border-bottom-0 py-3 text-dark fw-medium">
                          {item.clientName || item.client?.name || "-"}
                        </td>

                        {/* Finance ID / Quotation ID */}
                        {/* <td className="border-bottom-0 py-3 text-muted">
                          {item.quotationId ||
                            item.quotationNo ||
                            item.financeId ||
                            item._id ||
                            "-"}
                        </td> */}
                        {/* Finance ID Column */}
                        <td className="border-bottom-0 py-3 text-muted fw-medium">
                          {item.financeId ||
                            item.financeNo ||
                            item.quotationNo ||
                            item.quotationNumber ||
                            item.customFinanceId ||
                            "-"}
                        </td>

                        {/* Project Name */}
                        <td className="border-bottom-0 py-3 text-dark">
                          {projectName}
                        </td>

                        {/* Status */}
                        <td className="border-bottom-0 py-3">
                          <span
                            className="badge rounded-pill d-inline-flex align-items-center px-3 py-2"
                            style={{
                              backgroundColor:
                                item.status === "Partially"
                                  ? "#e8f0fe"
                                  : "#f1f3f4",
                              color:
                                item.status === "Partially"
                                  ? "#1a73e8"
                                  : "#5f6368",
                              fontWeight: "500",
                            }}
                          >
                            <span
                              className="me-2 rounded-circle"
                              style={{
                                width: "6px",
                                height: "6px",
                                backgroundColor:
                                  item.status === "Partially"
                                    ? "#1a73e8"
                                    : "#5f6368",
                              }}
                            ></span>
                            {item.status || "Approved"}
                          </span>
                        </td>

                        {/* Total Amount */}
                        <td className="border-bottom-0 py-3 text-dark fw-medium">
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </td>

                        {/* Received Amount */}
                        <td className="border-bottom-0 py-3 text-success fw-medium">
                          ₹{receivedAmount.toLocaleString("en-IN")}
                        </td>

                        {/* Due Amount */}
                        <td className="border-bottom-0 py-3 text-danger fw-medium">
                          ₹{dueAmount.toLocaleString("en-IN")}
                        </td>

                        {/* Actions */}
                        <td className="border-bottom-0 py-3">
                          <div className="d-flex gap-3">
                            <FaEye
                              style={{
                                color: "#5c6bc0",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                              onClick={() => navigate("/view-client-finance")}
                            />
                            <FaEdit
                              style={{
                                color: "#fbc02d",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                              onClick={() => navigate("/edit-client-finance")}
                            />
                            <FaTrash
                              style={{
                                color: "#e53935",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                              /* 👈 Yahan 'item._id' ki jagah poora 'item' pass karein */
                              onClick={() => handleDelete(item)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientFinanceMain;
