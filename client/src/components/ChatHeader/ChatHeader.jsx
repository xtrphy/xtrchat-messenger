import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ messages }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img className={styles.senderAvatar} src={messages[0].sender.avatarUrl} alt={messages[0].sender.username} />
                <h3 className={styles.senderUsername}>{messages[0].sender.username}</h3>
            </div>
        </header>
    );
};

export default ChatHeader;