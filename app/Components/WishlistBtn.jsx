import React, { useState } from 'react';

const WishlistBtn = ({ onClick, isFavorite }) => {

  return (
    <button
      onClick={onClick}
      className={` p-2 rounded-full transition-colors duration-300 hover:cursor-pointer z-10 ${isFavorite
        ? "bg-gray-900 text-white" // <-- **Turns RED when true**
        : "bg-white text-gray-400 hover:text-gray-900 shadow-lg"
        }`}
      aria-label="Add to wishlist"
    >
      {/* Heart icon SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"} // <-- **Fills the heart when true**
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
};

export default WishlistBtn;