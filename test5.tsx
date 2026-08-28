import React from 'react';
import PhoneInput from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import { renderToString } from 'react-dom/server';

const customLabels = { ...en, US: 'United States +1' };

const html = renderToString(<PhoneInput value="" onChange={() => {}} labels={customLabels} />);
console.log(html);
