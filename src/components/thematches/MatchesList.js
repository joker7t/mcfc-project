import React from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

import { getTeamIcon } from '../../utils/util';

const MatchesList = ({ filterMatches }) => {

    const showMatches = () => !filterMatches ? null : (
        <NodeGroup
            data={filterMatches}
            keyAccessor={(d) => d.id}

            start={() => ({
                opacity: 0,
                x: -200
            })}

            enter={(d, i) => ({
                opacity: [1],
                x: [0],
                timing: { duration: 500, delay: i * 50, ease: easePolyOut }
            })}

            update={(d, i) => ({
                opacity: [1],
                x: [0],
                timing: { duration: 500, delay: i * 50, ease: easePolyOut }
            })}

            leave={(d, i) => ({
                opacity: [0],
                x: [-200],
                timing: { duration: 500, delay: i * 50, ease: easePolyOut }
            })}
        >
            {nodes => (
                <div style={{ width: '100%' }}>
                    {nodes.map(({ key, data, state: { x, opacity } }) =>
                        <div
                            key={key}
                            className='match_box_big'
                            style={{ opacity: opacity, transform: `translate(${x}px)` }}
                        >
                            <div className='block_wraper'>
                                <div className='block'>
                                    <div
                                        className='icon'
                                        style={{ background: `url(${getTeamIcon(data.localThmb)})` }}
                                    ></div>
                                    <div className='team'>{data.local}</div>
                                    <div className='result'>{data.resultLocal}</div>
                                </div>
                                <div className='block'>
                                    <div
                                        className='icon'
                                        style={{ background: `url(${getTeamIcon(data.awayThmb)})` }}
                                    ></div>
                                    <div className='team'>{data.away}</div>
                                    <div className='result'>{data.resultAway}</div>
                                </div>
                            </div>
                            <div className='block_wraper nfo'>
                                <div><strong>Date:</strong> {data.date}</div>
                                <div><strong>Stadium:</strong> {data.stadium}</div>
                                <div><strong>Referee:</strong> {data.referee}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </NodeGroup>
    )

    return (
        <div style={{ width: '100%' }}>
            {showMatches()}
        </div>
    );
}

export default MatchesList;
