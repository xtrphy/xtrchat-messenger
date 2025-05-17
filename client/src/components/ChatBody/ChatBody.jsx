import React from 'react';
import styles from './ChatBody.module.css';
import ChatInput from '../ChatInput/ChatInput';

const ChatBody = ({ messages, selectedUserId }) => {
    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <main className={styles.chatBodyContainer}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.messagesContainer}>
                {messages.map(message => (
                    <div className={styles.message}>
                        <span className={styles.messageContent}>
                            {message.content}
                        </span>
                        <span className={styles.messageDate}>{formatTime(message.createdAt)}
                        </span>
                    </div>
                ))}
            </div>
            <ChatInput selectedUserId={selectedUserId} />
        </main>
    );
};

export default ChatBody;