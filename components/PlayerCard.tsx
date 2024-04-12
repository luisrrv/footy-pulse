"use client";
import React, { useState } from 'react';
import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/solid'

interface Props {
    playerData: any;
    add?: boolean;
    onAddClick: (playerId: string) => void;
    onRemoveClick: (playerId: string) => void;
}

const PlayerCard: React.FC<Props> = ({ playerData, add, onAddClick, onRemoveClick }: Props) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
    setHovered(true);
    };

    const handleMouseLeave = () => {
    setHovered(false);
    };

    return (
        <div key={playerData?.id} className='relative animate-in-slow delay'>
            <h3 className={`absolute rotate-[-90deg] leading-4 h-[20px] truncate text-xl bottom-[80px] left-[-88px] font-extrabold tracking-tighter`}>{playerData?.name || "No name"}</h3>
            <div
                className={`relative bg-transparent rounded-lg w-[150px] h-[200px] ${hovered ? "border border-1 border-gray-500" : "border border-1 border-transparent"}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                <img
                    className={`w-full h-[150px] object-cover object-center transition-opacity duration-300 rounded-t-lg ${hovered ? 'opacity-100' : 'opacity-100'}`}
                    src={playerData?.photo || ""}
                    alt={playerData?.name || "Player" + ' photo'}
                />
                <div
                    className={`absolute inset-0 h-[150px] p-2 flex flex-col justify-center align-center text-white transition-opacity duration-300 bg-btn-background-hover rounded-t-lg ${hovered ? 'opacity-85' : 'opacity-0'}`}
                >
                    {/* <p className="text-sm w-full text-center font-thin">{playerData?.name || "No name"}</p> */}
                    <p className="text-sm w-full text-center font-thin">{playerData?.nationality || "No nationality"}</p>
                    <p className="text-sm w-full text-center font-thin">{playerData?.age || "No age"} years old</p>
                    <p className="text-sm w-full text-center font-thin">{playerData?.height || "No height"} cm</p>
                </div>
                {add ? (
                    <button
                        className="flex flex-row justify-center items-center gap-1 uppercase text-xs tracking-wide cursor-pointer z-10 absolute bottom-0 h-[50px] bg-btn-background-hover text-foreground hover:bg-indigo-700 hover:text-white font-bold py-2 px-4 rounded-b-lg w-full transition duration-300"
                        type="button"
                        onClick={() => {onAddClick(playerData?.footballapi_id || "")}}
                    >
                        <UserPlusIcon className='h-4 w-4' />
                        <p>Add</p>
                    </button>
                ): (
                    <button
                        className="flex flex-row justify-center items-center gap-1 uppercase text-xs tracking-wide cursor-pointer z-10 absolute bottom-0 h-[50px] bg-btn-background-hover text-foreground hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded-b-lg w-full transition duration-300"
                        type="button"
                        onClick={() => {onRemoveClick(playerData?.footballapi_id || "")}}
                    >
                        <UserMinusIcon className='h-4 w-4' />
                        <p>Remove</p>
                    </button>
                )}
            </div>

        </div>
    );
};

export default PlayerCard;
