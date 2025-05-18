import React, { useState, useEffect } from "react";
import ListComponent from "./ListComponent";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
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

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (users.length === 0) return <div>No users found.</div>;

  return (
    <div className="App">
      <h1>Users List</h1>
      <ListComponent
        items={users}
        renderItem={(user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        )}
      />
    </div>
  );
};

export default App;
