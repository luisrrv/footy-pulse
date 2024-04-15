// script_requests.js
// import { createClient } from './client';

import { createClient } from '@supabase/supabase-js'
var supabase = createClient(
    "https://chagefyfszuvkkcpdvax.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYWdlZnlmc3p1dmtrY3BkdmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NjMxMzQsImV4cCI6MjAyODEzOTEzNH0.KfML-8LsC9vfxyeV5tr9502mjUICQ1nrMyJxwl4LW74"
)

export async function getUsers() {
    // const supabase = await createClient();
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
    if (!userId) return [];
    console.log('getting followed player IDs...');
    // const supabase = await createClient();
    const { data: followedIds, error } = await supabase
        .from("followed")
        .select("player_id")
        .eq("user_id", userId);

    if (error) {
        console.error('Error fetching followed:', error.message);
        return [];
    }

    if (followedIds && followedIds.length) {
        console.log('getting followed players data...');

        const playerIds = followedIds.map((followedObj) => followedObj.player_id);

        const { data: players, error } = await supabase
            .from("players")
            .select("*")
            .in("footballapi_id", playerIds);
        
        if (error) {
            console.error('Error fetching followed:', error.message);
            return [];
        }

        return players;
    }

    return [];
};
