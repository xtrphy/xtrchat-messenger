const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');

// Get all chats
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    const chats = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: userId },
                { receiverId: userId }
            ]
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            sender: { select: { id: true, username: true, avatarUrl: true } },
            receiver: { select: { id: true, username: true } },
        }
    });

    res.status(200).json(chats);
});

module.exports = router;