const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');
const botService = require('../services/botService');

// Get all chats
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: userId },
                { receiverId: userId }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            sender: { select: { id: true, username: true, avatarUrl: true } },
            receiver: { select: { id: true, username: true, avatarUrl: true } },
        }
    });

    const uniqueChats = new Map();

    messages.forEach(message => {
        const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;

        if (!uniqueChats.has(otherUserId) ||
            new Date(message.createdAt) > new Date(uniqueChats.get(otherUserId).createdAt)) {
            uniqueChats.set(otherUserId, message);
        }
    });

    const chats = Array.from(uniqueChats.values()).sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(chats);
});

router.post('/demo', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        await botService.ensureBotsExist();

        const bot = await botService.initializeDemoChat(userId);

        if (!bot) {
            return res.status(500).json({ error: 'Could not create demo chat' });
        }

        res.status(200).json({
            message: 'Demo chat created successfully',
            botId: bot.id
        });
    } catch (err) {
        console.error('Error creating demo chat', err);
        res.status(500).json({ error: 'Failed to create demo chat' });
    }
});

module.exports = router;