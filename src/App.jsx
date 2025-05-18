import React, { useState, useEffect } from "react";
import ListComponent from "./ListComponent";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page when per-page value changes
  };

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (users.length === 0) return <div>No users found.</div>;

  return (
    <div className="App">
      <h1>Users List</h1>

      {/* Dropdown for items per page */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="itemsPerPage">Items per page: </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handlePerPageChange}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      <ListComponent
        items={paginatedUsers}
        renderItem={(user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        )}
      />

      {/* Pagination Controls */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          ◀ Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default App;
