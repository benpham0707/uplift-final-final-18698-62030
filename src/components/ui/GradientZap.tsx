import React from 'react';

interface GradientZapProps {
  className?: string;
}

const GradientZap: React.FC<GradientZapProps> = ({ className }) => {
  // Unique ID to avoid conflicts if multiple instances are on screen (though less likely here)
  const gradientId = "zap-uplift-gradient";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#zap-uplift-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9">
             <animate attributeName="stop-color" values="#0ea5e9; #6366f1; #8b5cf6; #0ea5e9" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#6366f1">
             <animate attributeName="stop-color" values="#6366f1; #8b5cf6; #0ea5e9; #6366f1" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#8b5cf6">
             <animate attributeName="stop-color" values="#8b5cf6; #0ea5e9; #6366f1; #8b5cf6" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={`url(#${gradientId})`} stroke="none" />
    </svg>
  );
};

export default GradientZap;

