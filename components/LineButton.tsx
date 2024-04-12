"use client";
import React, { useEffect, useState } from 'react';
import LinePopup from "@/components/LinePopup";

interface Props {
    user: any;
}

const PlayerCard: React.FC<Props> = ({ user }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    // useEffect(() => {
    //     if (showPopup){
    //         // TODO: show popup component in the current page
    //     }
    // }, [showPopup])

    return (
        <>
            <button 
                onClick={()=>{setShowPopup(true)}}
                className='text-white bg-green-500 rounded-full px-3 py-1'
            >
                LINE
            </button>
            {showPopup && <LinePopup onClose={() => setShowPopup(false)} />}
        </>
    );
};

export default PlayerCard;
