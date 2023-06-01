import Weather from "../models/Weather";

import { fetchData } from "./api";
import { AppDispatch, RootState } from "./index";
import { uiActions } from "./ui";
import { weatherActions } from "./weather";

export const setData = () => {
  return async (dispatch: AppDispatch) => {
    const favouritesStorage = localStorage.getItem("favourites");
    const favourites: string[] =
      favouritesStorage === null ? [] : JSON.parse(favouritesStorage);

    const favouritesWeather: Weather[] = [];

    for (const favourite of favourites) {
      const weatherData = await fetchData(favourite);
      weatherData.isFavourite = true;
      favouritesWeather.push(weatherData);
    }

    const recentsStorage = localStorage.getItem("recents");
    const recents: string[] =
      recentsStorage === null ? [] : JSON.parse(recentsStorage);

    const recentsWeather: Weather[] = [];

    for (const recent of recents) {
      if (favourites.includes(recent)) {
        const weatherData = favouritesWeather.find(
          (favourite) => favourite.locationName === recent
        );
        recentsWeather.push(weatherData!);
      } else {
        const weatherData = await fetchData(recent);
        recentsWeather.push(weatherData);
      }
    }

    let homeWeatherData: Weather;

    if (favourites.length === 0) {
      homeWeatherData = await fetchData("Udupi");
    } else {
      homeWeatherData = favouritesWeather[0];
    }

    dispatch(
      weatherActions.setData({
        homeWeatherData,
        favourites,
        favouritesWeather,
        recents,
        recentsWeather,
      })
    );
  };
};

export const handleFavourites = (locationName: string, isHome: boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const favourites = getState().weather.favourites;

    if (favourites.includes(locationName)) {
      const homeWeather = getState().weather.homeWeather;
      if (homeWeather?.locationName === locationName) {
        dispatch(
          weatherActions.removeFromFavourites({ locationName, isHome: true })
        );
      } else {
        dispatch(weatherActions.removeFromFavourites({ locationName, isHome }));
      }
    } else {
      const weatherData = await fetchData(locationName);
      weatherData.isFavourite = true;

      const homeWeather = getState().weather.homeWeather;
      if (homeWeather?.locationName === locationName) {
        dispatch(weatherActions.addToFavourites({ weatherData, isHome: true }));
      } else {
        dispatch(weatherActions.addToFavourites({ weatherData, isHome }));
      }
    }
  };
};

export const searchWeatherForLocation = (locationName: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const weatherData = await fetchData(locationName);

      const favourites = getState().weather.favourites;

      if (favourites.includes(locationName)) {
        weatherData.isFavourite = true;
      }

      dispatch(weatherActions.addToRecent(weatherData));
    } catch (error) {
      dispatch(uiActions.setErrorMessage("Something went wrong"));
    }
  };
};
