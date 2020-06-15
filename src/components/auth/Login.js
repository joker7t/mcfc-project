import React, { useState } from 'react';
import { firebase } from '../../firebase';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(
                email,
                password
            );
            history.push('/dashboard');
        } catch (error) {
            setErrorMessage(error.message);
        }

    }

    return (
        <div className='container'>
            <div className='signin_wrapper' style={{ margin: '100px' }}>
                <form onSubmit={handleSubmit}>
                    <h2>Please login</h2>

                    <input
                        type='email'
                        name='email'
                        required
                        onChange={handleChangeEmail}
                        value={email}
                        style={{ marginBottom: '10px' }}
                        placeholder='Enter your email'
                    />
                    <input
                        type='password'
                        name='password'
                        required
                        onChange={handleChangePassword}
                        value={password}
                        placeholder='Enter your password'
                    />
                    {!errorMessage ? null : <div className='error_label'>{errorMessage}</div>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
