import React from 'react';
import styles from './ChatBody.module.css';
import ChatInput from '../ChatInput/ChatInput';

const ChatBody = ({ messages, selectedUserId }) => {
    const userId = localStorage.getItem('userId');

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <main className={styles.chatBodyContainer}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.messagesContainer}>
                {messages.map((message, index) => {
                    if (message.senderId === userId) {
                        return (
                            <div className={styles.userMessage} key={message.id || `user-msg-${index}`}>
                                <span className={styles.userMessageContent}>
                                    {message.content}
                                </span>
                                <span className={styles.userMessageDate}>
                                    {formatTime(message.createdAt)}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div className={styles.companionMessage} key={message.id || `companion-msg-${index}`}>
                            <span className={styles.companionMessageContent}>
                                {message.content}
                            </span>
                            <span className={styles.companionMessageDate}>
                                {formatTime(message.createdAt)}
                            </span>
                        </div>
                    );
                })}
            </div>
            <ChatInput selectedUserId={selectedUserId} />
        </main>
    );
};

export default ChatBody;