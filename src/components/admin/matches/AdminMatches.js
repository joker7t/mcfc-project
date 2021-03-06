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

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../utils/util';
import { Link } from 'react-router-dom';

const AdminMatches = () => {
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const loadedMatches = await firebaseMatches.once('value');
                const loadedMatchesArr = firebaseLooper(loadedMatches);
                setMatches(reverseArray(loadedMatchesArr));
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        loadMatches();

        //eslint-disable-next-line
    }, []);

    const showMatchesTable = () => (
        <TableContainer component={Paper}>
            <Table aria-label="Matches table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Match</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.map((match, i) => (
                        <TableRow key={i}>
                            <TableCell>{match.date}</TableCell>
                            <TableCell>
                                <Link to={`/admin_matches/edit_match/${match.id}`} className='match_link'>
                                    {match.away}<strong> - </strong>{match.local}
                                </Link>
                            </TableCell>
                            <TableCell>{match.resultAway}<strong> - </strong>{match.resultLocal}</TableCell>
                            <TableCell>
                                {match.final === 'Yes' ?
                                    <span className='matches_tag_red'>Final</span>
                                    :
                                    <span className='matches_tag_green'>Not played yet</span>
                                }
                            </TableCell>
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
                    showMatchesTable()
                )}
        </AdminLayout>
    );
}

export default AdminMatches;
