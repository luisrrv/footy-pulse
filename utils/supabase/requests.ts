import { createClient } from './client';

export const getUsers = async () => {
    const supabase = await createClient();
    const { data: users, error } = await supabase
        .from("emails")
        .select();

    if (error) {
        console.error('Error fetching users:', error.message);
        return [];
    }
    return users;
}

export const getFollowed = async (userId: any) => {
    if (!userId) return [];
    console.log('getting followed player IDs...');
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
        console.log('getting followed players data...');

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
    console.log('getting ALL players from db...');

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

export const addPlayerToFollowed = async (userId: any ,footballapiId: any) => {
    if (!userId || !footballapiId) return false;
    console.log('adding player to followed table...');

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
    console.log('removing player to followed table...');

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

export const addLineId = async (userId: any, lineId: any) => {
    if (!userId) return false;
    console.log('adding line user ID to emails table...');

    const supabase = await createClient();
    const { data: res, error } = await supabase
        .from("emails")
        .update({"line_id": lineId})
        .eq("user_id", userId);

    if (error) {
        console.error('Error adding line user ID:', error.message);
        return false;
    }

    return true;
};