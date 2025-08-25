import React, { useState, useEffect } from 'react';

const APIManagement = () => {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    apiName: '', endpoint: '', key: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch APIs from backend
  useEffect(() => {
    const fetchApis = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/apis", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch APIs");
        const data = await response.json();
        setApis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApis();
  }, []);

  // Handle add or update
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editingId ? `/api/apis/${editingId}` : '/api/apis';
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
      setApis(prev =>
        editingId
          ? prev.map(a => a.apiId === saved.apiId ? saved : a)
          : [...prev, saved]
      );
      setForm({ apiName: '', endpoint: '', key: '' });
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/apis/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Delete failed");
      setApis(prev => prev.filter(a => a.apiId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (api) => {
    setForm({
      apiName: api.apiName,
      endpoint: api.endpoint,
      key: api.key
    });
    setEditingId(api.apiId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>API Management</div>; // Minimal placeholder
};

export default APIManagement;