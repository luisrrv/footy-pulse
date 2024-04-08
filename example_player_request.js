const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/players',
  params: {
    id: '874',
    season: '2023'
  },
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}