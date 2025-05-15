const express = require('express');
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/auth.js');
const meRouter = require('./routes/meRouter.js');

const app = express();

const allowedOrigins = [
    'http://localhost:5173'
];

app.use(express.json());

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

// Authorization
app.use('/api/auth', authRouter);

// Profile
app.use('/api/me', meRouter);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));