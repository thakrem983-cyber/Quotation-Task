import { useState, useEffect } from "react"; // useEffect add kiya
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import EditQuotation from "./EditQuotation";
import DeleteQuotation from "../modal/DeleteQuotation";
import ApproveQuotation from "../modal/ApproveQuotation";
import api from "../api/api"; // <-- APNI AXIOS WALI FILE YAHAN IMPORT KAR

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
// 1. Users ko starting mein khali (empty array) rakhenge
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state add ki

  // 2. Page load hote hi backend se data mangwane ke liye useEffect
  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      // Backend ke '/api/quotations' route par GET request bhej rahe hain
      const response = await api.get("/quotations");
      
      // Backend se jo data aaya (response.data.data array)
      const backendData = response.data.data;

      // 3. Backend ke data ko tere frontend wale format mein badal (map) rahe hain
      const formattedData = backendData.map((item) => ({
        id: item._id, // MongoDB humesha '_id' deta hai
        name: item.clientName, // Tere backend mein ye clientName hai
        quotation: item.quotationNumber,
        date: new Date(item.createdAt).toLocaleDateString(), // Date ko format kiya
        advance: item.amountReceived ? `₹${item.amountReceived}` : "₹0.00",
        total: `₹${item.grandTotal.toFixed(2)}`,
        status: item.status,
        type: item.quotationType // Ye tere filter (Cash/GST) ke liye zaroori hai
      }));

      // 4. State mein data save kar diya
      setUsers(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Data laane mein error aayi:", error);
      setLoading(false);
    }
  }
  

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.quotation.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "All" || user.type === typeFilter;

    return matchesSearch && matchesType;
  });

  //   const handleStatusChange = (id, newStatus) => {
  //     setUsers(
  //       users.map((user) =>
  //         user.id === id ? { ...user, status: newStatus } : user,
  //       ),
  //     );
  //   };

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

const confirmDelete = async () => { // <-- async add kiya API call ke liye
    try {
      // 1. Backend ko Delete request bhejo (Database se hatane ke liye)
      await api.delete(`/quotations/${selectedId}`);

      // 2. Backend se delete hone ke baad, Frontend (Table) se hatao
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedId));

      // 3. Modal band karo aur ID clear karo
      setShowDeleteModal(false);
      setSelectedId(null);
      
      // (Optional) Success message dikhao
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
          <button className="quot-add-btn" onClick={() => navigate("/quotation-template")}>
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
                  <FaEdit onClick={() => navigate(`/editquotation/${user.id}`)} />
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
            // Yahan hum selectedId ke basis par uska Quotation Number dhundh kar bhej rahe hain
            quotationNo={users.find(u => u.id === selectedId)?.quotation} 
          />
        )}

        {showApproveModal && (
          <ApproveQuotation
            closeModal={() => setShowApproveModal(false)}
            quotationId={approveId} 
            quotationNumber={users.find(u => u.id === approveId)?.quotation}
            
            // Ye function popup me 'Save' hone ke baad chalega
            onApprove={() => {
              // Option 1: Frontend ke table me turant status badal do (Fastest)
              setUsers((prevUsers) => 
                prevUsers.map((user) => 
                  user.id === approveId ? { ...user, status: "Approved" } : user
                )
              );
              
              // Option 2: Agar tune table ka data backend se laane ke liye 
              // koi function banaya hai (jaise fetchQuotations), toh tu usko bhi call kar sakta hai.
              // fetchQuotations(); 

              // setShowApproveModal(false);
            }}
          />
        )}
        
      </div>
    </div>
  );
}


export default Quotation;

