import dotenv from 'dotenv';
import { fetchMessageIDs, storeMessageID } from './script_requests.js';
import { Client, GatewayIntentBits, /*WebhookClient*/ } from 'discord.js';
import { WebClient } from '@slack/web-api';

dotenv.config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
// const WEBHOOK_URL = process.env.WEBHOOK_URL;
const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
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

            await sendToSlack(message.content);
            await sendToSlack("SIUUUUUUUU!");
        }
    }

    if (newMessages.size > 0) {
        await storeMessageID(newMessages.first().id);
    }
    return;
}

async function sendToSlack(messageContent) {
    const web = new WebClient(SLACK_OAUTH_TOKEN);
    (async () => {
        try {
            const result = await web.chat.postMessage({
                channel: SLACK_CHANNEL_ID,
                text: messageContent
            });
            console.log('Message sent: ', result.ts);
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    })();
    return;
}

client.login(TOKEN);
