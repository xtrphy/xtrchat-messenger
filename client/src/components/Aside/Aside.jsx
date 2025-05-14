import React from 'react';
import styles from './Aside.module.css';
import { Link } from 'react-router-dom';
import MenuDropdown from '../MenuDropdown/MenuDropdown';

const Aside = () => {
    return (
        <aside>
            <div className={styles.top}>
                <Link className={styles.logo} to='/'>XTRchat</Link>
                <MenuDropdown />
            </div>
        </aside>
    );
};

export default Aside;