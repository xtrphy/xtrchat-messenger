const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/:userId', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const peerId = req.params.userId;

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: userId, receiverId: peerId },
                { senderId: peerId, receiverId: userId }
            ]
        },
        orderBy: { createdAt: 'asc' },
        include: {
            sender: { select: { id: true, username: true, avatarUrl: true } },
            receiver: { select: { id: true, username: true, avatarUrl: true } },
        }
    });

    res.status(200).json(messages);
});

router.post('/', authenticateToken, async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !content) return res.status(400).json({ error: 'Missing data' });

    const message = await prisma.message.create({
        data: { senderId, receiverId, content }
    });

    res.status(201).json(message);
});

module.exports = router;