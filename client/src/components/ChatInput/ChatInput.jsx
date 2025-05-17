import React from 'react';
import styles from './ChatInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ChatInput = ({ selectedUserId }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async (receiverId, content, token) => {
        try {
            const res = await fetch('http://localhost:3000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ receiverId, content })
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to send message')
            }

            const message = await res.json();
            setMessage('');
            return message;
        } catch (err) {
            console.error(err)
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(selectedUserId, message, localStorage.getItem('token'));
        }
    };

    return (
        <div className={styles.inputContainer}>
            <textarea
                className={styles.textarea}
                placeholder='Enter your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                rows={1}
            />
            <button className={styles.sendButton} onClick={() => sendMessage(selectedUserId, message, localStorage.getItem('token'))}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};

export default ChatInput;