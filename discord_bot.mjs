import dotenv from 'dotenv';
import { fetchMessageIDs, storeMessageID } from './script_requests.js';
import { Client, GatewayIntentBits, WebhookClient } from 'discord.js';

dotenv.config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await fetchNewMessages();
    return;
});

async function fetchNewMessages() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    const lastMessage = await fetchMessageIDs(); 
    console.log("~~~~~~  lastMessage  ~~~~~~", lastMessage);

    let newMessages;
    if (lastMessage && lastMessage.length > 0) {
        newMessages = await channel.messages.fetch({ after: lastMessage[0].message_id });
    } else {
        newMessages = await channel.messages.fetch();
    }

    for (const message of newMessages.values()) {
        if (/chapter.*release/i.test(message.content.toLowerCase())) {
            console.log("~~~~~~  message to be sent  ~~~~~~\n\n", message.content);
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            // TODO: send somewhere else
            await sendToWebhook(message.content);
            await sendToWebhook("SIUUUUUUUU!");
        }
    }

    if (newMessages.size > 0) {
        await storeMessageID(newMessages.first().id);
    }
    return;
}

async function sendToWebhook(messageContent) {
    const webhook = new WebhookClient({ url: WEBHOOK_URL });
    await webhook.send(messageContent);
    return;
}

client.login(TOKEN);
