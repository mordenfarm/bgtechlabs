import React from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const CustomSelect = ({ options, iconComponent: Icon }: any) => {
  console.log('Options sample:', options.slice(0, 3));
  return <select />;
};

const html = renderToString(<PhoneInput value="" onChange={() => {}} countrySelectComponent={CustomSelect} />);
