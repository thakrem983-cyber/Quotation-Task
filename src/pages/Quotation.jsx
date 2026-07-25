import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import EditQuotation from "./EditQuotation";
import DeleteQuotation from "../modal/DeleteQuotation";
import ApproveQuotation from "../modal/ApproveQuotation";
import api from "../api/api";

import {
  FaEye,
  FaDownload,
  FaEdit,
  FaShareAlt,
  FaTrash,
  FaPrint,
} from "react-icons/fa";

function Quotation() {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approveId, setApproveId] = useState(null);

  const statusOptions = ["Pending", "Approved", "Rejected"];
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const response = await api.get("/quotations");

      const backendData = response.data.data;

      // const formattedData = backendData.map((item) => ({
      //   id: item._id,
      //   name: item.clientName,
      //   quotation: item.quotationNumber,
      //   date: new Date(item.createdAt).toLocaleDateString(),
      //   advance: item.amountReceived ? `₹${item.amountReceived}` : "₹0.00",
      //   total: `₹${item.grandTotal.toFixed(2)}`,
      //   status: item.status,
      //   type: item.quotationType
      // }));

      const formattedData = backendData.map((item) => ({
        id: item._id,
        name: item.clientName,
        quotation: item.quotationNumber,
        date: new Date(item.createdAt).toLocaleDateString(),
        advance: item.amountReceived ? `₹${item.amountReceived}` : "₹0.00",
        total: `₹${item.grandTotal.toFixed(2)}`,
        status: item.status,
        type: item.quotationType,

        quotationData: item,
      }));

      setUsers(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Data laane mein error aayi:", error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.quotation.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "All" || user.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "Approved") {
      setApproveId(id);
      setShowApproveModal(true);
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/quotations/${selectedId}`);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedId),
      );

      setShowDeleteModal(false);
      setSelectedId(null);

      alert("Quotation deleted successfully!");
    } catch (error) {
      console.error(" error :", error);
      alert("Failed to delete quotation. Please try again.");
    }
  };

  const confirmApprove = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === approveId ? { ...user, status: "Approved" } : user,
      ),
    );

    setShowApproveModal(false);
    setApproveId(null);
  };
  return (
    <div className="quotation-page">
      <div className="quotation-card">
        <div className="quotation-header">
          <h1>Quotation</h1>
          <button
            className="quot-add-btn"
            onClick={() => navigate("/quotation-template")}
          >
            + Add Quotation
          </button>
        </div>

        <div className="filter-section">
          <div className="left-filter">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
            <input
              type="text"
              placeholder="Search by client or quotation number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="right-filter">
            <span>Type :</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Cash">Cash</option>
              <option value="GST">GST</option>
            </select>
            <button className="filter-btn">Filters</button>
          </div>
        </div>
        <div></div>
        <table className="table-box">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(filteredUsers.map((user) => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th>NAME</th>

              <th>QUOTATION NUMBER</th>

              <th>DATE</th>

              <th>ADVANCE AMOUNT</th>

              <th>GRAND TOTAL</th>

              <th>STATUS</th>

              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.slice(0, entries).map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(
                          selectedUsers.filter((id) => id !== user.id),
                        );
                      }
                    }}
                  />
                </td>

                <td>{user.name}</td>

                <td>{user.quotation}</td>

                <td>{user.date}</td>

                <td>{user.advance}</td>

                <td>{user.total}</td>

                <td>
                  {user.status === "Pending" ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        id={`dropdown-${user.id}`}
                        className={`status-btn ${user.status.toLowerCase()}`}
                      >
                        ● {user.status}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="status-menu">
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(user.id, "Approved")
                          }
                        >
                          ● Approved
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(user.id, "Rejected")
                          }
                        >
                          ● Rejected
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <button
                      className={`status-btn ${user.status.toLowerCase()}`}
                      disabled
                    >
                      ● {user.status}
                    </button>
                  )}
                </td>
                <td className="action-icons">
                  <FaEye onClick={() => navigate(`/view/${user.id}`)} />
                  <FaDownload onClick={() => handleDownload(user.id)} />
                  <FaEdit
                    onClick={() => navigate(`/editquotation/${user.id}`)}
                  />
                  <FaShareAlt onClick={() => handleShare(user.id)} />
                  <FaTrash onClick={() => handleDelete(user.id)} />
                  <FaPrint onClick={() => handlePrint(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteModal && (
          <DeleteQuotation
            closeModal={() => {
              setShowDeleteModal(false);
              setSelectedId(null);
            }}
            onDelete={confirmDelete}
            quotationNo={users.find((u) => u.id === selectedId)?.quotation}
          />
        )}

        {showApproveModal && (
          // <ApproveQuotation
          //   closeModal={() => setShowApproveModal(false)}
          //   quotationId={approveId}
          //   quotationNumber={users.find(u => u.id === approveId)?.quotation}

          //   onApprove={() => {

          //     setUsers((prevUsers) =>
          //       prevUsers.map((user) =>
          //         user.id === approveId ? { ...user, status: "Approved" } : user
          //       )
          //     );

          //   }}
          // />
          <ApproveQuotation
            closeModal={() => setShowApproveModal(false)}
            quotation={users.find((u) => u.id === approveId)}
            onApprove={() => {
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user.id === approveId
                    ? { ...user, status: "Approved" }
                    : user,
                ),
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Quotation;
