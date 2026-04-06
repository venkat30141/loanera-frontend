import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ViewAllUsers.css";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 FILTER: role + search (name/email)
  const filteredUsers = users
    .filter((u) =>
      activeTab === "ALL" ? true : u.role === activeTab
    )
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    return <div className="users-loading">Loading users...</div>;
  }

  return (
    <div className="users-container">
      <h2 className="users-title">Users Management</h2>

      {/* ===== TABS + SEARCH ===== */}
      <div className="users-toolbar">
        <div className="users-tabs">
          {["ALL", "BORROWER", "LENDER", "ADMIN", "ANALYST"].map((tab) => (
            <button
              key={tab}
              className={`users-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "ALL" ? "All" : tab.toLowerCase()}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="users-search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllUsers;
