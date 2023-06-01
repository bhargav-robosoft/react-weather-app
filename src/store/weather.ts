import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Weather from "../models/Weather";

export type WeatherState = {
  searchFilter: string;
  homeWeather: Weather | null;
  favourites: string[];
  favouritesWeather: Weather[];
  recents: string[];
  recentsWeather: Weather[];
};

const initialWeatherState: WeatherState = {
  searchFilter: "",
  homeWeather: null,
  favourites: [],
  favouritesWeather: [],
  recents: [],
  recentsWeather: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    applySearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setData: (
      state,
      action: PayloadAction<{
        homeWeatherData: Weather;
        favourites: string[];
        favouritesWeather: Weather[];
        recents: string[];
        recentsWeather: Weather[];
      }>
    ) => {
      state.homeWeather = action.payload.homeWeatherData;
      state.favourites = action.payload.favourites;
      state.favouritesWeather = action.payload.favouritesWeather;
      state.recents = action.payload.recents;
      state.recentsWeather = action.payload.recentsWeather;
    },
    setHomeWeather: (state, action: PayloadAction<Weather>) => {
      state.homeWeather = action.payload;
    },
    addToFavourites: (
      state,
      action: PayloadAction<{ weatherData: Weather; isHome: boolean }>
    ) => {
      if (action.payload.isHome) {
        state.homeWeather = action.payload.weatherData;
      }

      state.favourites.push(action.payload.weatherData.locationName);
      state.favouritesWeather.push(action.payload.weatherData);

      const index = state.recents.indexOf(
        action.payload.weatherData.locationName
      );
      if (index !== -1) {
        state.recentsWeather[index] = action.payload.weatherData;
      }

      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    removeFromFavourites: (
      state,
      action: PayloadAction<{ locationName: string; isHome: boolean }>
    ) => {
      if (action.payload.isHome) {
        state.homeWeather!.isFavourite = false;
      }

      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload.locationName
      );
      state.favouritesWeather = state.favouritesWeather.filter(
        (favouriteWeather) =>
          favouriteWeather.locationName !== action.payload.locationName
      );

      const index = state.recents.indexOf(action.payload.locationName);
      if (index !== -1) {
        state.recentsWeather[index].isFavourite = false;
      }

      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    addToRecent: (state, action: PayloadAction<Weather>) => {
      const weatherData = action.payload;
      if (state.recents.includes(weatherData.locationName)) {
        state.recents = state.recents.filter(
          (recent) => recent !== weatherData.locationName
        );
        state.recentsWeather = state.recentsWeather.filter(
          (recentWeather) =>
            recentWeather.locationName !== weatherData.locationName
        );
      }
      state.recents.unshift(weatherData.locationName);
      state.recentsWeather.unshift(weatherData);
      state.homeWeather = weatherData;

      localStorage.setItem("recents", JSON.stringify(state.recents));
    },
    clearFavourites: (state) => {
      if (state.homeWeather?.isFavourite) {
        state.homeWeather.isFavourite = false;
      }

      state.favourites = [];
      state.favouritesWeather = [];
      localStorage.setItem("favourites", JSON.stringify(state.favourites));

      for (let i = 0; i < state.recents.length; i++) {
        if (state.recentsWeather[i].isFavourite) {
          state.recentsWeather[i].isFavourite = false;
        }
      }
    },
    clearRecents: (state) => {
      state.recents = [];
      state.recentsWeather = [];
      localStorage.setItem("recents", JSON.stringify(state.recentsWeather));
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
