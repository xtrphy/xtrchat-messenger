import React from 'react';
import styles from './Aside.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import AuthForm from '../Auth/AuthForm';

const Aside = () => {
    const [isAuthFormActive, setIsAuthFormActive] = useState(false);
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    return (
        <aside>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Link className={styles.logo} to='/'>XTRchat</Link>
                    <MenuDropdown user={user} setUser={setUser} setIsAuthFormActive={setIsAuthFormActive} />
                </div>
                <AuthForm setUser={setUser} isAuthFormActive={isAuthFormActive} setIsAuthFormActive={setIsAuthFormActive} />
            </div>
        </aside>
    );
};

export default Aside;