import { createClient } from './client';

export const getFollowed = async ( userId: any ) => {
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
        console.log('getting followed players data...', followedIds);

        const { data: players, error } = await supabase
            .from("players")
            .select("*")
            .in("footballapi_id",followedIds);
        
        if (error) {
            console.error('Error fetching followed:', error.message);
            return [];
        }

        return players;
    }

    return [];
};

export const getPlayers = async ( ) => {
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