import React, { useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import adminService from '../../services/adminService';

export const BrandingPage: React.FC = () => {
  const toast = useToast();
  const [primaryColor, setPrimaryColor] = useState('#004848');
  const [secondaryColor, setSecondaryColor] = useState('#f1f5f9');
  const [primaryFontColor, setPrimaryFontColor] = useState('#ffffff');
  const [secondaryFontColor, setSecondaryFontColor] = useState('#1e293b');
  const [gradient1, setGradient1] = useState('#002222');
  const [gradient2, setGradient2] = useState('#007878');

  const [logoFile, setLogoFile] = useState('No file selected');
  const [bannerFile, setBannerFile] = useState('No file selected');
  const [loginBannerFile, setLoginBannerFile] = useState('No file selected');
  const [socialMediaToggled, setSocialMediaToggled] = useState(true);

  useEffect(() => {
    adminService.getBranding().then((b) => {
      if (b.primaryColor) setPrimaryColor(b.primaryColor);
      if (b.secondaryColor) setSecondaryColor(b.secondaryColor);
      if (b.primaryFontColor) setPrimaryFontColor(b.primaryFontColor);
      if (b.secondaryFontColor) setSecondaryFontColor(b.secondaryFontColor);
      if (b.gradient1) setGradient1(b.gradient1);
      else if (b.primaryGradientColor1) setGradient1(b.primaryGradientColor1);
      if (b.gradient2) setGradient2(b.gradient2);
      else if (b.primaryGradientColor2) setGradient2(b.primaryGradientColor2);
    });
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      await adminService.updateBranding({
        primaryColor,
        secondaryColor,
        primaryFontColor,
        secondaryFontColor,
        gradient1,
        gradient2,
        socialMediaToggled,
      });
      toast.success('Corporate Branding updated & persisted successfully!');
    } catch (err) {
      toast.error('Failed to update corporate branding.');
    }
  };

  const handleReset = () => {
    setPrimaryColor('#004848');
    setSecondaryColor('#f1f5f9');
    setPrimaryFontColor('#ffffff');
    setSecondaryFontColor('#1e293b');
    setGradient1('#002222');
    setGradient2('#007878');
    setLogoFile('No file selected');
    setBannerFile('No file selected');
    setLoginBannerFile('No file selected');
    adminService.updateBranding({
      primaryColor: '#004848',
      secondaryColor: '#f1f5f9',
      primaryFontColor: '#ffffff',
      secondaryFontColor: '#1e293b',
      gradient1: '#002222',
      gradient2: '#007878',
      socialMediaToggled: true,
    });
    toast.info('Branding reset to default theme.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-sm font-bold text-slate-900 m-0">Corporate Branding</h2>

      {/* Main Form container card */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        
        {/* Colors Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1.5">Primary Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
                <input 
                  type="color" 
                  value={primaryColor.startsWith('#') ? primaryColor : '#004848'}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Primary Font Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={primaryFontColor}
                  onChange={(e) => setPrimaryFontColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
                <input 
                  type="color" 
                  value={primaryFontColor.startsWith('#') ? primaryFontColor : '#ffffff'}
                  onChange={(e) => setPrimaryFontColor(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Primary Gradient Color 1</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={gradient1}
                  onChange={(e) => setGradient1(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
                <input 
                  type="color" 
                  value={gradient1.startsWith('#') ? gradient1 : '#002222'}
                  onChange={(e) => setGradient1(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1.5">Secondary Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
                <input 
                  type="color" 
                  value={secondaryColor.startsWith('#') ? secondaryColor : '#f1f5f9'}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Secondary Font Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={secondaryFontColor}
                  onChange={(e) => setSecondaryFontColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
                <input 
                  type="color" 
                  value={secondaryFontColor.startsWith('#') ? secondaryFontColor : '#1e293b'}
                  onChange={(e) => setSecondaryFontColor(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Primary Gradient Color 2</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={gradient2}
                  onChange={(e) => setGradient2(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
                <input 
                  type="color" 
                  value={gradient2.startsWith('#') ? gradient2 : '#007878'}
                  onChange={(e) => setGradient2(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            Reset
          </button>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandingPage;
