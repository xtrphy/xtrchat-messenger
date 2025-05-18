import { useState, useEffect } from 'react';
import Aside from './components/Aside/Aside';
import Chats from './pages/Chats/Chats';
import styles from './App.module.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [chats, setChats] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(false);
    const [messages, setMessages] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchChats = async () => {
            if (token) {
                const res = await fetch(`http://localhost:3000/api/chats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setChats(data);
            } else {
                setChats([]);
            }
        }

        fetchChats();
    }, [token, refreshTrigger]);

    useEffect(() => {
        if (!selectedUserId) return;

        const fetchChat = async () => {
            const res = await fetch(`http://localhost:3000/api/messages/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setMessages(data);
        };

        fetchChat();
    }, [selectedUserId, token, refreshTrigger]);

    useEffect(() => {
        const handleRefresh = () => {
            setRefreshTrigger(prev => prev + 1);
        };

        window.addEventListener('refreshMessages', handleRefresh);

        return () => {
            window.removeEventListener('refreshMessages', handleRefresh);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Aside token={token} setToken={setToken} chats={chats} setChats={setChats} selectedUserId={selectedUserId} onSelectUser={setSelectedUserId} />
            <Chats messages={messages} selectedUserId={selectedUserId} />
        </div>
    )
}

export default App;
