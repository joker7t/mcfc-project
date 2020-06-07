import React from 'react';
import MatchTag from './MatchTag';
import Block from './Block';

const Matches = () => {
    return (
        <div className='home_matches_wrapper'>
            <div className='container'>
                <MatchTag
                    name='match_tag all-matches'
                    content='Matches'
                />

                <Block />

                <MatchTag
                    name='match_tag more-matches'
                    content='See more matches'
                    link={true}
                    linkTo='/the-team'
                />
            </div>
        </div>
    );
}

export default Matches;
