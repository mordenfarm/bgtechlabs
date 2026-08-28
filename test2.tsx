import React from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const CustomSelect = (props: any) => {
  console.log('Props keys:', Object.keys(props));
  console.log('Options length:', props.options?.length);
  return <select />;
};

const html = renderToString(<PhoneInput value="" onChange={() => {}} countrySelectComponent={CustomSelect} />);
