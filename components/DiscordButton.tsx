"use client";
import React, { useState } from 'react';
import DiscordPopup from "@/components/DiscordPopup";
import { Cog6ToothIcon } from '@heroicons/react/24/solid'

interface Props {
    onAddDiscordWUrlClick: Function;
    webhookUrl: string;
}

const PlayerCard: React.FC<Props> = ({ onAddDiscordWUrlClick, webhookUrl }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <button 
                onClick={()=>{setShowPopup(true)}}
                className='bg-btn-background-hover text-foreground hover:bg-lime-500 hover:text-black transition-colors duration-300 rounded-full px-3 py-2'
            >
                <Cog6ToothIcon className='h-5 w-5' />
            </button>
            {showPopup && <DiscordPopup onClose={() => setShowPopup(false)} onAddDiscordWUrlClick={onAddDiscordWUrlClick} webhookUrl={webhookUrl} />}
        </>
    );
};

export default PlayerCard;
