import React, { useState } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal';
import Cards from './Cards';

const MeetPlayers = () => {

    const [show, setShow] = useState(false);

    return (
        <Reveal
            onReveal={() => {
                setShow(true);
            }}
            fraction={0.7}
        >
            <div
                className='home_meetplayers'
                style={{
                    background: `#ffffff url(${Stripes})`
                }}
            >
                <div className='container'>
                    <Grid container className='home_meetplayers_wrapper'>
                        <Grid item md={6} style={{ width: '100%' }}>
                            <div className='home_card_wrapper'>
                                <Cards show={show} />
                            </div>
                        </Grid>

                        <Grid item md={6} style={{ width: '100%' }}>
                            <div className='home_text_wrapper'>
                                <div className='home_text home_text_1'>
                                    Meet
                                </div>
                                <div className='home_text home_text_2'>
                                    The
                                </div>
                                <div className='home_text home_text_3'>
                                    Players
                                </div>
                                <Link to='/the_team'>
                                    <div className='home_meetplayers_button'>
                                        Meet them here
                                    </div>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Reveal>
    );
}

export default MeetPlayers;
