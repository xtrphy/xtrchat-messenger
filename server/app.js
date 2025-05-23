const express = require('express');
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/auth.js');
const meRouter = require('./routes/meRouter.js');
const chatsRouter = require('./routes/chats.js');
const messagesRouter = require('./routes/messages.js');
const botService = require('./services/botService.js');

const app = express();

const allowedOrigins = [
    'https://xtrmessenger.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

(async () => {
    try {
        await botService.ensureBotsExist();
        console.log('Bot users initialized');

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
    } catch (err) {
        console.error('Error initializing bot users', err);
    }
})();

// Authorization
app.use('/api/auth', authRouter);

// Profile
app.use('/api/me', meRouter);

// Chats
app.use('/api/chats', chatsRouter);

// Messages
app.use('/api/messages', messagesRouter);