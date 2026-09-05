import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import adminService, { UserRecord } from '../../services/adminService';

export const UserManagementPage: React.FC = () => {
  const toast = useToast();
  const [searchUsername, setSearchUsername] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchEmpName, setSearchEmpName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const [records, setRecords] = useState<UserRecord[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<UserRecord | null>(null);
  const [formData, setFormData] = useState<{ username: string; role: 'Admin' | 'ESS'; empName: string; status: 'Enabled' | 'Disabled'; email: string }>({
    username: '',
    role: 'Admin',
    empName: '',
    status: 'Enabled',
    email: '',
  });

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getUsers({
        username: searchUsername || undefined,
        role: searchRole || undefined,
        empName: searchEmpName || undefined,
        status: searchStatus || undefined,
      });
      setRecords(res.data);
      setTotalItems(res.total);
    } catch (err) {
      toast.error('Unable to fetch system users from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = () => {
    loadUsers();
  };

  const handleReset = () => {
    setSearchUsername('');
    setSearchRole('');
    setSearchEmpName('');
    setSearchStatus('');
    adminService.getUsers().then(res => {
      setRecords(res.data);
      setTotalItems(res.total);
    });
  };

  const handleDelete = async (id: string, username: string) => {
    if (confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await adminService.deleteUser(id);
        toast.success(`User "${username}" deleted successfully.`);
        loadUsers();
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete user.');
      }
    }
  };

  const handleToggleStatus = async (user: UserRecord) => {
    const targetId = user.id || user._id || '';
    const newStatus = user.status === 'Enabled' ? 'Disabled' : 'Enabled';
    try {
      await adminService.updateUserStatus(targetId, newStatus);
      toast.success(`User status updated to ${newStatus}.`);
      loadUsers();
    } catch (err: any) {
      toast.error('Failed to update user status.');
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ username: '', role: 'Admin', empName: '', status: 'Enabled', email: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (item: UserRecord) => {
    setEditingItem(item);
    setFormData({
      username: item.username,
      role: item.role || 'Admin',
      empName: item.empName || '',
      status: item.status || 'Enabled',
      email: item.email || '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.username.trim() || !formData.empName.trim()) {
      toast.error('Username and Employee Name are required.');
      return;
    }

    try {
      if (editingItem) {
        const targetId = editingItem.id || editingItem._id || '';
        await adminService.updateUser(targetId, formData);
        toast.success('User updated successfully.');
      } else {
        await adminService.createUser(formData);
        toast.success('User created successfully.');
      }
      setShowModal(false);
      loadUsers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save user.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-sm font-bold text-slate-900 m-0">System Users</h2>

      {/* Search filters card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
          <Input
            label="Username"
            type="text" 
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />

          <div>
            <label className="block mb-1.5">User Role</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="">--Select--</option>
                <option value="Admin">Admin</option>
                <option value="ESS">ESS</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <Input
            label="Employee Name"
            type="text" 
            value={searchEmpName}
            onChange={(e) => setSearchEmpName(e.target.value)}
          />

          <div>
            <label className="block mb-1.5">Status</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="">--Select Status--</option>
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button 
            onClick={handleReset}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Reset
          </button>
          <Button 
            variant="primary"
            size="md"
            className="px-6 cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table list card */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-500">({totalItems}) Records Found</span>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add User</span>
          </button>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-5 px-4 py-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Username</span>
          <span>User Role</span>
          <span>Employee Name</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows List */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="bg-white rounded-lg p-6 text-center text-xs font-bold text-slate-400">Loading system users...</div>
          ) : records.length > 0 ? (
            records.map((r) => {
              const recordId = r.id || r._id || '';
              return (
                <div 
                  key={recordId}
                  className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800 hover:border-slate-300 transition-all"
                >
                  <span className="truncate">{r.username}</span>
                  <span className="text-slate-500 font-semibold">{r.role}</span>
                  <span className="text-slate-500 font-semibold truncate">{r.empName}</span>
                  <span>
                    <button 
                      onClick={() => handleToggleStatus(r)}
                      title="Click to toggle status"
                      className="cursor-pointer"
                    >
                      <Badge variant={r.status === 'Enabled' ? 'success' : 'neutral'} size="sm">
                        {r.status}
                      </Badge>
                    </button>
                  </span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button 
                      onClick={() => handleOpenEdit(r)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(recordId, r.username)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-xs font-bold text-slate-400">
              No system users found.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? 'Edit System User' : 'Add System User'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. john_doe"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#0473b8]"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Employee Name *</label>
                <input
                  type="text"
                  value={formData.empName}
                  onChange={e => setFormData({ ...formData, empName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#0473b8]"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">User Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#0473b8]"
                >
                  <option value="Admin">Admin</option>
                  <option value="ESS">ESS</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#0473b8]"
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#0473b8]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
