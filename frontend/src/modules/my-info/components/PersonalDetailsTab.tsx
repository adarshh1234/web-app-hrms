import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const PersonalDetailsTab: React.FC = () => {
  const toast = useToast();
  const [firstName, setFirstName] = useState('Sarah');
  const [middleName, setMiddleName] = useState('Jane');
  const [lastName, setLastName] = useState('Johnson');
  const [empId] = useState('EMP329556');
  const [otherId, setOtherId] = useState('OTH-90823');
  const [driverLicense, setDriverLicense] = useState('DL-9082312A');
  const [licenseExpiry, setLicenseExpiry] = useState('2029-05-18');
  const [nationality, setNationality] = useState('Canadian');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [dob, setDob] = useState('1994-08-12');
  const [gender, setGender] = useState('Female');
  const [bloodType, setBloodType] = useState('O+');
  const [customField, setCustomField] = useState('Custom Value');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Personal details saved successfully!');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Personal Details
        </h3>

        {/* Full Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
          <div>
            <label className="block mb-1.5">Middle Name</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
          <div>
            <label className="block mb-1.5">Last Name *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
        </div>

        {/* IDs & Licenses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Employee ID</label>
            <input
              type="text"
              disabled
              value={empId}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 font-semibold text-xs outline-none"
            />
          </div>
          <div>
            <label className="block mb-1.5">Other ID</label>
            <input
              type="text"
              value={otherId}
              onChange={(e) => setOtherId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
          <div>
            <label className="block mb-1.5">Driver's License Number</label>
            <input
              type="text"
              value={driverLicense}
              onChange={(e) => setDriverLicense(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
        </div>

        {/* Expiry, Nationality, Marital Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">License Expiry Date</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={licenseExpiry}
                onChange={(e) => setLicenseExpiry(e.target.value)}
                className="w-full px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Nationality</label>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none bg-white"
            >
              <option value="Canadian">Canadian</option>
              <option value="American">American</option>
              <option value="Indian">Indian</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5">Marital Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none bg-white"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Date of Birth</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Gender</label>
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Female</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Male</span>
              </label>
            </div>
          </div>
        </div>

        {/* Custom Fields Section */}
        <div className="border-t border-slate-100 pt-4 space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1.5">Blood Type</label>
              <input
                type="text"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5">Custom Field</label>
              <input
                type="text"
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Save Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetailsTab;
