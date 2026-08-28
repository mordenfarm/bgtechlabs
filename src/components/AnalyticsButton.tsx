import React from 'react';
import { useLocation } from 'react-router-dom';
import { trackButtonClick } from '../lib/analytics';

interface AnalyticsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

export const AnalyticsButton: React.FC<AnalyticsButtonProps> = ({ buttonName, onClick, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackButtonClick(location.pathname, buttonName);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

interface AnalyticsLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  buttonName: string;
}

export const AnalyticsLink: React.FC<AnalyticsLinkProps> = ({ buttonName, onClick, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackButtonClick(location.pathname, buttonName);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
