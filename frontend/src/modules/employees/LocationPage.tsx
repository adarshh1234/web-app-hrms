import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface LocationRecord {
  id: string;
  name: string;
  city: string;
  country: string;
  phone: string;
  employees: number;
}

export const LocationPage: React.FC = () => {
  const toast = useToast();
  const [locations, setLocations] = useState<LocationRecord[]>([
    { id: '1', name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 12 },
    { id: '2', name: 'Kochi Development Center', city: 'Kochi', country: 'India', phone: '91-484-259110', employees: 45 },
    { id: '3', name: 'London Regional Office', city: 'London', country: 'United Kingdom', phone: '44-20-7946-0912', employees: 18 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter((l) => l.id !== id));
      toast.success('Location deleted.');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCity.trim()) {
      toast.error('Location Name and City are required');
      return;
    }
    const newLoc: LocationRecord = {
      id: Date.now().toString(),
      name: newName,
      city: newCity,
      country: newCountry || 'USA',
      phone: '+1-555-0100',
      employees: 0
    };
    setLocations([...locations, newLoc]);
    setNewName('');
    setNewCity('');
    setNewCountry('');
    toast.success('Location added successfully.');
  };

  const filteredLocations = locations.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 m-0">Location Management</h1>
          <p className="text-xs text-slate-500 mt-1">Configure company office locations, branches, and regional hubs.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Add New Location</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Office Name</label>
            <input
              type="text"
              placeholder="e.g. New York Hub"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              placeholder="e.g. New York"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              placeholder="e.g. United States"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Location</span>
            </button>
          </div>
        </form>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500">({filteredLocations.length}) Locations Found</span>
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-[var(--primary-color)] w-full sm:w-64"
          />
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-750">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">City</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">No. of Employees</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLocations.map((loc) => (
                  <tr key={loc.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#006666]" />
                        <span>{loc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold">{loc.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold">{loc.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-500">{loc.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-700">{loc.employees}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => toast.info(`Editing location ${loc.name}`)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(loc.id)}
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

export default LocationPage;
