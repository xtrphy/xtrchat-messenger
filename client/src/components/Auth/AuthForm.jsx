import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = ({ isAuthFormActive, setIsAuthFormActive, setUser }) => {
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const crossButton = <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff", }} />

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isRegister ? 'api/auth/register' : 'api/auth/login';

        const body = isRegister
            ? { username, email, password }
            : { username, password };

        try {
            const res = await fetch(`http://localhost:3000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            setIsAuthFormActive(false);
            setUser(data);

            if (!res.ok) {
                alert(data.message || 'Error');
                return;
            }

            if (!isRegister) {
                localStorage.setItem('token', data.token);
                setIsAuthFormActive(false);
            } else {
                alert('Registration succesfull');
                setIsRegister(false);
            }
        } catch (err) {
            console.error('Request error', err);
        }
    };

    return (
        <div className={`${styles.authContainer} ${isAuthFormActive ? styles.show : ''}`}>
            <button className={styles.closeFormBtn} onClick={() => setIsAuthFormActive(false)}>{crossButton}</button>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>{isRegister ? 'Register' : 'Log In'}</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                {isRegister ? (
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                ) : null}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    {isRegister ? 'Register' : 'Log In'}
                </button>

                <p className={styles.switchMode}>
                    {isRegister ? 'Already have an account?' : 'Don\' have an account?'}{' '}
                    <span onClick={() => setIsRegister((prev) => !prev)}>
                        {isRegister ? 'Log In' : 'Register'}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;