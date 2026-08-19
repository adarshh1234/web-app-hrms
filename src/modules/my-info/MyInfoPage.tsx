import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, ChevronDown, Paperclip } from 'lucide-react';

export const MyInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'personal' 
    | 'contact' 
    | 'emergency' 
    | 'dependents' 
    | 'immigration' 
    | 'job' 
    | 'salary' 
    | 'report-to' 
    | 'qualifications' 
    | 'memberships'
  >('personal');

  // Personal Details states
  const [firstName, setFirstName] = useState('Sarah');
  const [middleName, setMiddleName] = useState('Jane');
  const [lastName, setLastName] = useState('Johnson');
  const [empId, setEmpId] = useState('EMP329556');
  const [otherId, setOtherId] = useState('OTH-90823');
  const [driverLicense, setDriverLicense] = useState('DL-9082312A');
  const [licenseExpiry, setLicenseExpiry] = useState('2029-05-18');
  const [nationality, setNationality] = useState('Canadian');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [dob, setDob] = useState('1994-08-12');
  const [gender, setGender] = useState('Female');

  // Custom Fields
  const [bloodType, setBloodType] = useState('O+');
  const [testField, setTestField] = useState('Custom Value');

  // Contact Details states
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

  // Assigned Emergency Contacts state
  const [emergencyContacts, setEmergencyContacts] = useState<{ name: string; relationship: string; mobile: string; altPhone: string }[]>([]);

  // Assigned Dependents state
  const [dependents, setDependents] = useState<{ name: string; relationship: string; dob: string }[]>([]);

  // Assigned Immigration Records state
  const [immigrationRecords, setImmigrationRecords] = useState([
    { doc: 'Passport', number: '34', issuedBy: 'Romania', issuedDate: '2019-10-10', expiryDate: '2019-10-10' }
  ]);

  // Job details states
  const [joinedDate, setJoinedDate] = useState('2024-01-15');
  const [jobTitle, setJobTitle] = useState('Software Architect');
  const [jobSpecification, setJobSpecification] = useState('Technical Design & Architecture');
  const [jobCategory, setJobCategory] = useState('Professional');
  const [subUnit, setSubUnit] = useState('Engineering');
  const [location, setLocation] = useState('Canadian Regional HQ');
  const [empStatus, setEmpStatus] = useState('Full-Time Permanent');
  const [jobToggled, setJobToggled] = useState(true);

  // Salary details states
  const [salaryComponents, setSalaryComponents] = useState<{ component: string; amount: string; currency: string; frequency: string; deposit: string }[]>([]);

  // Supervisors / Subordinates state
  const [supervisors, setSupervisors] = useState<{ name: string; method: string }[]>([]);
  const [subordinates, setSubordinates] = useState<{ name: string; method: string }[]>([]);

  // Qualifications states
  const [workExperiences, setWorkExperiences] = useState<{ company: string; title: string; from: string; to: string; comment: string }[]>([]);
  const [educations, setEducations] = useState<{ level: string; year: string; gpa: string; addedDate: string; addedBy: string }[]>([]);
  const [skills, setSkills] = useState<{ skill: string; expYears: string }[]>([]);
  const [languages, setLanguages] = useState<{ language: string; fluency: string; competency: string; comments: string }[]>([]);
  const [licenses, setLicenses] = useState<{ type: string; issuedDate: string; expiryDate: string }[]>([]);

  // Memberships state
  const [memberships, setMemberships] = useState<{ membership: string; paidBy: string; amount: string; currency: string; commenceDate: string }[]>([]);

  const handleDeleteImmigration = (index: number) => {
    if (confirm("Delete this immigration record?")) {
      setImmigrationRecords(immigrationRecords.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Two Column Page Layout matching Figma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Profile Sidebar (width 3/12 grid span) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center gap-6">
          
          {/* Avatar container with blue overlay Add button */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-slate-100 border border-slate-205 overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={() => alert("Upload new avatar photo")}
              className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md cursor-pointer border-2 border-white transition-colors"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="text-center space-y-1 select-none font-bold text-xs">
            <h2 className="text-sm font-bold text-slate-905 m-0">{firstName} {lastName}</h2>
            <p className="text-[10px] font-bold text-slate-400">Software Architect · ID: {empId}</p>
          </div>

          {/* Navigation vertical menu */}
          <div className="w-full space-y-1 text-xs font-bold text-slate-700">
            {[
              { id: 'personal', label: 'Personal Details' },
              { id: 'contact', label: 'Contact Details' },
              { id: 'emergency', label: 'Emergency Contacts' },
              { id: 'dependents', label: 'Dependents' },
              { id: 'immigration', label: 'Immigration' },
              { id: 'job', label: 'Job' },
              { id: 'salary', label: 'Salary' },
              { id: 'report-to', label: 'Report to' },
              { id: 'qualifications', label: 'Qualifications' },
              { id: 'memberships', label: 'Memberships' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
                    : 'bg-white text-slate-500 border border-transparent hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Right Column Form & Cards view (width 9/12 grid span) */}
        <div className="lg:col-span-9 space-y-6">

          {/* Tab Panel 1: Personal Details */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              
              {/* Form Card */}
              <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
                  <div className="md:col-span-3">
                    <label className="block mb-1.5">Employee Name</label>
                    <div className="grid grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                      <input 
                        type="text" 
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        placeholder="Middle Name"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block mb-1.5">Employee ID</label>
                    <input 
                      type="text" 
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5">Other ID</label>
                    <input 
                      type="text" 
                      value={otherId}
                      onChange={(e) => setOtherId(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block mb-1.5">Driver's License Number</label>
                    <input 
                      type="text" 
                      value={driverLicense}
                      onChange={(e) => setDriverLicense(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5">License Expiry Date</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <input 
                        type="date"
                        value={licenseExpiry}
                        onChange={(e) => setLicenseExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
                      />
                      <div className="absolute right-3 pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block mb-1.5">Nationality</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <select
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                      >
                        <option value="Canadian">Canadian</option>
                        <option value="American">American</option>
                        <option value="Romanian">Romanian</option>
                      </select>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5">Marital Status</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <select
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block mb-1.5">Date of Birth</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <input 
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 text-slate-950 outline-none text-xs font-semibold"
                      />
                      <div className="absolute right-3 pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5">Gender</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => alert("Personal details configuration saved!")}
                    className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>

              </div>

              {/* Custom Fields Card */}
              <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
                <h4 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Custom Fields</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block mb-1.5">Blood Type</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <select
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                      >
                        <option value="O+">O+</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                      </select>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5">Test_Field</label>
                    <input 
                      type="text" 
                      value={testField}
                      onChange={(e) => setTestField(e.target.value)}
                      className="w-full rounded-lg border border-slate-205 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => alert("Custom fields configuration updated!")}
                    className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Attachments Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
                  <span className="text-sm font-bold text-slate-850">Attachments</span>
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    (1) Record Found
                  </div>

                  <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
                    <span>File Name</span>
                    <span>Description</span>
                    <span>Size</span>
                    <span>Type</span>
                    <span>Date Added</span>
                    <span>Added By</span>
                    <span className="text-right">Action</span>
                  </div>

                  <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
                    <span className="text-slate-700"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <div className="flex justify-end gap-3 text-slate-400 pr-1">
                      <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 2: Contact Details */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Contact Details</h3>
                
                <div className="space-y-4">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Address</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
                    <div>
                      <label className="block mb-1.5">Street 1</label>
                      <input 
                        type="text" 
                        value={street1}
                        onChange={(e) => setStreet1(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">Street 2</label>
                      <input 
                        type="text" 
                        value={street2}
                        onChange={(e) => setStreet2(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">City</label>
                      <input 
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
                    <div>
                      <label className="block mb-1.5">State/Province</label>
                      <input 
                        type="text" 
                        value={stateProv}
                        onChange={(e) => setStateProv(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">Zip/Postal Code</label>
                      <input 
                        type="text" 
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">Country</label>
                      <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                        >
                          <option value="India">India</option>
                          <option value="Canada">Canada</option>
                        </select>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                          <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Telephone</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
                    <div>
                      <label className="block mb-1.5">Home</label>
                      <input 
                        type="text" 
                        value={phoneHome}
                        onChange={(e) => setPhoneHome(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">Mobile</label>
                      <input 
                        type="text" 
                        value={phoneMobile}
                        onChange={(e) => setPhoneMobile(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">Work</label>
                      <input 
                        type="text" 
                        value={phoneWork}
                        onChange={(e) => setPhoneWork(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Email</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                    <div>
                      <label className="block mb-1.5">Work Email</label>
                      <input 
                        type="email" 
                        value={emailWork}
                        onChange={(e) => setEmailWork(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">Other Email</label>
                      <input 
                        type="email" 
                        value={emailOther}
                        onChange={(e) => setEmailOther(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => alert("Contact details saved successfully!")}
                    className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>

              </div>

              {/* Attachments Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
                  <span className="text-sm font-bold text-slate-850">Attachments</span>
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    (1) Record Found
                  </div>

                  <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
                    <span>File Name</span>
                    <span>Description</span>
                    <span>Size</span>
                    <span>Type</span>
                    <span>Date Added</span>
                    <span>Added By</span>
                    <span className="text-right">Action</span>
                  </div>

                  <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
                    <span className="text-slate-700"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <div className="flex justify-end gap-3 text-slate-400 pr-1">
                      <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 3: Emergency Contacts */}
          {activeTab === 'emergency' && (
            <div className="space-y-6">
              
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Assigned Emergency Contacts</span>
                  
                  <button 
                    onClick={() => alert("Add emergency contact")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  No Records Found
                </div>

                {/* Columns */}
                <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Name</span>
                  <span>Relationship</span>
                  <span>Mobile</span>
                  <span>Alternate Number</span>
                  <span className="text-right">Action</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
                  No emergency contacts assigned yet.
                </div>
              </div>

              {/* Attachments Card */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Attachments</span>
                  
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  (1) Record Found
                </div>

                <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>File Name</span>
                  <span className="col-span-2">Description</span>
                  <span>Size</span>
                  <span>Type</span>
                  <span>Date Added</span>
                  <span className="text-right">Actions</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No attachments loaded.
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 4: Dependents */}
          {activeTab === 'dependents' && (
            <div className="space-y-6">
              
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Assigned Assigned Dependents</span>
                  
                  <button 
                    onClick={() => alert("Add dependent")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  No Records Found
                </div>

                {/* Columns */}
                <div className="grid grid-cols-4 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Name</span>
                  <span>Relationship</span>
                  <span>Date of Birth</span>
                  <span className="text-right">Action</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
                  No dependents assigned yet.
                </div>
              </div>

              {/* Attachments Card */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Attachments</span>
                  
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  (1) Record Found
                </div>

                <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>File Name</span>
                  <span className="col-span-2">Description</span>
                  <span>Size</span>
                  <span>Type</span>
                  <span>Date Added</span>
                  <span className="text-right">Actions</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No attachments loaded.
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 5: Immigration */}
          {activeTab === 'immigration' && (
            <div className="space-y-6">
              
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Assigned Immigration Records</span>
                  
                  <button 
                    onClick={() => alert("Add immigration record")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  ({immigrationRecords.length}) Record Found
                </div>

                {/* Columns */}
                <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Document</span>
                  <span>Number</span>
                  <span>Issued By</span>
                  <span>Issued Date</span>
                  <span>Expiry Date</span>
                  <span className="text-right">Action</span>
                </div>

                {/* Rows */}
                <div className="space-y-1.5">
                  {immigrationRecords.map((r, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-805"
                    >
                      <span>{r.doc}</span>
                      <span className="text-slate-550 font-semibold">{r.number}</span>
                      <span className="text-slate-550 font-semibold">{r.issuedBy}</span>
                      <span className="text-slate-550 font-semibold">{r.issuedDate}</span>
                      <span className="text-slate-550 font-semibold">{r.expiryDate}</span>
                      
                      <div className="flex justify-end gap-2.5">
                        <button onClick={() => alert(`Edit immigration record #${index}`)} className="p-1 text-slate-400 hover:text-blue-600">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDeleteImmigration(index)} className="p-1 text-slate-400 hover:text-rose-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments Card */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Attachments</span>
                  
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  (1) Record Found
                </div>

                <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>File Name</span>
                  <span className="col-span-2">Description</span>
                  <span>Size</span>
                  <span>Type</span>
                  <span>Date Added</span>
                  <span className="text-right">Actions</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No attachments loaded.
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 6: Job (Image 1 of this turn) */}
          {activeTab === 'job' && (
            <div className="space-y-6">
              
              {/* Form Card */}
              <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Job Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
                  {/* Joined Date */}
                  <div>
                    <label className="block mb-1.5">Joined Date</label>
                    <input 
                      type="text" 
                      value={joinedDate}
                      onChange={(e) => setJoinedDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block mb-1.5">Job Title</label>
                    <input 
                      type="text" 
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>

                  {/* Job Specification */}
                  <div>
                    <label className="block mb-1.5">Job Specification</label>
                    <input 
                      type="text" 
                      value={jobSpecification}
                      onChange={(e) => setJobSpecification(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
                  {/* Job Category */}
                  <div>
                    <label className="block mb-1.5">Job Category</label>
                    <input 
                      type="text" 
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>

                  {/* Sub Unit */}
                  <div>
                    <label className="block mb-1.5">Sub Unit</label>
                    <input 
                      type="text" 
                      value={subUnit}
                      onChange={(e) => setSubUnit(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block mb-1.5">Location</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                      >
                        <option value="Canadian Regional HQ">Canadian Regional HQ</option>
                      </select>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
                  {/* Employment Status */}
                  <div>
                    <label className="block mb-1.5">Employment Status</label>
                    <input 
                      type="text" 
                      value={empStatus}
                      onChange={(e) => setEmpStatus(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setJobToggled(!jobToggled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                      jobToggled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      jobToggled ? 'translate-x-5' : ''
                    }`} />
                  </button>
                </div>

              </div>

              {/* Attachments Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
                  <span className="text-sm font-bold text-slate-850">Attachments</span>
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    (1) Record Found
                  </div>

                  <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
                    <span>File Name</span>
                    <span>Description</span>
                    <span>Size</span>
                    <span>Type</span>
                    <span>Date Added</span>
                    <span>Added By</span>
                    <span className="text-right">Action</span>
                  </div>

                  <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
                    <span className="text-slate-700"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <div className="flex justify-end gap-3 text-slate-400 pr-1">
                      <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 7: Salary (Image 2 of this turn) */}
          {activeTab === 'salary' && (
            <div className="space-y-6">
              
              {/* Assigned Salary Components Table Card */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Assigned Salary Components</span>
                  
                  <button 
                    onClick={() => alert("Add salary component")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-slate-400">
                  No Records Found
                </div>

                {/* Columns */}
                <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Salary Component</span>
                  <span>Amount</span>
                  <span>Currency</span>
                  <span>Pay Frequency</span>
                  <span className="text-right">Direct Deposit Amount</span>
                </div>

                {/* Empty body */}
                <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
                  No salary components configured.
                </div>
              </div>

              {/* Attachments Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
                  <span className="text-sm font-bold text-slate-850">Attachments</span>
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    (1) Record Found
                  </div>

                  <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
                    <span>File Name</span>
                    <span>Description</span>
                    <span>Size</span>
                    <span>Type</span>
                    <span>Date Added</span>
                    <span>Added By</span>
                    <span className="text-right">Action</span>
                  </div>

                  <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
                    <span className="text-slate-700"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <div className="flex justify-end gap-3 text-slate-400 pr-1">
                      <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 8: Report to (Image 3 of this turn) */}
          {activeTab === 'report-to' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Report to</h3>
              
              {/* Card 1: Assigned Supervisors */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Assigned Supervisors</span>
                  <button 
                    onClick={() => alert("Add supervisor")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">No Records Found</div>
                
                <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Name</span>
                  <span className="text-right">Reporting Method</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
                  No supervisors assigned.
                </div>
              </div>

              {/* Card 2: Assigned Subordinates */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Assigned Subordinates</span>
                  <button 
                    onClick={() => alert("Add subordinate")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">No Records Found</div>
                
                <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Name</span>
                  <span className="text-right">Reporting Method</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
                  No subordinates assigned.
                </div>
              </div>

              {/* Attachments Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
                  <span className="text-sm font-bold text-slate-850">Attachments</span>
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    (1) Record Found
                  </div>

                  <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
                    <span>File Name</span>
                    <span>Description</span>
                    <span>Size</span>
                    <span>Type</span>
                    <span>Date Added</span>
                    <span>Added By</span>
                    <span className="text-right">Action</span>
                  </div>

                  <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
                    <span className="text-slate-700"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <div className="flex justify-end gap-3 text-slate-400 pr-1">
                      <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 9: Qualifications (Image 4 of this turn) */}
          {activeTab === 'qualifications' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Qualifications</h3>
              
              {/* Stacked Qualification tables */}

              {/* Work Experience */}
              <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Work Experience</span>
                  <button onClick={() => alert("Add work experience")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
                <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Company</span>
                  <span>Job Title</span>
                  <span>From</span>
                  <span>To</span>
                  <span>Comment</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No work experience records configured.
                </div>
              </div>

              {/* Education */}
              <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Education</span>
                  <button onClick={() => alert("Add education")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
                <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Level</span>
                  <span>Year</span>
                  <span>GPA/Score</span>
                  <span>Date Added</span>
                  <span>Added By</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No education records configured.
                </div>
              </div>

              {/* Skill */}
              <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Skill</span>
                  <button onClick={() => alert("Add skill")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
                <div className="grid grid-cols-3 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Skill</span>
                  <span>Years of Experience</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No skill records configured.
                </div>
              </div>

              {/* Languages */}
              <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Languages</span>
                  <button onClick={() => alert("Add language")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
                <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Language</span>
                  <span>Fluency</span>
                  <span>Competency</span>
                  <span>Comments</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No language records configured.
                </div>
              </div>

              {/* License */}
              <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">License</span>
                  <button onClick={() => alert("Add license")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
                <div className="grid grid-cols-4 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>License Type</span>
                  <span>Issued Date</span>
                  <span>Expiry Date</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No licenses registered.
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-755">Attachments</span>
                  <button onClick={() => alert("Add attachment")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
                <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>File Name</span>
                  <span className="col-span-2">Description</span>
                  <span>Size</span>
                  <span>Type</span>
                  <span>Date Added</span>
                  <span className="text-right">Actions</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
                  No qualification attachments.
                </div>
              </div>

            </div>
          )}

          {/* Tab Panel 10: Memberships (Image 5 of this turn) */}
          {activeTab === 'memberships' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Memberships</h3>
              
              {/* Assigned Memberships */}
              <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-bold text-slate-705">Assigned Memberships</span>
                  <button 
                    onClick={() => alert("Add membership")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>

                <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span>Membership</span>
                  <span>Subscription Paid By</span>
                  <span>Subscription Amount</span>
                  <span>Currency</span>
                  <span>Subscription Commence Date</span>
                  <span className="text-right">Action</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
                  No memberships assigned.
                </div>
              </div>

              {/* Attachments Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
                  <span className="text-sm font-bold text-slate-850">Attachments</span>
                  <button 
                    onClick={() => alert("Add attachment")}
                    className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    (1) Record Found
                  </div>

                  <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
                    <span>File Name</span>
                    <span>Description</span>
                    <span>Size</span>
                    <span>Type</span>
                    <span>Date Added</span>
                    <span>Added By</span>
                    <span className="text-right">Action</span>
                  </div>

                  <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
                    <span className="text-slate-700"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <span className="text-slate-400 font-semibold"></span>
                    <div className="flex justify-end gap-3 text-slate-400 pr-1">
                      <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                      <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default MyInfoPage;
