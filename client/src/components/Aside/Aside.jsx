import React from 'react';
import styles from './Aside.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import AuthForm from '../Auth/AuthForm';
import Chat from '../Chat/Chat';

const Aside = ({ token, setToken, chats, setChats, onSelectUser }) => {
    const [isAuthFormActive, setIsAuthFormActive] = useState(false);
    const [user, setUser] = useState(token);

    return (
        <aside>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Link className={styles.logo} to='/'>XTRchat</Link>
                    <MenuDropdown user={user} setUser={setUser} setChats={setChats} setIsAuthFormActive={setIsAuthFormActive} />
                </div>
                {chats && chats.length > 0 ? (
                    <div className={styles.chats}>
                        {chats.map(chat => {
                            return (
                                <Chat key={chat.id} chat={chat} onSelectUser={onSelectUser} />
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