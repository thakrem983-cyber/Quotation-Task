import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import EditQuotation from "./EditQuotation";


import {
    FaEye,
    FaDownload,
    FaEdit,
    FaShareAlt, 
    FaTrash,
    FaPrint
} from "react-icons/fa";

function Quotation() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Mr. Rajesh Sahu",
            quotation: "MECH202627-009",
            date: "7/9/2026",
            advance: "₹0.00",
            total: "₹0.00",
            status: "Pending",
        },
        {
            id: 2,
            name: "Mr. ROX",
            quotation: "ME202627-033",
            date: "6/3/2026",
            advance: "₹10,000.00",
            total: "₹1,25,018.00",
            status: "Approved",
        },
        {
            id: 3,
            name: "Ms. Tanuja",
            quotation: "ME202627-032",
            date: "5/29/2026",
            advance: "₹1,180.00",
            total: "₹1,18,018.00",
            status: "Approved",
        },
    ]);
    const statusOptions = ["Pending", "Approved", "Rejected"];
    const [search, setSearch] = useState("");
    const [entries, setEntries] = useState(10);
    const [typeFilter, setTypeFilter] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.quotation.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            typeFilter === "All" || user.type === typeFilter;

        return matchesSearch && matchesType;
    });

    const handleStatusChange = (id, newStatus) => {
        setUsers(
            users.map((user) =>
                user.id === id
                    ? { ...user, status: newStatus }
                    : user
            )
        );
    };

    return (
        
        <div className="quotation-page">

            <div className="quotation-card">

                <div className="quotation-header">
                    <h1>Quotation</h1>
                    <button className="add-btn" onClick={() => navigate("/addquotation")}>
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
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="right-filter">
                        <span>Type :</span>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)} >
                            <option value="All">All</option>
                            <option value="Cash">Cash</option>
                            <option value="GST">GST</option>
                        </select>
                        <button className="filter-btn">
                            Filters
                        </button>
                    </div>
                </div>
                <div></div>
                <table className="table-box">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedUsers(filteredUsers.map(user => user.id));}
                                         else {
                                            setSelectedUsers([]);}
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
                                                    selectedUsers.filter(id => id !== user.id)
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
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            id={`dropdown-${user.id}`}
                                            className={`status-btn ${user.status.toLowerCase()}`}
                                        >
                                            ● {user.status}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="status-menu">
                                            <Dropdown.Item
                                                onClick={() => handleStatusChange(user.id, "Pending")}
                                            >
                                                ● Pending
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => handleStatusChange(user.id, "Approved")}
                                            >
                                                ● Approved
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                onClick={() => handleStatusChange(user.id, "Rejected")}
                                            >
                                                ● Rejected
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td className="action-icons">
                                    <FaEye onClick={() => navigate("/view")}  />
                                    <FaDownload onClick={() => handleDownload(item.id)} />
                                    <FaEdit onClick={() => navigate("/editquotation")} />
                                    <FaShareAlt onClick={() => handleShare(item.id)} />
                                    <FaTrash onClick={() => handleDelete(item.id)} />
                                    <FaPrint onClick={() => handlePrint(item.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Quotation;