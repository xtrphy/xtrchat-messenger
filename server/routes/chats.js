const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');

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

module.exports = router;