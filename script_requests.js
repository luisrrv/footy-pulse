import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

// FOOTYPULSE APP
export async function getUsers() {
    var supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: users, error } = await supabase
        .from("users_data")
        .select()
        .not("discord_webhook_url", "is", null);

    if (error) {
        console.error('Error fetching users:', error.message);
        return [];
    }
    return users;
}

export async function getFollowed(userId) {
    if (!userId) throw new TypeError('Invalid userId provided');
    var supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: followedIds, error } = await supabase
        .from("followed")
        .select("player_id")
        .eq("user_id", userId);

    if (error) {
        console.error('Error fetching followed:', error.message);
        throw new TypeError(error.message);
    }

    if (followedIds && followedIds.length) {
        const playerIds = followedIds.map((followedObj) => followedObj.player_id);

        const { data: players, error } = await supabase
            .from("players")
            .select("*")
            .in("footballapi_id", playerIds);
        
        if (error) {
            console.error('Error fetching followed:', error.message);
            throw new TypeError(error.message);
        }

        return players;
    }

    return [];
};

// OP BOT
export async function fetchMessageIDs() {
    var supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
        .from('op_messages')
        .select('id, message_id')
        .order('id', { ascending: false })
        .limit(1); // Fetch only the latest message_id

    if (error) {
        console.error('Error fetching message IDs:', error.message);
        return [];
    }
    return data;
}

export async function storeMessageID(messageID) {
    if (!messageID) return null;
    var supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
        .from('op_messages')
        .insert({ message_id: messageID });

    if (error) {
        console.error('Error storing message ID:', error.message);
        return null;
    }
    return data;
}
