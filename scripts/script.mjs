import axios from 'axios';
// import pkg from '../utils/supabase/script_requests.js';
// const { getUsers, getFollowed } = pkg;
import { getUsers, getFollowed } from '../utils/supabase/script_requests.js';

async function sendData(user, playersData) {
  try {
    if(!user.line_id) {
      console.error(`Error. user:${user.id} has not set a LINE user ID.`);
      return;
    }
    console.log(`Sending data to user ${user.line_id}`, playersData);
    const lineRes = await axios.post("pages/api/linebot", {
      message: "This is a test message sent from FootyPulse.",
      user_id: user.line_id
    });
    console.log("🚀 ~~~~~ lineRes:", lineRes);
  } catch (error) {
    console.error(`Error sending data to user ${user.id}:`, error);
  }
}

async function calculateAggregatedStats(statistics) {
  let aggregatedStats = {
    apps: 0,
    goals: 0,
    penalties: 0,
    assists: 0,
    saves: 0,
    dribbles_attempts: 0,
    dribbles_success: 0,
    dribbles: 0,
    yellow: 0,
    red: 0,
    // league: { name: "No league name" }, // TODO: add individual league stats
  };
  
  if (!statistics || statistics.length === 0) {
    return aggregatedStats;
  }

  for (const group of statistics) {
    
    // aggregatedStats.league.name = group.league?.name || "No league name";
    aggregatedStats.apps += group.games?.appearences || 0;
    aggregatedStats.goals += group?.goals?.total || 0;
    aggregatedStats.penalties += group?.penalty?.scored || 0;
    aggregatedStats.assists += group?.goals?.assists || 0;
    aggregatedStats.saves += group?.goals?.saves || 0;
    aggregatedStats.dribbles_attempts += group?.dribbles?.attempts || 0;
    aggregatedStats.dribbles_success += group?.dribbles?.success || 0;
    aggregatedStats.dribbles = `${aggregatedStats.dribbles_success} / ${aggregatedStats.dribbles_attempts}`
    aggregatedStats.yellow += group?.cards?.yellow || 0;
    aggregatedStats.red += group?.cards?.red || 0;
  }

  return aggregatedStats;
}

async function getData() {
  try {
    const users = await getUsers();
    console.log("🚀 ~ getData ~ users:", users)
    if (!users || users.length === 0) return;

    for (const user of users) {
      const playersData = [];
      const players = await getFollowed(user.user_id);
      if (!players || players.length === 0) continue;

      for (const player of players) {
        console.log("🚀 ~ getData ~ player:", player.footballapi_id);
        const response = await axios.request({
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/players',
          params: {
            id: player?.footballapi_id || 0,
            season: '2023'
          },
          headers: {
            // 'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
            // 'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
            'X-RapidAPI-Key': "f65b49ec54msh838136968741b19p1d0015jsn1629b985804a",
            'X-RapidAPI-Host': "api-football-v1.p.rapidapi.com"
          }
        });
        console.log("🚀 ~ FootballAPI ~ response:", response.data);
        
        if (response && response.data && response.data.results > 0 && response.data.response[0]) {
          const playerInfo = response.data.response[0]?.player;
          const playerStats = await calculateAggregatedStats(response.data.response[0]?.statistics);
          playerStats.name = playerInfo?.name || "No name";
          playersData.push(playerStats);
        }
      }

      await sendData(user, playersData);
    }
  } catch (error) {
    console.error(error);
  }
}

getData();
