import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

// The daily digest job reads every user's rows, so it uses the service-role key
// (a GitHub secret, never shipped to the browser) and row-level security can
// stay strict for the web app. Falls back to the anon key for older setups.
const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// FOOTYPULSE APP
export async function getUsers() {
    var supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_KEY
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
        SUPABASE_KEY
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
