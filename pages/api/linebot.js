// // import { NextApiRequest, NextApiResponse } from "next";
// import * as line from "@line/bot-sdk";

// const config = {
//     // channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || "",
//     // channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || "",
// };

// const client = new line.Client(config);
// // const req = NextApiRequest;
// // const res = NextApiResponse;

// export default async function handler(req, res) {
//     try {
//         const { message, user_id } = req.body;
        
//         if (!user_id || !message) {
//             return res.status(400).json({ error: "Invalid request data." });
//         }

//         await client.pushMessage(user_id, {
//             type: "text",
//             text: message,
//         });

//         res.status(200).json({ message: `Message: "${message}" has been sent.` });
//     } catch (e) {
//         console.error("Line API Error:", e);
//         res.status(500).json({ error: "Failed to send message." });
//     }
// }
