import axios from 'axios';
import { getUsers, getFollowed } from './script_requests.js';
import dotenv from 'dotenv';
dotenv.config();

async function discordHandler(webhookUrl, data) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  await new Promise((resolve, reject) => {
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          username: "FootyPulse",
          content: `Your followed player(s) stats from FootyPulse (${currentDate}):\n\n`
        }
      ),
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`Could not send message: ${response.status}`));
        }
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
  
  for (const playerData of data) {
    const content = `
    **${playerData.name}**:
    Apps: ${playerData.apps}
    Goals: ${playerData.goals}
    PKs: ${playerData.penalties}
    Assists: ${playerData.assists}
    Saves: ${playerData.saves}
    Dribbles: ${playerData.dribbles}
    Yellow Cards: ${playerData.yellow}
    Red Cards: ${playerData.red}\n
    `; 

    await new Promise((resolve, reject) => {
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            username: "FootyPulse",
            // content: content,
            embeds: [{
              color: "8702998",
              description: content
            }]
          }
        ),
      })
        .then((response) => {
          if (!response.ok) {
            reject(new Error(`Could not send message: ${response.status}`));
          }
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}

async function sendData(user, playersData) {
  try {
    if(!user.discord_webhook_url) {
      console.error(`Error. user:${user.id} has not set a Discord webhook URL.`);
      return;
    }
    console.log(`Sending player's data to user`);
    await discordHandler(user.discord_webhook_url, playersData);
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
    if (!users || users.length === 0) return;

    for (const user of users) {
      const playersData = [];
      const players = await getFollowed(user.user_id);
      if (!players || players.length === 0) continue;

      for (const player of players) {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/players',
          params: {
            id: player?.footballapi_id || 0,
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
