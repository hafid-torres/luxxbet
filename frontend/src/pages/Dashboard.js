import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ token }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsers(res.data))
      .catch(err => alert('Erro ao buscar usuários: ' + err));
  }, [token]);

  return (
    <div style={{ padding: '50px' }}>
      <h2>Dashboard LuxxyBet</h2>
      <h3>Usuários cadastrados:</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
