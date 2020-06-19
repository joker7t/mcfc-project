import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../utils/util';

import { Link } from 'react-router-dom';

const AdminPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const loadedPlayers = await firebasePlayers.once('value');
                const loadedMatchesArr = firebaseLooper(loadedPlayers);
                setPlayers(reverseArray(loadedMatchesArr));
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        loadMatches();

        //eslint-disable-next-line
    }, []);

    const showPlayersTable = () => (
        <TableContainer component={Paper}>
            <Table aria-label="Matches table">
                <TableHead>
                    <TableRow>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Number</TableCell>
                        <TableCell>Position</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Link to={`/admin_players/add_player/${player.id}`} className='player_link'>
                                    {player.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin_players/add_player/${player.id}`} className='player_link'>
                                    {player.lastname}
                                </Link>
                            </TableCell>
                            <TableCell>{player.number}</TableCell>
                            <TableCell>{player.position}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <AdminLayout>
            {isLoading ? (
                <div className='admin_progress'>
                    <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                </div>
            )
                :
                (
                    showPlayersTable()
                )}
        </AdminLayout>
    );
}

export default AdminPlayers;
