import React, { useEffect, useState } from "react";
import "../Style/TableUser.css";

const UsersTableComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users?limit=9")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Cidade</th>
            <th>CEP(ZipCode)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.firstname} {user.name.lastname}</td>
              <td>{user.phone}</td> 
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTableComponent;
