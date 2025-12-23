import requests
import json
import sys
from datetime import datetime
from pathlib import Path
from geopy.geocoders import Nominatim
import io
from libForBin import askPiston

# ======================
# Helpers
# ======================

args = sys.argv

def getCityName(lat, lon):
    geolocator = Nominatim(user_agent="piston")
    coordinates = f"{lat},{lon}"

    try:
        location = geolocator.reverse(coordinates, exactly_one=True)

        if location:
            # The 'raw' data contains a dictionary with full address details
            address = location.raw['address']
            city = address.get('city', address.get('town', address.get('village', 'City not found')))
            return city
        else:
            return "Location not found"
    except Exception as e:
        return f"Error: {e}"

def load_json_safe(path, default=None):
    if default is None:
        default = {}

    if not Path(path).exists():
        return default

    try:
        with open(path, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, ValueError):
        return default


def save_json(path, data):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=4)


# ======================
# Weather fetch
# ======================

def getWeather(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    payload = {
        "latitude": lat,
        "longitude": lon,
        "current_weather": True
    }

    WEATHER_CODES = {
        0: "clear",
        1: "mostly clear",
        2: "partly cloudy",
        3: "overcast",
        45: "foggy",
        48: "foggy",
        51: "light drizzle",
        61: "rain",
        80: "rain showers",
        95: "thunderstorm"
    }

    r = requests.get(url, params=payload, timeout=10)
    r.raise_for_status()

    cw = r.json()["current_weather"]

    weather_code = WEATHER_CODES.get(cw["weathercode"], "unknown")

    return {
        "temperature": cw["temperature"],
        "windSpeed": cw["windspeed"],
        "windDirection": cw["winddirection"],
        "weather": weather_code
    }


# ======================
# Main
# ======================

if __name__ == "__main__":

    # -------- Location cache --------
    locCachePath = "data/tmp/locationCache.txt"
    Path(locCachePath).parent.mkdir(parents=True, exist_ok=True)

    if len(args) == 2:
        city = getCityName(float(args[1]), float(args[2]))
        lat = float(args[3])
        lon = float(args[4])
        weatherData = getWeather(lat, lon)
        weatherCachePath = "data/persistCache/weatherCache.json"
        now = datetime.now()
        payload = {
            "city": city,
            "latitude": lat,
            "longitude": lon,
            **weatherData,
            "year": now.year,
            "day": now.day,
            "hour": now.hour
        }
        save_json(weatherCachePath, payload)
        aiReply, err = askPiston(
            message=(
                "Generate ONE natural spoken sentence describing the weather. "
                f"Weather data: {payload}"
            )
        )
        if err:
            print("Error:", err)
        else:
            print(aiReply.get("reply", aiReply))
            sys.exit(0)

    if not Path(locCachePath).exists() or Path(locCachePath).read_text().strip() == "":
        lat, lon, raw = getLocation()
        city = raw.get("city", "your area")

        with open(locCachePath, "w") as f:
            f.write(f"{lat}\n{lon}\n{city}")
    else:
        with open(locCachePath, "r") as f:
            lines = f.read().splitlines()
            lat = float(lines[0])
            lon = float(lines[1])
            city = lines[2] if len(lines) > 2 else getLocation()[2]["city"]


    # -------- Weather cache --------
    weatherCachePath = "data/persistCache/weatherCache.json"
    now = datetime.now()

    weatherCache = load_json_safe(weatherCachePath)

    refresh = (
        not weatherCache or
        weatherCache.get("year") != now.year or
        weatherCache.get("day") != now.day or
        weatherCache.get("hour") != now.hour
    )

    if refresh:
        weatherData = getWeather(lat, lon)

        payload = {
            "city": city,
            "latitude": lat,
            "longitude": lon,
            **weatherData,
            "year": now.year,
            "day": now.day,
            "hour": now.hour
        }

        save_json(weatherCachePath, payload)
    else:
        payload = weatherCache


    # -------- Ask AI to speak naturally --------
    aiReply, err = askPiston(
        message=(
            "Generate ONE natural spoken sentence describing the weather. "
            f"Weather data: {payload}"
        )
    )

    if err:
        print("Error:", err)
    else:
        print(aiReply.get("reply", aiReply))
