import Weather from "../models/Weather";

export const fetchData = async (location: string) => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?&appid=e07a248e19b7bc76072304519cc9e7ff&units=metric&q=" +
      location
  );

  const responseData = await response.json();

  const weatherData: Weather = {
    locationName: responseData["name"],
    locationCountryName: responseData["sys"]["country"],
    temperature: responseData["main"]["temp"],
    description: responseData["weather"][0]["description"],
    weatherIconLink:
      "https://openweathermap.org/img/wn/" +
      responseData["weather"][0]["icon"] +
      "@2x.png",
    minTemperature: responseData["main"]["temp_min"],
    maxTemperature: responseData["main"]["temp_max"],
    clouds: responseData["clouds"]["all"],
    humidity: responseData["main"]["humidity"],
    windSpeed: responseData["wind"]["speed"],
    visibility: responseData["visibility"],
    isFavourite: false,
  };

  return weatherData;
};
