import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { firebaseDB, firebasePlayers } from '../../../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddEditPlayer = ({ match, history }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [formType, setFormType] = useState('Add player');
    const [message, setMessage] = useState('');
    const [newPlayer, setNewPlayer] = useState({
        name: '',
        lastname: '',
        number: '',
        position: 'Keeper',
        image: ''
    });

    useEffect(() => {
        const load = async () => {
            try {
                // const loadedTeams = await firebaseTeams.once('value');
                // setTeams(firebaseLooper(loadedTeams));

                const { id } = match.params;
                if (id) {
                    setFormType('Edit player');
                    const loadedPlayer = await firebaseDB.ref(`players/${id}`).once('value');
                    setNewPlayer(loadedPlayer.val());
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        load();

        //eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { id } = match.params;
            if (id) {
                await firebaseDB.ref(`players/${id}`).update(newPlayer);
                setMessage('Update successfully');

                setTimeout(() => setMessage(''), 2000);
            } else {
                await firebasePlayers.push(newPlayer);

                history.push('/admin_players');
            }
        } catch (error) {
            console.log(e);
        }
    }

    const onChange = (e) => {
        setNewPlayer({
            ...newPlayer,
            [e.target.name]: e.target.value
        });
    };

    return (
        <AdminLayout>
            {isLoading ?
                <div className='admin_progress'>
                    <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                </div>

                :
                <div className='editplayers_dialog_wrapper'>
                    <h2>{formType}</h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='label_inputs'>
                                Player image
                            </div>
                            <input type='file' required name='image' />
                        </div>

                        <div>
                            <div className='label_inputs'>
                                Player name
                            </div>
                            <input type='text' required name='name' value={newPlayer.name} onChange={onChange} />
                        </div>

                        <div>
                            <div className='label_inputs'>
                                Player last name
                            </div>
                            <input type='text' required name='lastname' value={newPlayer.lastname} onChange={onChange} />
                        </div>

                        <div>
                            <div className='label_inputs'>
                                Player number
                            </div>
                            <input type='text' required name='number' value={newPlayer.number} onChange={onChange} />
                        </div>

                        <div>
                            <div className='label_inputs'>
                                Player position
                            </div>
                            <select required name='position' value={newPlayer.position} onChange={onChange}>
                                <option value='Keeper'>Keeper</option>
                                <option value='Defence'>Defence</option>
                                <option value='Midfield'>Midfield</option>
                                <option value='Striker'>Striker</option>
                            </select>
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

export default AddEditPlayer;
