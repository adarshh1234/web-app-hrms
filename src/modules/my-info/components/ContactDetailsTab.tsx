import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

export const ContactDetailsTab: React.FC = () => {
  const toast = useToast();
  const [street1, setStreet1] = useState('324 Park Street');
  const [street2, setStreet2] = useState('Flat 4B');
  const [city, setCity] = useState('Kochi');
  const [stateProv, setStateProv] = useState('Kerala');
  const [zipCode, setZipCode] = useState('682030');
  const [country, setCountry] = useState('India');
  const [phoneHome, setPhoneHome] = useState('91-484-259110');
  const [phoneMobile, setPhoneMobile] = useState('+91-9876543210');
  const [phoneWork, setPhoneWork] = useState('91-484-259112');
  const [emailWork, setEmailWork] = useState('sarah.johnson@huremaso.com');
  const [emailOther, setEmailOther] = useState('sarah.j.personal@mail.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Contact details updated successfully!');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Contact Details
        </h3>

        {/* Address Fields */}
        <div className="space-y-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Street 1</label>
            <input
              type="text"
              value={street1}
              onChange={(e) => setStreet1(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>

          <div>
            <label className="block mb-1.5">Street 2</label>
            <input
              type="text"
              value={street2}
              onChange={(e) => setStreet2(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1.5">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5">State / Province</label>
              <input
                type="text"
                value={stateProv}
                onChange={(e) => setStateProv(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5">Zip / Postal Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none bg-white"
            >
              <option value="India">India</option>
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </select>
          </div>
        </div>

        {/* Telephone & Email Fields */}
        <div className="border-t border-slate-100 pt-4 space-y-4 text-xs font-bold text-slate-700">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telephone & Email</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1.5">Home Telephone</label>
              <input
                type="text"
                value={phoneHome}
                onChange={(e) => setPhoneHome(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5">Mobile Telephone</label>
              <input
                type="text"
                value={phoneMobile}
                onChange={(e) => setPhoneMobile(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5">Work Telephone</label>
              <input
                type="text"
                value={phoneWork}
                onChange={(e) => setPhoneWork(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5">Work Email</label>
              <input
                type="email"
                value={emailWork}
                onChange={(e) => setEmailWork(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-semibold text-xs outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5">Other Email</label>
              <input
                type="email"
                value={emailOther}
                onChange={(e) => setEmailOther(e.target.value)}
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
            Save Contact Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactDetailsTab;
