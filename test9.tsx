import React, { useState, useRef, useEffect } from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const CustomSelect = ({ value, onChange, options, iconComponent: Icon, labels, ...rest }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Note: normally we would add click outside listener here

  const selectedOption = options.find((o: any) => o.value === value);

  return (
    <div className="relative flex items-center h-full pl-2 cursor-pointer" ref={ref}>
      <div 
        className="flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon country={value} label={labels[value]} />
        <span className="text-xs text-gray-500">▼</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 max-h-64 overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-md z-50 flex flex-col py-1">
          {options.map((option: any) => {
            if (!option.value) return null; // skip international if we want
            return (
              <div 
                key={option.value}
                className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer ${value === option.value ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                 <div className="flex items-center gap-2">
                   <div className="w-6 shrink-0 flex items-center justify-center">
                     <Icon country={option.value} label={labels[option.value]} />
                   </div>
                   <span className="text-sm text-gray-700 truncate max-w-[160px]">{labels[option.value]}</span>
                 </div>
                 <span className="text-xs font-medium text-gray-500">+{getCountryCallingCode(option.value)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const html = renderToString(<PhoneInput value="" onChange={() => {}} countrySelectComponent={CustomSelect} />);
console.log(html);
