import React, { useState, useEffect } from 'react';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../../utils/util';

import CircularProgress from '@material-ui/core/CircularProgress';
import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';

const TheMatches = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [filterMatches, setFilterMatches] = useState([]);
    const [playerFilter, setPlayerFilter] = useState(false);
    const [resultFilter, setResultFilter] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const loadedMatches = await firebaseMatches.once('value');
                const loadedMatchesArr = reverseArray(firebaseLooper(loadedMatches));

                setMatches(loadedMatchesArr);
                setFilterMatches(loadedMatchesArr);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        load();

        //eslint-disable-next-line
    }, []);

    return (
        <div className='the_matches_container'>
            {isLoading ?
                <div style={{ width: '100%', textAlign: 'center', margin: '30px 0' }}>
                    <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
                </div>
                :
                <div className='the_matches_wrapper'>
                    <div className='left'>
                        <div className='match_filters'>
                            <MatchesList filterMatches={filterMatches} />
                        </div>

                    </div>

                    <div className='right'>
                        <LeagueTable />
                    </div>
                </div>
            }
        </div>
    );
}

export default TheMatches;
