import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

interface UserRecord {
  id: string;
  username: string;
  role: string;
  empName: string;
  status: string;
}

export const UserManagementPage: React.FC = () => {
  const toast = useToast();
  const [searchUsername, setSearchUsername] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchEmpName, setSearchEmpName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const [records, setRecords] = useState<UserRecord[]>([
    { id: '1', username: '12345qwer', role: 'Admin', empName: 'abdelrahman 3535', status: 'Enabled' },
    { id: '2', username: '12345qwer', role: 'Admin', empName: 'abdelrahman 3535', status: 'Enabled' },
    { id: '3', username: '12345qwer', role: 'Admin', empName: 'abdelrahman 3535', status: 'Enabled' },
    { id: '4', username: '12345qwer', role: 'Admin', empName: 'abdelrahman 3535', status: 'Enabled' },
  ]);

  const handleReset = () => {
    setSearchUsername('');
    setSearchRole('');
    setSearchEmpName('');
    setSearchStatus('');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-sm font-bold text-slate-900 m-0">System Users</h2>

      {/* Search filters card */}
      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
          {/* Row 1 */}
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

          {/* Row 2 */}
          <Input
            label="Employee Name"
            type="text" 
            value={searchEmpName}
            onChange={(e) => setSearchEmpName(e.target.value)}
          />

          <Input
            label="Status"
            type="text" 
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button 
            onClick={handleReset}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
          >
            Reset
          </button>
          <Button 
            variant="primary"
            size="md"
            className="px-6"
            onClick={() => toast.info("Searching system users")}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table list card */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        
        {/* Info bar */}
        <div className="flex justify-between items-center pb-1">
          <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
          <button 
            onClick={() => toast.info("Add new system user")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Username</span>
          <span>User Role</span>
          <span>Employee Name</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows List */}
        <div className="space-y-1.5">
          {records.map((r) => (
            <div 
              key={r.id}
              className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
            >
              <span>{r.username}</span>
              <span className="text-slate-500 font-semibold">{r.role}</span>
              <span className="text-slate-500 font-semibold">{r.empName}</span>
              <span>
                <Badge variant={r.status === 'Enabled' ? 'success' : 'neutral'} size="sm">
                  {r.status}
                </Badge>
              </span>
              
              <div className="flex justify-end gap-2.5">
                <button 
                  onClick={() => toast.info(`Editing user #${r.id}`)}
                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(r.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
export default UserManagementPage;
