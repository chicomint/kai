require('dotenv').config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('./config.json');
const genAI = new GoogleGenerativeAI(config.kittyApiKey);

const chatHistories = {};

function ai(client) {
    console.log('ai.js is load.');
    const targetChannels = ["1306281117254422629", "1326092527807369258"];
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview",
        systemInstruction: "you are female; talk like a normal person, maybe cutie kawaii ~\\(≧▽≦)/~; no 18+ sfw; and don't chat long text like ai, using Kawaii Emojis.", 
    });

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!targetChannels.includes(message.channel.id)) return;

        await message.channel.sendTyping();

        if (!chatHistories[message.channel.id]) {
            chatHistories[message.channel.id] = model.startChat({
                history: [], 
                generationConfig: { maxOutputTokens: 500 }
            });
        }

        try {
            const chat = chatHistories[message.channel.id];
            const result = await chat.sendMessage(message.content);
            const response = result.response.text();
            
            const finalNode = response.length > 2000 ? response.substring(0, 1997) + "..." : response;
            await message.reply(finalNode);
        } catch (error) {
            console.error('Oopsie! Error:', error);
            delete chatHistories[message.channel.id];
            await message.reply("I had a little brain freeze... (｡•́︿•̀｡), you should try again next time!<3");
        }
    });
}
module.exports = { ai };