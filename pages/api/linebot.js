// import { NextApiRequest, NextApiResponse } from "next";
import * as line from "@line/bot-sdk";

const config = {
    // channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || "",
    // channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || "",
    channelAccessToken: "Mj3t5Z9OKuHvKzVJ1RrtVSVl5IC8wPPG2j1QstLlRyemu9WbnQPXmk6G2kbR5+j8jlOHRY9in+pinlq+qN8zypmrOg09Lguu7jMYBhP2ZewLMblDsh32O8szK5LGdIkZMCCUbfALq4HwnnHHoLsbxgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "050b9f7910e6c87249e09023d18f1523"
};

const client = new line.Client(config);
// const req = NextApiRequest;
// const res = NextApiResponse;

export default async function handler(req, res) {
    try {
        console.log("~~~~~~~~~~~~~~~ req:", req);
        const { message, user_id } = req.body;
        
        if (!user_id || !message) {
            return res.status(400).json({ error: "Invalid request data." });
        }

        await client.pushMessage(user_id, {
            type: "text",
            text: message,
        });

        res.status(200).json({ message: `Message: "${message}" has been sent.` });
    } catch (e) {
        console.error("Line API Error:", e);
        res.status(500).json({ error: "Failed to send message." });
    }
}
