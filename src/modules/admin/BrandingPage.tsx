import React, { useState } from 'react';

export const BrandingPage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#e0e0e0');
  const [secondaryColor, setSecondaryColor] = useState('#e0e0e0');
  const [primaryFontColor, setPrimaryFontColor] = useState('#e0e0e0');
  const [secondaryFontColor, setSecondaryFontColor] = useState('#e0e0e0');
  const [gradient1, setGradient1] = useState('#e0e0e0');
  const [gradient2, setGradient2] = useState('#e0e0e0');

  // File labels
  const [logoFile, setLogoFile] = useState('No file selected');
  const [bannerFile, setBannerFile] = useState('No file selected');
  const [loginBannerFile, setLoginBannerFile] = useState('No file selected');
  const [socialMediaToggled, setSocialMediaToggled] = useState(true);

  const handleReset = () => {
    setPrimaryColor('#e0e0e0');
    setSecondaryColor('#e0e0e0');
    setPrimaryFontColor('#e0e0e0');
    setSecondaryFontColor('#e0e0e0');
    setGradient1('#e0e0e0');
    setGradient2('#e0e0e0');
    setLogoFile('No file selected');
    setBannerFile('No file selected');
    setLoginBannerFile('No file selected');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-sm font-bold text-slate-900 m-0">Corporate Branding</h2>

      {/* Main Form container card */}
      <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
        
        {/* Colors Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
          
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
                  value={primaryColor.startsWith('#') ? primaryColor : '#e0e0e0'}
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
                  value={primaryFontColor.startsWith('#') ? primaryFontColor : '#e0e0e0'}
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
                  value={gradient1.startsWith('#') ? gradient1 : '#e0e0e0'}
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
                  value={secondaryColor.startsWith('#') ? secondaryColor : '#e0e0e0'}
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
                  value={secondaryFontColor.startsWith('#') ? secondaryFontColor : '#e0e0e0'}
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
                  value={gradient2.startsWith('#') ? gradient2 : '#e0e0e0'}
                  onChange={(e) => setGradient2(e.target.value)}
                  className="w-10 h-8 border border-slate-200 rounded-md cursor-pointer bg-transparent"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Separator line */}
        <div className="border-t border-slate-100 my-6"></div>

        {/* File upload inputs Section matching Image 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
          {/* Client Logo */}
          <div className="space-y-2">
            <label className="block">Client Logo</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => setLogoFile('logo.png')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border-r border-slate-200 transition-colors"
              >
                Browse
              </button>
              <span className="px-4 text-slate-500 font-semibold">{logoFile}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-normal">
              Accepts .jpg, .png, .gif, .svg up to 1MB. Recommended dimensions: 50px X 50px
            </p>
          </div>

          {/* Client Banner */}
          <div className="space-y-2">
            <label className="block">Client Banner</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => setBannerFile('banner.png')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border-r border-slate-200 transition-colors"
              >
                Browse
              </button>
              <span className="px-4 text-slate-500 font-semibold">{bannerFile}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-normal">
              Accepts .jpg, .png, .gif, .svg up to 1MB. Recommended dimensions: 182px X 50px
            </p>
          </div>
        </div>

        {/* Lower Files Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
          {/* Login Banner */}
          <div className="space-y-2">
            <label className="block">Login Banner</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => setLoginBannerFile('login_banner.png')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border-r border-slate-200 transition-colors"
              >
                Browse
              </button>
              <span className="px-4 text-slate-500 font-semibold">{loginBannerFile}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-normal">
              Accepts .jpg, .png, .gif, .svg up to 1MB. Recommended dimensions: 182px X 50px
            </p>
          </div>

          {/* Social Media Images Toggle */}
          <div className="space-y-3">
            <label className="block">Social Media Images</label>
            <button 
              onClick={() => setSocialMediaToggled(!socialMediaToggled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                socialMediaToggled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                socialMediaToggled ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>
        </div>

      </div>

      {/* Footer controls layout */}
      <div className="flex justify-end gap-3 pt-4">
        <button 
          onClick={handleReset}
          className="px-5 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          Reset to Default
        </button>
        <button 
          onClick={() => alert("Previewing branding changes")}
          className="px-5 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          Preview
        </button>
        <button 
          onClick={() => alert("Corporate branding configuration saved and published!")}
          className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Publish
        </button>
      </div>

    </div>
  );
};
export default BrandingPage;
