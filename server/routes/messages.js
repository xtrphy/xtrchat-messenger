const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');
const botService = require('../services/botService');

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

    try {
        const message = await prisma.message.create({
            data: { senderId, receiverId, content }
        });

        const receiver = await prisma.user.findUnique({
            where: { id: receiverId },
            select: { username: true }
        });

        if (receiver && ['ChatBot', 'HelpDesk', 'NewsBot'].includes(receiver.username)) {
            botService.sendBotResponse(senderId);
        }

        res.status(201).json(message);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;