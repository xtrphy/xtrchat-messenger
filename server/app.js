const express = require('express');
require('dotenv').config({ path: '../.env' });
const cors = require('cors');

const authRouter = require('./routes/auth.js');

const app = express();

const allowedOrigins = [
    ''
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

// Authorization
app.use('/api/auth', authRouter);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));