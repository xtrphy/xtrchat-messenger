import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AsideProfile from '../AsideProfile/AsideProfile';
import styles from './Profile.module.css'
import { useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) return;

        fetch('http://localhost:3000/api/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error('Error authorization');
                return res.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <main className={styles.profileMain}>
            <ProtectedRoute>
                <AsideProfile user={user} />
                <div className={styles.rightSide}>
                    <FontAwesomeIcon icon={faUser} className={styles.profileLogo} />
                    <h1>Profile</h1>
                </div>
            </ProtectedRoute>
        </main>
    );
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/' replace />;
    }

    return children;
};

export default Profile;