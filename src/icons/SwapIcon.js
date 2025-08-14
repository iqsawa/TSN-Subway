import React from 'react';

const SwapIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20V10" />
    <path d="M18 4l-6 6-6-6" />
    <path d="M12 4v10" />
    <path d="M6 20l6-6 6 6" />
  </svg>
);

export default SwapIcon;