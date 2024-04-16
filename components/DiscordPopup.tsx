import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'

interface DiscordPopupProps {
    onClose: () => void;
    onAddDiscordWUrlClick: Function;
    webhookUrl: string;
}

const DiscordPopup: React.FC<DiscordPopupProps> = ({ onClose, onAddDiscordWUrlClick, webhookUrl }) => {
    const [inputValue, setInputValue] = useState<string>(webhookUrl);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        if(inputValue) setDisabled(false);
        else setDisabled(true);
    }, [inputValue])

    return (
        <div 
            className="animate-in bg-background/50 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50" 
            onClick={onClose}
        >
            <div 
                className='absolute top-3 right-3 flex justify-center align-center cursor-pointer text-foreground' 
                onClick={onClose}
            >
                <XMarkIcon className='h-6 w-6' />
            </div>

            <div 
                className="flex flex-col justify-between align-center bg-background text-foreground rounded-lg p-8 max-w-md w-full border border border-1 border-gray-500 mx-3" 
                onClick={(e) => {e.preventDefault(); e.stopPropagation();}}
            >
                <h2 className="text-lg font-extrabold tracking-tighter  mb-4">Where should we send you player updates?</h2>
                <label className="text-md mb-3" htmlFor="email">
                    Discord webhook URL:
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="userId"
                        defaultValue={inputValue||""}
                        placeholder="Enter your discord server's webhook URL"
                        onChange={(e) => {setInputValue(e.target.value)}}
                    />
                <button
                    className={`bg-indigo-700 hover:bg-indigo-600 transition-colors duration-300 text-white py-2 px-4 mt-3 rounded-lg min-w-[100px] tracking-wide uppercase font-extrabold ${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                    onClick={() => {onAddDiscordWUrlClick(inputValue); onClose()}}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default DiscordPopup;
