import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  X,
  Clock,
  Warehouse,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Move InventoryModal outside the main component to prevent re-renders
const InventoryModal = ({ inventoryItem, onClose, onSave, formData, onInputChange }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {inventoryItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <form onSubmit={onSave} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
            <input
              type="number"
              name="productId"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Product ID"
              value={formData.productId}
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock</label>
            <input
              type="number"
              name="currentStock"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current stock"
              value={formData.currentStock}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reorder Point</label>
            <input
              type="number"
              name="reorderPoint"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Reorder point"
              value={formData.reorderPoint}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Stock</label>
            <input
              type="number"
              name="maxStock"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max stock"
              value={formData.maxStock}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reserved Stock</label>
            <input
              type="number"
              name="reserved"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Reserved stock"
              value={formData.reserved}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier ID</label>
            <input
              type="number"
              name="supplierId"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Supplier ID"
              value={formData.supplierId}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time (days)</label>
          <input
            type="number"
            name="leadTime"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Lead time in days"
            value={formData.leadTime}
            onChange={onInputChange}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {inventoryItem ? 'Update Inventory' : 'Add Inventory'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);
  const [formData, setFormData] = useState({
    productId: '',
    currentStock: '',
    reorderPoint: '',
    maxStock: '',
    reserved: '',
    supplierId: '',
    leadTime: ''
  });

  // Fetch inventory list
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/inventories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch inventory");
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add / update
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const payload = {
        product: { productId: Number(formData.productId) },
        currentStock: Number(formData.currentStock),
        reorderPoint: Number(formData.reorderPoint || 10),
        maxStock: Number(formData.maxStock || 1000),
        reserved: Number(formData.reserved || 0),
        supplierId: formData.supplierId ? Number(formData.supplierId) : null,
        leadTime: Number(formData.leadTime || 7),
      };

      const url = editingInventory
        ? `/api/inventories/${editingInventory.inventoryId}`
        : '/api/inventories';
      const method = editingInventory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Save failed");
      const saved = await response.json();

      setInventory(prev =>
        editingInventory
          ? prev.map(i => i.inventoryId === saved.inventoryId ? saved : i)
          : [...prev, saved]
      );

      setShowInventoryModal(false);
      setEditingInventory(null);
      setFormData({
        productId: '',
        currentStock: '',
        reorderPoint: '',
        maxStock: '',
        reserved: '',
        supplierId: '',
        leadTime: ''
      });
      setSuccessMessage(editingInventory ? "Inventory updated successfully!" : "Inventory added successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inventory item?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/inventories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Delete failed");
      setInventory(prev => prev.filter(i => i.inventoryId !== id));
      setSuccessMessage("Inventory item deleted successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setEditingInventory(item);
    setFormData({
      productId: item.product?.productId || '',
      currentStock: item.currentStock,
      reorderPoint: item.reorderPoint,
      maxStock: item.maxStock,
      reserved: item.reserved,
      supplierId: item.supplierId || '',
      leadTime: item.leadTime,
    });
    setShowInventoryModal(true);
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.reorderPoint) return { label: 'Low Stock', color: 'text-yellow-600 bg-yellow-100', icon: AlertTriangle };
    if (item.currentStock > item.maxStock) return { label: 'Overstocked', color: 'text-red-600 bg-red-100', icon: XCircle };
    return { label: 'In Stock', color: 'text-green-600 bg-green-100', icon: CheckCircle };
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = searchTerm === '' ||
      (item.product?.productId && item.product.productId.toString().includes(searchTerm));
    return matchesSearch;
  });

  if (loading) return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <div className="p-6 overflow-y-auto">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-1">Manage your product stock levels and reorder points</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </button>
                <button 
                  onClick={() => setShowInventoryModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Inventory
                </button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <p className="text-red-700">{error}</p>
                  <button onClick={() => setError(null)} className="text-red-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <p className="text-green-700">{successMessage}</p>
                  <button onClick={() => setSuccessMessage('')} className="text-green-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Product ID..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {}}
                  className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Point</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item);
                    const StatusIcon = stockStatus.icon;

                    return (
                      <tr key={item.inventoryId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.inventoryId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product?.productId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.currentStock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reserved}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.available}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderPoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.maxStock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.supplierId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.leadTime} days</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                            {stockStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.inventoryId)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <Warehouse className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or add a new item</p>
                <button 
                  onClick={() => setShowInventoryModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Inventory Item
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredInventory.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInventory.length}</span> of{' '}
                <span className="font-medium">{inventory.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Modal */}
      {showInventoryModal && (
        <InventoryModal
          inventoryItem={editingInventory}
          onClose={() => {
            setShowInventoryModal(false);
            setEditingInventory(null);
            setFormData({
              productId: '',
              currentStock: '',
              reorderPoint: '',
              maxStock: '',
              reserved: '',
              supplierId: '',
              leadTime: ''
            });
          }}
          onSave={handleSave}
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Inventory;