import React, { useState, useEffect } from 'react';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../utils/util';
import MatchBlock from './MatchBlock';
import Slide from 'react-reveal/Slide';

import Grid from '@material-ui/core/Grid';

const Block = () => {
    const [matches, setMatches] = useState([]);

    const showItemsPerRow = (row, i) => {
        return <Grid container key={i}>
            {row.map((item, i2) => {
                return <Grid item md={6} key={i2} style={{ width: '100%', padding: '20px 10px' }}>
                    {showMatches(item)}
                </Grid>
            })}
        </Grid>;
    }

    const buildItemsForRow = (maxItemsInARow, items) => {
        const tempItems = [...items];
        const rowsOfItems = [];

        while (tempItems.length > 0) {
            rowsOfItems.push(tempItems.splice(0, maxItemsInARow));
        }

        return rowsOfItems.map((row, i) => showItemsPerRow(row, i));
    }

    const showMatches = (match) => (
        <div className='item'>
            <div className='wrapper'>
                <Slide left>
                    <MatchBlock match={match} />
                </Slide>
            </div>
        </div>
    );

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const loadedMatches = await firebaseMatches.limitToLast(6).once('value');
                const loadedMatchesArr = firebaseLooper(loadedMatches);
                setMatches(reverseArray(loadedMatchesArr));
            } catch (error) {
                console.log(error);
            }
        };

        loadMatches();

        //eslint-disable-next-line
    }, []);

    return (
        <div className='home_matches'>
            <div className='block_wrapper'>
                {buildItemsForRow(2, matches)}
            </div>
        </div>
    );
}

export default Block;
