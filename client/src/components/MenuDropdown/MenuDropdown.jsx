import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faUser } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect, useRef } from 'react';
import styles from './MenuDropdown.module.css';

const MenuDropdown = ({ setIsAuthFormActive }) => {
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const ProfileIcon = <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} />
    const ExitIcon = <FontAwesomeIcon icon={faCircleXmark} />

    const toggleMenu = () => setOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('http://localhost:3000/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setUser(res.data);
        }).catch(() => localStorage.removeItem('token'));
    }, []);

    return user ? (
        <div className={styles.menuContainer} ref={menuRef}>
            <button className={styles.toggleMenuBtn} onClick={toggleMenu}>&#8942;</button>

            <div className={`${styles.menuPanel} ${open ? styles.show : ''}`}>
                <ul>
                    <MenuItem icon={ProfileIcon} label='Profile' />
                    <MenuItem icon={ExitIcon} label='Exit' />
                </ul>
            </div>
        </div>
    ) : (
        <button className={styles.logInBtn} onClick={() => setIsAuthFormActive(true)}>Log In</button>
    );
};

const MenuItem = ({ icon, label }) => (
    <li className={styles.menuItem}>
        <span className={styles.icon}>{icon}</span>
        <span>{label}</span>
    </li>
);

export default MenuDropdown;