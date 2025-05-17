import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import styles from './Chats.module.css';


const Chats = () => {
    return (
        <main className={styles.mainContainer}>
            <FontAwesomeIcon icon={faMessage} style={{ color: '#fff', fontSize: '2rem' }} />
            <h1 style={{ fontWeight: '300' }}>Chats</h1>
        </main>
    );
};

export default Chats;