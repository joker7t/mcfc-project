import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

import PlayerTeamCard from './PlayerTeamCard';
import Stripe from '../../Resources/images/stripes.png';
import { firebase, firebasePlayers } from '../../firebase';
import { firebaseLooper } from '../../utils/util';
import CircularProgress from '@material-ui/core/CircularProgress';

const TheTeam = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const loadedPlayers = await firebasePlayers.once('value');
                const loadedPlayersArr = firebaseLooper(loadedPlayers);

                const loadedPlayersWithUrlPromisesArr = loadedPlayersArr.map(async (loadedPlayer, i) => {
                    const url = await firebase.storage().ref('players').child(loadedPlayer.image).getDownloadURL();
                    return { ...loadedPlayer, url: url };
                })

                setPlayers((await Promise.all(loadedPlayersWithUrlPromisesArr)));
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        loadPlayers();

        //eslint-disable-next-line
    }, []);

    const showKeepers = () =>
        players.filter(player => player.position === 'Keeper').map((player, i) =>
            <Fade left delay={i * 100} key={i} >
                <PlayerTeamCard
                    bck={player.url}
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                />
            </Fade>
        );

    const showDefences = () =>
        players.filter(player => player.position === 'Defence').map((player, i) =>
            <Fade left delay={i * 100} key={i} >
                <PlayerTeamCard
                    bck={player.url}
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                />
            </Fade>
        );

    const showMidfields = () =>
        players.filter(player => player.position === 'Midfield').map((player, i) =>
            <Fade left delay={i * 100} key={i} >
                <PlayerTeamCard
                    bck={player.url}
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                />
            </Fade>
        );

    const showStrikers = () =>
        players.filter(player => player.position === 'Striker').map((player, i) =>
            <Fade left delay={i * 100} key={i} >
                <PlayerTeamCard
                    bck={player.url}
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                />
            </Fade>
        );

    return (
        <div className='the_team_container' style={{ background: `url(${Stripe}) repeat` }}>
            {isLoading ? (
                <div style={{ width: '100%', textAlign: 'center', margin: '30px 0' }}>
                    <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
                </div>
            )
                :
                <div>
                    <div className='team_category_wrapper'>
                        <div className='title'>
                            Keepers
                    </div>
                        <div className='team_cards'>
                            {showKeepers()}
                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>
                            Defences
                    </div>
                        <div className='team_cards'>
                            {showDefences()}
                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>
                            Midfields
                    </div>
                        <div className='team_cards'>
                            {showMidfields()}
                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>
                            Strikers
                    </div>
                        <div className='team_cards'>
                            {showStrikers()}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default TheTeam;
