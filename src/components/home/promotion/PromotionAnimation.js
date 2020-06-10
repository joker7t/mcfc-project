import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jersey from '../../../Resources/images/jersey.jpg';
import Grid from '@material-ui/core/Grid';

const PromotionAnimation = () => {
    return (
        <div className='promotion_animation'>
            <Grid container>
                <Grid item md={6}>
                    <Zoom>
                        <div>
                            <div className='left'>
                                <span>Win a</span>
                                <span>Jersey</span>
                            </div>
                        </div>
                    </Zoom>
                </Grid>
                <Grid item md={6} style={{ width: '100%' }}>
                    <Zoom>
                        <div >
                            <div className='right'></div>
                        </div>
                    </Zoom>

                </Grid>
            </Grid>
        </div>
    );
}

export default PromotionAnimation;