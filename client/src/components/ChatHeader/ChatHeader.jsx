import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ messages }) => {
    if (!messages || messages.length === 0) {
        return (
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <h3 className={styles.senderUsername}>No conversation selected</h3>
                </div>
            </header>
        );
    }

    const userId = localStorage.getItem('userId');
    const firstMessage = messages[0];

    const isCurrentUserSender = firstMessage.sender.id === userId;

    const otherUser = isCurrentUserSender
        ? firstMessage.receiver
        : firstMessage.sender;

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img
                    className={styles.senderAvatar}
                    src={otherUser.avatarUrl ? otherUser.avatarUrl : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
                    alt={otherUser.username}
                />
                <h3 className={styles.senderUsername}>{otherUser.username}</h3>
            </div>
        </header>
    )
};

export default ChatHeader;