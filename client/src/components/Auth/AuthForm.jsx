import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = ({ onSubmit, isAuthFormActive, setIsAuthFormActive }) => {
    const [isRegister, setIsRegister] = useState(false)
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const crossButton = <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff", }} />

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, mode: isRegister ? 'register' : 'login' });
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
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                {isRegister ? (
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                ) : null}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
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