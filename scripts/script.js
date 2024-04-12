const axios = require('axios');
import { getUsers, getFollowed } from '@/utils/supabase/requests.ts';

async function sendData(user, playersData) {
  try {
    if(!user.line_id) {
      console.error(`Error. user:${user.id} has not set a LINE user ID.`);
      return;
    }
    console.log(`Sending data to user ${user.line_id}`, playersData);
    const lineRes = await axios.post("/api/linebot", {
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
    dribbles_attempts: "0",
    dribbles_success: "0",
    dribbles: "0 / 0",
    yellow: 0,
    red: 0,
    league: { name: "No league name" },
  };

  if (!statistics || statistics.length === 0) {
    return aggregatedStats;
  }

  for (const group of statistics) {
    aggregatedStats.league.name = group.league?.name || "No league name";;
    aggregatedStats.apps += group.league?.games?.appearences || 0;
    aggregatedStats.goals += group.league?.goals?.total || 0;
    aggregatedStats.penalties += group.league?.penalty?.scored || 0;
    aggregatedStats.assists += group.league?.goals?.assists || 0;
    aggregatedStats.saves += group.league?.goals?.saves || 0;
    aggregatedStats.dribbles_attempts += group.league?.dribbles?.attempts || 0;
    aggregatedStats.dribbles_success += group.league?.dribbles?.success || 0;
    aggregatedStats.dribbles = `${aggregatedStats.dribbles_success} / ${aggregatedStats.dribbles_attempts}`
    aggregatedStats.yellow += group.league?.cards?.yellow || 0;
    aggregatedStats.red += group.league?.cards?.red || 0;
  }

  return aggregatedStats;
}

async function getData() {
  try {
    const users = await getUsers();
    if (!users || users.length === 0) return;

    for (const user of users) {
      const playersData = [];
      const playerIds = await getFollowed(user.id);
      if (!playerIds || playerIds.length === 0) continue;

      for (const pid of playerIds) {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/players',
          params: {
            id: pid,
            season: '2023'
          },
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
          }
        });

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
