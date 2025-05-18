const prisma = require('../prisma/client');

const botResponses = [
    "Hi there! How can I help you today?",
    "That's interesting. Tell me more.",
    "I'm just a demo bot for testing the chat application.",
    "What do you think about this chat interface?",
    "XTRchat is a great application, right?",
    "Feel free to test all the features of this application.",
    "This is a demonstration of the chat functionality.",
    "How's your day going?",
    "What would you like to discuss today?",
    "I'm just a simple bot, but I can respond to your messages!",
    "This chat system supports real-time messaging between users.",
    "Try sending different types of messages to see how they appear in the chat."
];

async function ensureBotsExist() {
    const bots = [
        {
            username: 'ChatBot',
            email: 'chatbot@xtrchat.com',
            passwordHash: 'not-a-real-password',
            avatarUrl: 'https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740',
            bio: 'I am a demo bot that helps you test the chat application.'
        },
        {
            username: 'HelpDesk',
            email: 'helpdesk@xtrchat.com',
            passwordHash: 'not-a-real-password',
            avatarUrl: 'https://www.cambridge.org/elt/blog/wp-content/uploads/2020/08/GettyImages-1221348467-e1597069527719.jpg',
            bio: 'Virtual support assistant for XTRchat.'
        },
        {
            username: 'NewsBot',
            email: 'news@xtrchat.com',
            passwordHash: 'not-a-real-password',
            avatarUrl: 'https://avatars.slack-edge.com/2021-03-25/1882974265975_c2814223e012464d1ead_512.png',
            bio: 'Get the latest updates and news!'
        }
    ];

    for (const bot of bots) {
        const existingBot = await prisma.user.findUnique({
            where: { username: bot.username }
        });

        if (!existingBot) {
            await prisma.user.create({ data: bot });
            console.log(`Created bot user: ${bot.username}`);
        }
    }
}

function getRandomBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
}

async function getRandomBot() {
    const bots = await prisma.user.findMany({
        where: {
            OR: [
                { username: 'ChatBot' },
                { username: 'HelpDesk' },
                { username: 'NewsBot' }
            ]
        }
    });

    if (bots.length === 0) {
        await ensureBotsExist();
        return getRandomBot();
    }

    const randomIndex = Math.floor(Math.random() * bots.length);
    return bots[randomIndex];
}

async function sendBotResponse(userId) {
    try {
        const delay = Math.floor(Math.random() * 2000) + 1000;

        await new Promise(resolve => setTimeout(resolve, delay));

        const bot = await getRandomBot();
        const response = getRandomBotResponse();

        const message = await prisma.message.create({
            data: {
                senderId: bot.id,
                receiverId: userId,
                content: response
            }
        });

        return message;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function initializeDemoChat(userId) {
    try {
        const bot = await getRandomBot();

        const existingMessages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: bot.id },
                    { senderId: bot.id, receiverId: userId }
                ]
            }
        });

        if (existingMessages.length === 0) {
            await prisma.message.create({
                data: {
                    senderId: bot.id,
                    receiverId: userId,
                    content: `Hello! I'm ${bot.username}. Welcome to XTRchat! Feel free to send me a message to test the chat functionality.`
                }
            });
        }

        return bot;
    } catch (error) {
        console.error('Error initializing demo chat:', error);
        return null;
    }
}

module.exports = {
    ensureBotsExist,
    getRandomBotResponse,
    getRandomBot,
    sendBotResponse,
    initializeDemoChat
};