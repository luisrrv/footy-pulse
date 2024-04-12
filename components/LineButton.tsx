"use client";
import React, { useEffect, useState } from 'react';
import LinePopup from "@/components/LinePopup";

interface Props {
    onAddLineIdClick: Function;
}

const PlayerCard: React.FC<Props> = ({ onAddLineIdClick }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <button 
                onClick={()=>{setShowPopup(true)}}
                className='text-white bg-green-500 rounded-full px-3 py-1'
            >
                LINE
            </button>
            {showPopup && <LinePopup onClose={() => setShowPopup(false)} onAddLineIdClick={onAddLineIdClick} />}
        </>
    );
};

export default PlayerCard;
