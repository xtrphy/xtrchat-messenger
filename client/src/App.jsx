import { useState, useEffect } from 'react';
import Aside from './components/Aside/Aside';
import Chats from './pages/Chats/Chats';
import styles from './App.module.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (token) {
                const res = await fetch(`http://localhost:3000/api/chats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setChats(data);
            } else {
                return;
            }
        }

        fetchChats();
    }, [token])

    return (
        <div className={styles.container}>
            <Aside token={token} setToken={setToken} chats={chats} setChats={setChats} />
            <Chats />
        </div>
    )
}

export default App;
