import React from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const CustomSelect = ({ value, onChange, labels, options, iconComponent: Icon, ...rest }: any) => {
  return (
    <select {...rest} value={value} onChange={e => onChange(e.target.value)}>
       <option value="test">test</option>
    </select>
  )
};

const html = renderToString(<PhoneInput value="" onChange={() => {}} countrySelectComponent={CustomSelect} />);
console.log(html);
