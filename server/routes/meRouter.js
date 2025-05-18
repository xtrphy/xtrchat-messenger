const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: 'User not found' });
    }
});

router.patch('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { bio, avatarUrl } = req.body;

    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        res.json({ message: 'Profile updated', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating profile' });
    }
});

module.exports = router;