import React, { useState, useEffect } from 'react';
import { Paintbrush } from 'lucide-react';
import { CorporateBranding } from '../../../types';
import adminService from '../../../services/adminService';
import { useToast } from '../../../hooks/useToast';

export const CorporateBrandingTab: React.FC = () => {
  const toast = useToast();
  const [branding, setBranding] = useState<CorporateBranding>({
    primaryColor: '#004848',
    primaryHoverColor: '#003333',
    primaryFontColor: '#ffffff',
    secondaryColor: '#f1f5f9',
    secondaryFontColor: '#1e293b',
    primaryGradientColor1: '#002222',
    primaryGradientColor2: '#007878'
  });

  useEffect(() => {
    setBranding(adminService.getBranding());
  }, []);

  const handleApplyBranding = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.updateBranding(branding);
    toast.success("Corporate branding updated! Styles applied dynamically across the app shell.");
  };

  const handleResetBranding = () => {
    const defaultBranding = {
      primaryColor: '#004848',
      primaryHoverColor: '#003333',
      primaryFontColor: '#ffffff',
      secondaryColor: '#f1f5f9',
      secondaryFontColor: '#1e293b',
      primaryGradientColor1: '#002222',
      primaryGradientColor2: '#007878'
    };
    setBranding(defaultBranding);
    adminService.updateBranding(defaultBranding);
    toast.info("Branding reset to system default!");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm max-w-xl animate-fade-in">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
        <Paintbrush className="h-5 w-5 text-[var(--primary-color)]" />
        <h3 className="text-base font-bold text-slate-900">Corporate Branding</h3>
      </div>

      <form onSubmit={handleApplyBranding} className="space-y-4 text-xs font-semibold text-slate-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Primary Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={branding.primaryColor}
                onChange={(e) => setBranding({...branding, primaryColor: e.target.value, primaryHoverColor: e.target.value})}
                className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
              />
              <input 
                type="text" 
                value={branding.primaryColor}
                onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Primary Font Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={branding.primaryFontColor}
                onChange={(e) => setBranding({...branding, primaryFontColor: e.target.value})}
                className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
              />
              <input 
                type="text" 
                value={branding.primaryFontColor}
                onChange={(e) => setBranding({...branding, primaryFontColor: e.target.value})}
                className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Primary Gradient Color 1</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={branding.primaryGradientColor1}
                onChange={(e) => setBranding({...branding, primaryGradientColor1: e.target.value})}
                className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
              />
              <input 
                type="text" 
                value={branding.primaryGradientColor1}
                className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Primary Gradient Color 2</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={branding.primaryGradientColor2}
                onChange={(e) => setBranding({...branding, primaryGradientColor2: e.target.value})}
                className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
              />
              <input 
                type="text" 
                value={branding.primaryGradientColor2}
                className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Secondary Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={branding.secondaryColor}
                onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
              />
              <input 
                type="text" 
                value={branding.secondaryColor}
                className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Secondary Font Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={branding.secondaryFontColor}
                onChange={(e) => setBranding({...branding, secondaryFontColor: e.target.value})}
                className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
              />
              <input 
                type="text" 
                value={branding.secondaryFontColor}
                className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Logo details */}
        <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50 space-y-2">
          <span className="block text-xs font-bold text-slate-800">Client Logo File Upload</span>
          <p className="text-[10px] text-slate-400">Accepts .jpg, .png, .gif, .svg up to 1MB. Recommended dimensions: 50px X 50px</p>
          <button type="button" onClick={() => toast.info("Browse Logo file")} className="px-3 py-1.5 border border-slate-200 rounded text-[10px] bg-white font-bold text-slate-700 cursor-pointer">Browse</button>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button type="button" onClick={handleResetBranding} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer">Reset to Default</button>
          <button type="button" onClick={handleApplyBranding} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 cursor-pointer">Preview</button>
          <button type="submit" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer">Publish</button>
        </div>
      </form>
    </div>
  );
};

export default CorporateBrandingTab;
