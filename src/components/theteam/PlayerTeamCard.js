import React from 'react';

const PlayerTeamCard = ({ bck, number, name, lastname }) => {
    return (
        <div className='player_card_wrapper-2'>
            <div
                className='player_card_thmb'
                style={{
                    background: `url(${bck})`
                }}
            ></div>
            <div className='player_card_nfo'>
                <div className='player_card_number'>
                    {number}
                </div>
                <div className='player_card_name'>
                    <span>{name}</span>
                    <span>{lastname}</span>
                </div>
            </div>
        </div>
    );
}

export default PlayerTeamCard;
