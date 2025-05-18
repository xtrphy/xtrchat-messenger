import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import ChatBody from '../../components/ChatBody/ChatBody';
import styles from './Chats.module.css';


const Chats = ({ messages, selectedUserId }) => {
    if (!messages || messages.length === 0) {
        return (
            <main className={styles.mainContainer}>
                <FontAwesomeIcon icon={faMessage} style={{ color: '#fff', fontSize: '2rem' }} />
                <h1 style={{ fontWeight: '300' }}>Chats</h1>
            </main>
        );
    }

    return (
        <div className={styles.chat}>
            <ChatHeader messages={messages} selectedUserId={selectedUserId} />
            <ChatBody messages={messages} selectedUserId={selectedUserId} />
        </div>
    );
};

export default Chats;