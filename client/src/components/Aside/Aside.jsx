import React from 'react';
import styles from './Aside.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import AuthForm from '../Auth/AuthForm';
import Chat from '../Chat/Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const Aside = ({ token, setToken, chats, setChats, selectedUserId, onSelectUser }) => {
    const [isAuthFormActive, setIsAuthFormActive] = useState(false);
    const [user, setUser] = useState(token);

    const createTestChat = async () => {
        if (!token) return;

        try {
            const res = await fetch('https://xtrchat-messenger.onrender.com/api/chats/demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to create test chat');
            }

            const data = await res.json();

            const refreshEvent = new CustomEvent('refreshMessages');
            window.dispatchEvent(refreshEvent);

            if (data.botId) {
                onSelectUser(data.botId);
            }
        } catch (err) {
            console.error('Error creating test chat', err);
        }
    };

    return (
        <aside>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Link className={styles.logo} to='/'>XTRchat</Link>
                    <MenuDropdown user={user} setUser={setUser} setChats={setChats} setIsAuthFormActive={setIsAuthFormActive} />
                </div>

                {token && (
                    <button className={styles.testChatBtn} onClick={createTestChat}>
                        <FontAwesomeIcon icon={faMessage} />
                        <span>Start Test Chat</span>
                    </button>
                )}

                {chats && chats.length > 0 ? (
                    <div className={styles.chats}>
                        {chats.map(chat => {
                            return (
                                <Chat key={chat.id} chat={chat} selectedUserId={selectedUserId} onSelectUser={onSelectUser} />
                            )
                        })}
                    </div>
                ) : user ? (
                    <span className={styles.asideMessage}>No chats</span>
                ) : (
                    <span className={styles.asideMessage}>Please log in to see chats</span>
                )}
                <AuthForm setToken={setToken} setUser={setUser} isAuthFormActive={isAuthFormActive} setIsAuthFormActive={setIsAuthFormActive} />
            </div>
        </aside>
    );
};

export default Aside;