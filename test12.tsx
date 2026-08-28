import React from 'react';
import PhoneInput from 'react-phone-number-input';
import { renderToString } from 'react-dom/server';

const html = renderToString(<PhoneInput country="ZW" value="" onChange={() => {}} />);
console.log(html);
