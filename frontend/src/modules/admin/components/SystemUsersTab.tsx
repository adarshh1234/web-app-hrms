import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../../components/common/Modal';
import Badge from '../../../components/common/Badge';
import { useToast } from '../../../hooks/useToast';

export const SystemUsersTab: React.FC = () => {
  const toast = useToast();
  const [users, setUsers] = useState([
    { username: 'admin', role: 'Admin', empName: 'Sarah Joseph', status: 'Enabled' },
    { username: 'huremaso_dev', role: 'Developer', empName: 'Amal Benny', status: 'Enabled' },
    { username: 'marketing_lead', role: 'Manager', empName: 'Sarah Johnson', status: 'Enabled' }
  ]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newUserRole, setNewUserRole] = useState('Admin');
  const [newEmpName, setNewEmpName] = useState('Sarah Johnson');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return;
    setUsers([...users, { username: newUsername, role: newUserRole, empName: newEmpName, status: 'Enabled' }]);
    setNewUsername('');
    setIsAddUserOpen(false);
    toast.success(`User ${newUsername} added successfully!`);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-slate-900">System Users</h3>
        <button 
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-1 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">User Role</th>
              <th className="px-6 py-4">Employee Name</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((usr) => (
              <tr key={usr.username} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-xs text-slate-655">{usr.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-700">{usr.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">{usr.empName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success" size="sm">
                    {usr.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Modal: Add User */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Add System User"
        footer={
          <>
            <button onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 cursor-pointer">Cancel</button>
            <button type="submit" form="add-user-form" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-lg text-sm font-semibold shadow-sm cursor-pointer">Save</button>
          </>
        }
      >
        <form id="add-user-form" onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Username *</label>
            <input 
              type="text" 
              required
              placeholder="Enter system username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">User Role</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>Staff</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Employee Name</label>
            <select
              value={newEmpName}
              onChange={(e) => setNewEmpName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            >
              <option>Sarah Johnson</option>
              <option>Michael Chen</option>
              <option>Lisa Anderson</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SystemUsersTab;
