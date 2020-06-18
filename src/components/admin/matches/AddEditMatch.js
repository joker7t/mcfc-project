import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../../utils/util';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddEditMatch = ({ match, history }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [formType, setFormType] = useState('Add match');
    const [teams, setTeams] = useState([]);
    const [message, setMessage] = useState('');
    const [newMatch, setNewMatch] = useState({
        away: 'Arsenal',
        awayThmb: '',
        date: '',
        final: 'Yes',
        local: 'Arsenal',
        localThmb: '',
        referee: '',
        result: '',
        resultAway: '',
        resultLocal: '',
        stadium: ''
    });

    useEffect(() => {
        const load = async () => {
            try {
                const loadedTeams = await firebaseTeams.once('value');
                setTeams(firebaseLooper(loadedTeams));

                const { id } = match.params;
                if (id) {
                    setFormType('Edit match');
                    const loadedMatch = await firebaseDB.ref(`matches/${id}`).once('value');
                    setNewMatch(loadedMatch.val());
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        load();

        //eslint-disable-next-line
    }, []);

    const buildTeamOptions = () => {
        return teams.map((team, i) => <option value={team.shortName} key={i}>{team.name}</option>);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { id } = match.params;
            if (id) {
                await firebaseDB.ref(`matches/${id}`).update(newMatch);
                setMessage('Update successfully');

                setTimeout(() => setMessage(''), 2000);
            } else {
                await firebaseMatches.push(newMatch);

                history.push('/admin_matches');
            }
        } catch (error) {
            console.log(e);
        }
    }

    const onChange = (e) => {
        setNewMatch({
            ...newMatch,
            [e.target.name]: e.target.value
        });
    };

    const onChangeTeamOption = (e) => {
        const { name, value } = e.target;
        const thumbnailField = name === 'local' ? 'localThmb' : 'awayThmb';
        const selectedTeams = teams.filter(team => team.shortName === value)[0];
        setNewMatch({
            ...newMatch,
            [name]: value,
            [thumbnailField]: selectedTeams.thmb
        });
    };

    return (
        <AdminLayout>
            {isLoading ?
                <div className='admin_progress'>
                    <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                </div>

                :
                <div className='editmatch_dialog_wrapper'>
                    <h2>{formType}</h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='label_inputs'>
                                Event date
                        </div>
                            <input type='date' alt='mm/dd/2020' required name='date' value={newMatch.date} onChange={onChange} />
                        </div>

                        <div className='select_team_layout'>
                            <div className='label_inputs'>
                                Local
                        </div>
                            <div className='wrapper'>
                                <div className='left'>
                                    <div>
                                        <select alt='Select a team' required name='local' value={newMatch.local} onChange={onChangeTeamOption}>
                                            {buildTeamOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className='right'>
                                    <input type='text' alt='Select a local result' required name='resultLocal' value={newMatch.resultLocal} onChange={onChange} />
                                </div>
                            </div>
                        </div>

                        <div className='select_team_layout'>
                            <div className='label_inputs'>
                                Away
                        </div>
                            <div className='wrapper'>
                                <div className='left'>
                                    <div>
                                        <select alt='Select an away team' required name='away' value={newMatch.away} onChange={onChangeTeamOption}>
                                            {buildTeamOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className='right'>
                                    <input type='text' alt='Select a away result' required name='resultAway' value={newMatch.resultAway} onChange={onChange} />
                                </div>
                            </div>
                        </div>

                        <div className='split_fields'>
                            <div>
                                <div className='label_inputs'>
                                    Referee
                            </div>
                                <input type='text' alt='input a referee' required name='referee' value={newMatch.referee} onChange={onChange} />
                            </div>

                            <div>
                                <div className='label_inputs'>
                                    Stadium
                            </div>
                                <input type='text' alt='input a stadium' required name='stadium' value={newMatch.stadium} onChange={onChange} />
                            </div>
                        </div>

                        <div className='split_fields last'>
                            <div>
                                <div className='label_inputs'>
                                    Team result
                            </div>
                                <select alt='Select result' required name='result' value={newMatch.result} onChange={onChange}>
                                    <option value='W'>W</option>
                                    <option value='D'>D</option>
                                    <option value='L'>L</option>
                                    <option value='n/a'>n/a</option>
                                </select>
                            </div>
                            <div>
                                <div className='label_inputs'>
                                    Game played?
                            </div>
                                <select alt='final' required name='final' value={newMatch.final} onChange={onChange}>
                                    <option value='Yes'>Yes</option>
                                    <option value='No'>No</option>
                                </select>
                            </div>
                        </div>

                        <div className='admin_submit'>
                            {!message ? null : <div className='success_label'>{message}</div>}
                            <button type='submit'>{formType}</button>
                        </div>

                    </form>

                </div>
            }
        </AdminLayout>
    );
}

export default AddEditMatch;
