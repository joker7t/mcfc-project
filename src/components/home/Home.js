import React from 'react';
import Featured from './Featured';
import Matches from './matches/Matches';
import MeetPlayers from './meetplayers/MeetPlayers';

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured />
            <Matches />
            <MeetPlayers />
        </div>
    );
}

export default Home;
