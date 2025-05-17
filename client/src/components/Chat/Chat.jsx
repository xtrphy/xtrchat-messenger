import React from 'react';
import styles from './Chat.module.css';

const Chat = ({ chat }) => {
    const currentUserId = localStorage.getItem('userId');
    const isSender = chat.sender.id === currentUserId;
    const otherUser = isSender ? chat.receiver : chat.sender;

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.chat}>
            <img className={styles.senderAvatar} src={otherUser.avatarUrl ? otherUser.avatarUrl : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt={chat.sender.username} />
            <div className={styles.chatInfo}>
                <div className={styles.senderAndTime}>
                    <h3 className={styles.senderUsername}>{otherUser.username}</h3>
                    <span className={styles.messageDate}>{formatTime(chat.createdAt)}</span>
                </div>
                <p className={styles.chatContent}>
                    {chat.content.length > 50
                        ? `${chat.content.slice(0, 50)}...`
                        : chat.content}
                </p>
            </div>
        </div>
    );
};

export default Chat;