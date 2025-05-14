import React from 'react';
import styles from './Aside.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import AuthForm from '../Auth/AuthForm';

const Aside = () => {
    const [isAuthFormActive, setIsAuthFormActive] = useState(false);

    return (
        <aside>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Link className={styles.logo} to='/'>XTRchat</Link>
                    <MenuDropdown setIsAuthFormActive={setIsAuthFormActive} />
                </div>
                <AuthForm isAuthFormActive={isAuthFormActive} setIsAuthFormActive={setIsAuthFormActive} />
            </div>
        </aside>
    );
};

export default Aside;