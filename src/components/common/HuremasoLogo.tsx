import React from 'react';

interface HuremasoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HuremasoLogo: React.FC<HuremasoLogoProps> = ({ className = '', size = 'lg' }) => {
  const sizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-[32px]',
    xl: 'text-[42px]',
  };

  const lineSizeMap = {
    sm: 'left-[-2px] w-[12px] h-[2px]',
    md: 'left-[-3px] w-[16px] h-[2.5px]',
    lg: 'left-[-4px] w-[22px] h-[3.5px]',
    xl: 'left-[-5px] w-[28px] h-[4.5px]',
  };

  return (
    <div className={`flex items-center justify-center select-none text-[#006666] font-normal tracking-tight font-sans ${sizeMap[size]} ${className}`}>
      <span>HUR</span>
      <span className="relative flex items-center justify-center">
        E
        <span className={`absolute top-[46%] ${lineSizeMap[size]} bg-black rounded-xs z-10`}></span>
      </span>
      <span className="text-[#3c3c3c] font-normal pl-0.5">MASO</span>
    </div>
  );
};

export default HuremasoLogo;
