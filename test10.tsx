import React, { useState, useRef, useEffect } from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const CustomSelect = ({ value, onChange, options, iconComponent: Icon, ...rest }: any) => {
  return (
    <div>
      <Icon country="ZW" label="Zimbabwe" />
    </div>
  );
};

const html = renderToString(<PhoneInput value="" onChange={() => {}} countrySelectComponent={CustomSelect} />);
console.log("Success");
