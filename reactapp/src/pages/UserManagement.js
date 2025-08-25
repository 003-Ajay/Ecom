import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: '', email: '', role: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle add or update
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editingId ? `/api/users/${editingId}` : '/api/users';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Save failed");
      const saved = await response.json();
      setUsers(prev =>
        editingId
          ? prev.map(u => u.userId === saved.userId ? saved : u)
          : [...prev, saved]
      );
      setForm({ username: '', email: '', role: '' });
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Delete failed");
      setUsers(prev => prev.filter(u => u.userId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      email: user.email,
      role: user.role
    });
    setEditingId(user.userId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>User Management</div>; // Minimal placeholder
};

export default UserManagement;