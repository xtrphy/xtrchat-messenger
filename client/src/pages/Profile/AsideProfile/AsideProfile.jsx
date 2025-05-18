import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import styles from './AsideProfile.module.css';
import { useState, useEffect } from 'react';

const AsideProfile = ({ user, onUpdateUser }) => {
    const [bio, setBio] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [avatarUrlInput, setAvatarUrlInput] = useState('');
    const [isEditingBio, setIsEditingBio] = useState(false);

    useEffect(() => {
        if (user?.bio) {
            setBio(user.bio);
            setInputValue(user.bio);
        }
    }, [user?.bio]);

    useEffect(() => {
        if (user?.avatarUrl) {
            setAvatarUrlInput(user.avatarUrl);
        }
    }, [user?.avatarUrl]);

    const editIcon = <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", }} />;

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        const res = await fetch('http://localhost:3000/api/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bio: inputValue, avatarUrl: avatarUrlInput }),
        });

        if (res.ok) {
            const updated = await res.json();
            onUpdateUser?.(updated.user);

            setBio(inputValue);
            setIsEditingBio(false);
        } else {
            alert('Error while saving');
        }
    };

    return (
        <aside>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Link className={styles.logo} to='/'>XTRchat</Link>
                </div>
                <div className={styles.profileInfo}>
                    <img className={styles.avatar} src={user.avatarUrl ? user.avatarUrl : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="Your avatar" />
                    <h2 className={styles.username}>{user.username}</h2>

                    {isEditingBio ? (
                        <div className={styles.editingBioContainer}>
                            <textarea
                                className={styles.bioTextarea}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='Write about yourself'
                            />

                            <input
                                className={styles.avatarInput}
                                type="text"
                                placeholder='URL to avatar'
                                value={avatarUrlInput}
                                onChange={(e) => setAvatarUrlInput(e.target.value)} />

                            <button onClick={handleSave} className={styles.submitBtn}>
                                Сохранить
                            </button>
                        </div>
                    ) : bio ? (
                        <p className={styles.bio}>
                            {bio}
                            <button className={styles.startEditingBtn} onClick={() => setIsEditingBio(true)}>{editIcon}</button>
                        </p>
                    ) : (
                        <p>
                            Change profile details
                            <button className={styles.startEditingBtn} onClick={() => setIsEditingBio(true)}>{editIcon}</button>
                        </p>

                    )}
                </div>
            </div>
        </aside>
    );
};

export default AsideProfile;