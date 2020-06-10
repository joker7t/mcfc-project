import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';

import { firebasePromotions } from '../../../firebase';

const Enroll = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail('');

        const snap = await firebasePromotions.orderByChild('email').equalTo(email).once('value');
        if (snap.val() === null) {
            const sendData = {
                email: email
            };
            firebasePromotions.push(sendData);
            setMessage('Congrats');
        } else {
            setMessage('Already in database');
        }

        setTimeout(() => setMessage(''), 2000);

    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <Fade>
            <div className='enroll_wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='enroll_title'>
                        Enter your email
                    </div>
                    <div className='enroll_input'>
                        <input type='email' name='email' required onChange={handleChangeEmail} value={email} placeholder='Enter your email' />
                        {!message ? null : <div className='success_label'>{message}</div>}
                        <button type='submit'>Enroll</button>
                    </div>
                    <div className='enroll_discl'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </div>
                </form>
            </div>
        </Fade>
    );
}

export default Enroll;
