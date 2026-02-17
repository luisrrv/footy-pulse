import dotenv from 'dotenv';
import { fetchMessageIDs, storeMessageID } from './script_requests.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { WebClient } from '@slack/web-api';

dotenv.config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const web = new WebClient(SLACK_OAUTH_TOKEN);

// 🔥 Hype Messages (Final Approved List)
const hypeMessages = [
    "¡Nuevo capítulo, está bien cabrón!",
    "¡Se prendió esta chingadera con el nuevo capítulo!",
    "¡Nuevo capítulo triple hijuepuuuuta!",
    "¡Oda está intratable, nuevo capítulo malparidooo!",
    "¡Ya fue peee, nuevo capítulo causa!",
    "¡Nuevo capítulo y Oda está cocinando fino pe!",
    "¡Nuevo capítulo, me flipo en colores chaval!",
    "¡Estoy flipando fuerte con el nuevo capítulo!",
    "Nuevo capítulo. Silencio. GODA habló.",
    "Este nuevo capítulo es literalmente peak fiction.",
    "Estamos presenciando historia con este nuevo capítulo.",
    "Oda está jugando ajedrez 5D otra vez.",
    "Estamos viendo a GODA en su prime.",
    "Esto no es manga, es arte.",
    "Nuevo capítulo y el foreshadowing es absurdo.",
    "Oda volvió a cocinar gourmet.",
    "Este nuevo capítulo cambia todo.",
    "Nuevo capítulo… y ustedes dudaban."
];

const hypeEmojis = ["🚬", "🔥", "🗿", "🤫"];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomHype() {
    const message = getRandom(hypeMessages);
    const emoji = getRandom(hypeEmojis);
    return `${message} ${emoji}`;
}


client.on('ready', async () => {
    await fetchNewMessages();
    // Gracefully exit
    setTimeout(() => {
        client.destroy(); // Disconnect the client (stop the continuous connection)
        process.exit(0); // Exit node process with code 0 (success)
    }, 5000);
	return;
});

async function fetchNewMessages() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        console.error("Channel not found.");
        return;
    }

    const lastMessage = await fetchMessageIDs();

    let newMessages;
    if (lastMessage && lastMessage.length > 0) {
        newMessages = await channel.messages.fetch({ after: lastMessage[0].message_id });
    } else {
        newMessages = await channel.messages.fetch();
    }

    for (const message of newMessages.values()) {
        const content = message.content.toLowerCase();

        // Detect chapter release message
        if (/(?=.*\bchapter\b)(?=.*\brelease\b)(?=.*\b1\d{3}\b)/i.test(content)) {

            console.log("~~ new op chapter message ~~");

            const editedMessage = message.content.replace(/@everyone/g, '');
            const randomHype = getRandomHype();

            await sendToSlack(`<!channel> ${randomHype}\n\n${editedMessage}`);
        } 
        // Test trigger
        else if (content.includes("this is a test")) {
            console.log("~~ test message ~~");
            await sendToSlack(
                "<!channel>\n\nSistema funcionando correctamente.🗿"
            );
        }
    }

    if (newMessages.size > 0) {
        await storeMessageID(newMessages.first().id);
    }
}

async function sendToSlack(messageContent) {
    console.log('Sending message to Slack...');
    try {
        const result = await web.chat.postMessage({
            channel: SLACK_CHANNEL_ID,
            text: messageContent
        });

        if (result.ok) {
            console.log('Message sent.');
        } else {
            console.log('Message not sent.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

client.login(TOKEN);
