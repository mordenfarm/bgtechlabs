import React from 'react';
import PhoneInput, { getCountries } from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const defaultCountries = getCountries();
const countries = ['ZW', ...defaultCountries.filter(c => c !== 'ZW')];

const html = renderToString(<PhoneInput value="" onChange={() => {}} countries={countries} />);
console.log(html);
