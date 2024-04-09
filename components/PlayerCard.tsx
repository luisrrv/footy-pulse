"use client";
import React, { useState } from 'react';

interface Props {
    playerData: any;
    add?: boolean;
    onAddClick: (playerId: string) => void;
}

const PlayerCard: React.FC<Props> = ({ playerData, add, onAddClick }: Props) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
    setHovered(true);
    };

    const handleMouseLeave = () => {
    setHovered(false);
    };

    return (
        <div className='relative'>
            <h3 className={`absolute rotate-[-90deg] font-bold leading-4 h-[20px] truncate ${add ? "text-xl bottom-[80px] left-[-96px]" : "text-md bottom-[60px] left-[-77px]"}`}>{playerData?.name || "No name"}</h3>
            <div
                className={`relative bg-transparent rounded-lg w-[150px] ${add ? "h-[200px]" : "h-[150px]"} ${hovered ? "border border-1 border-gray-500" : "border border-1 border-transparent"}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                <img
                    className={`w-full h-[150px] object-cover object-center transition-opacity duration-300 ${add ? "rounded-t-lg" : "rounded-lg"} ${hovered ? 'opacity-0' : 'opacity-100'}`}
                    src={playerData?.photo || ""}
                    alt={playerData?.name || "Player" + ' photo'}
                />
                <div
                    className={`absolute inset-0 h-[150px] p-2 flex flex-col justify-center align-center text-white transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* <p className="text-sm w-full text-center">{playerData?.name || "No name"}</p> */}
                    <p className="text-sm w-full text-center">{playerData?.nationality || "No nationality"}</p>
                    <p className="text-sm w-full text-center">{playerData?.age || "No age"} years old</p>
                    <p className="text-sm w-full text-center">{playerData?.height || "No height"} cm</p>
                </div>
                {add && (
                    <button
                        className="absolute bottom-0 h-[50px] bg-btn-background text-foreground hover:bg-btn-background-hover font-bold py-2 px-4 rounded-b-lg w-full transition duration-300"
                        type="button"
                        onClick={() => {onAddClick(playerData?.footballapi_id || "")}}
                    >
                        Add
                    </button>
                )}
            </div>

        </div>
    );
};

export default PlayerCard;
