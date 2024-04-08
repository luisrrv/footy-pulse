from dotenv import dotenv_values
import http.client

env_vars = dotenv_values(".env.local")
rapid_api_key = env_vars.get("NEXT_PUBLIC_RAPID_API_KEY")
rapid_api_host = env_vars.get("NEXT_PUBLIC_RAPID_API_HOST")

conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")

headers = {
    'X-RapidAPI-Key': rapid_api_key,
    'X-RapidAPI-Host': rapid_api_host
}

conn.request("GET", "/v3/players?id=874&season=2023", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))