import React from 'react'

const AddCart = ({ onClick }) => {
  return (
       <button
            onClick={onClick}           
            
          className="flex-1 h-10 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-black transition-all active:scale-95"
       >
            Add to Bag
       </button>
  )
}

export default AddCart
