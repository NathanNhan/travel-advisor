
import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "5a1f7f4154mshb90f95ffcdd5491p1d6dd2jsnfc05613eff1b",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherMap = async (lat, lng) => {
  try {
    const { data } = axios.get(
      "https://community-open-weather-map.p.rapidapi.com/weather",
      {
        params: {
          lat: lat,
          lon: lng,
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "5a1f7f4154mshb90f95ffcdd5491p1d6dd2jsnfc05613eff1b",
        },
      }
    );
    return data
  } catch (error) {
    console.log(error);
  }
};
