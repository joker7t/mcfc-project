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

    const handleFilterAll = () => {
        setFilterMatches(...[matches]);
    }

    const handleFilterPlayed = () => {
        console.log(...matches.filter(match => match.final === 'Yes'))
        setFilterMatches(...[matches.filter(match => match.final === 'Yes')]);
    }

    const handleFilterNotPlayed = () => {
        setFilterMatches(...[matches.filter(match => match.final === 'No')]);
    }

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
                            <div className='match_filters_box'>
                                <div className='tag'>
                                    Show Match
                                </div>
                                <div className='cont'>
                                    <div className={`option`} onClick={handleFilterAll}>
                                        All
                                    </div>
                                    <div className={`option`} onClick={handleFilterPlayed}>
                                        Played
                                    </div>
                                    <div className={`option`} onClick={handleFilterNotPlayed}>
                                        Not played
                                    </div>
                                </div>
                            </div>

                        </div>
                        <MatchesList filterMatches={filterMatches} />
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
