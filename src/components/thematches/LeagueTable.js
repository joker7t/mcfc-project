import React, { useState, useEffect } from 'react';

import { firebasePositions } from '../../firebase';
import { firebaseLooper } from '../../utils/util';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

const LeagueTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const loadedPositions = await firebasePositions.once('value');
                const loadedPositionsArr = firebaseLooper(loadedPositions);

                setPositions(loadedPositionsArr);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        load();

        //eslint-disable-next-line
    }, []);

    const style = {
        cell: {
            padding: '4px 16px 4px 11px',
            borderBottom: '1px solid #ffffff',
            color: '#ffffff',
            textAlign: 'center'
        }
    }

    const showLeagueTable = () => (
        <TableContainer>
            <Table aria-label="League table">
                <TableHead>
                    <TableRow>
                        <TableCell>Pos</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>D</TableCell>
                        <TableCell>Pts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positions.map((pos, i) => (
                        <TableRow key={i}>
                            <TableCell style={style.cell}>{i + 1}</TableCell>
                            <TableCell style={style.cell}>{pos.team}</TableCell>
                            <TableCell style={style.cell}>{pos.w}</TableCell>
                            <TableCell style={style.cell}>{pos.d}</TableCell>
                            <TableCell style={style.cell}>{pos.l}</TableCell>
                            <TableCell style={style.cell}>{pos.pts}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <div>
            {isLoading ?
                <div style={{ width: '100%', textAlign: 'center', margin: '30px 0' }}>
                    <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
                </div>
                :
                <div className='league_table_wrapper'>
                    <div className='title'>
                        League Table
                    </div>
                    <div style={{ background: '#98c6e9' }}>
                        {showLeagueTable()}
                    </div>
                </div>
            }
        </div>
    );
}

export default LeagueTable;
