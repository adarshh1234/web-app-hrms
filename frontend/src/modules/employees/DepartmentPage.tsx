import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import adminService, { DepartmentRecord } from '../../services/adminService';

export const DepartmentPage: React.FC = () => {
  const toast = useToast();
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDepartments();
      setDepartments(data || []);
    } catch (err: any) {
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      try {
        await adminService.deleteDepartment(id);
        setDepartments(departments.filter((d) => (d.id !== id && d._id !== id)));
        toast.success('Department deleted successfully.');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete department');
      }
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) {
      toast.error('Department name is required');
      return;
    }
    try {
      const created = await adminService.createDepartment({
        name: newDeptName.trim(),
        code: newDeptCode.trim() || 'DEPT',
        head: newDeptHead.trim() || 'Unassigned',
        employeeCount: 0,
      });
      setDepartments([created, ...departments]);
      setNewDeptName('');
      setNewDeptCode('');
      setNewDeptHead('');
      toast.success('Department added successfully.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add department');
    }
  };

  const filteredDepartments = departments.filter((d) =>
    (d.name || '').toLowerCase().includes(searchName.toLowerCase()) ||
    (d.code || '').toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 m-0">Department Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage company departments, codes, and department heads.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Add New Department</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Department Name</label>
            <input
              type="text"
              placeholder="e.g. Quality Assurance"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">Department Code</label>
            <input
              type="text"
              placeholder="e.g. QA"
              value={newDeptCode}
              onChange={(e) => setNewDeptCode(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)] font-mono"
            />
          </div>
          <div>
            <label className="block mb-1">Department Head</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={newDeptHead}
              onChange={(e) => setNewDeptHead(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Department</span>
            </button>
          </div>
        </form>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500">({filteredDepartments.length}) Departments Found</span>
          <input
            type="text"
            placeholder="Filter departments..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-[var(--primary-color)] w-full sm:w-64"
          />
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-750">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Department Name</th>
                  <th className="px-6 py-4">Head of Department</th>
                  <th className="px-6 py-4">No. of Staff</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-[#006666]">{dept.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        <span className="font-bold text-slate-800">{dept.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-600">{dept.head}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-700">{dept.employeeCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => toast.info(`Editing department ${dept.name}`)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id || dept._id || '')}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
