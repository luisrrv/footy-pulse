import { createClient } from './client';

export const getUsers = async () => {
    const supabase = await createClient();
    const { data: users, error } = await supabase
        .from("users_data")
        .select();

    if (error) {
        console.error('Error fetching users:', error.message);
        return [];
    }
    return users;
}

export const getFollowed = async (userId: any) => {
    if (!userId) return [];

    const supabase = await createClient();
    const { data: followedIds, error } = await supabase
        .from("followed")
        .select("player_id")
        .eq("user_id", userId);

    if (error) {
        console.error('Error fetching followed:', error.message);
        return [];
    }

    if (followedIds && followedIds.length) {
        const playerIds = followedIds.map((followedObj: any) => followedObj.player_id);

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

export const getPlayers = async () => {
    const supabase = await createClient();
    const { data: players, error } = await supabase
        .from("players")
        .select("*")

    if (error) {
        console.error('Error fetching players:', error.message);
        return [];
    }

    return players;
};

export const getDiscordData = async (userId: string) => {
    const supabase = await createClient();
    const { data: data, error } = await supabase
    .from("users_data")
        .select("discord_webhook_url")
        .eq("user_id", userId)

    if (error) {
        console.error('Error fetching discord data:', error.message);
        return [];
    }

    return data;
};

export const addPlayerToFollowed = async (userId: any ,footballapiId: any) => {
    if (!userId || !footballapiId) return false;

    const supabase = await createClient();
    const { data: res, error } = await supabase
        .from("followed")
        .insert({"user_id": userId, "player_id": footballapiId});

    if (error) {
        console.error('Error following player:', error.message);
        return false;
    }

    return true;
};

export const removePlayerFromFollowed = async (userId: any ,footballapiId: any) => {
    if (!userId || !footballapiId) return false;

    const supabase = await createClient();
    const { data: res, error } = await supabase
        .from("followed")
        .delete()
        .eq("user_id", userId)
        .eq("player_id", footballapiId);

    if (error) {
        console.error('Error unfollowing player:', error.message);
        return false;
    }

    return true;
};

export const addDiscordWebhookUrl = async (userId: any, webhookUrl: any) => {
    if (!userId) return false;

    const supabase = await createClient();
    const { data: res, error } = await supabase
        .from("users_data")
        .update({"discord_webhook_url": webhookUrl})
        .eq("user_id", userId);

    if (error) {
        console.error('Error adding discord webhook URL:', error.message);
        return false;
    }

    return true;
};