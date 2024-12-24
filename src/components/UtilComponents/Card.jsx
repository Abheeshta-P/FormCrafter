import React from 'react';

function Card({ children, className = '' }) {
  return <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
    {children}
    </div>;
}

export default Card;
