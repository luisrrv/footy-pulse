"use client";
import React, { useState } from 'react';
import DiscordPopup from "@/components/DiscordPopup";

interface Props {
    onAddDiscordWUrlClick: Function;
}

const PlayerCard: React.FC<Props> = ({ onAddDiscordWUrlClick }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <button 
                onClick={()=>{setShowPopup(true)}}
                className='text-white bg-indigo-700 hover:bg-indigo-600 transition-colors duration-300 rounded-full px-3 py-1'
            >
                Discord
            </button>
            {showPopup && <DiscordPopup onClose={() => setShowPopup(false)} onAddDiscordWUrlClick={onAddDiscordWUrlClick} />}
        </>
    );
};

export default PlayerCard;
