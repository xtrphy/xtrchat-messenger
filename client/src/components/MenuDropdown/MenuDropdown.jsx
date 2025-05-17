import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faUser } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect, useRef } from 'react';
import styles from './MenuDropdown.module.css';
import { Link } from 'react-router-dom';

const MenuDropdown = ({ setIsAuthFormActive, user, setUser, setChats }) => {
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

    const handleExit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        setChats([]);
    };

    return user ? (
        <div className={styles.menuContainer} ref={menuRef}>
            <button className={styles.toggleMenuBtn} onClick={toggleMenu}>&#8942;</button>

            <div className={`${styles.menuPanel} ${open ? styles.show : ''}`}>
                <ul>
                    <Link to='/profile' className={styles.linkToProfile} >
                        <span className={styles.icon}>{ProfileIcon}</span>
                        <span className={styles.buttonText}>Profile</span>
                    </Link>

                    <button className={styles.menuButton} onClick={handleExit}>
                        <span className={styles.icon}>{ExitIcon}</span>
                        <span className={styles.buttonText}>Exit</span>
                    </button>
                </ul>
            </div>
        </div>
    ) : (
        <button className={styles.logInBtn} onClick={() => setIsAuthFormActive(true)}>Log In</button>
    );
};

export default MenuDropdown;