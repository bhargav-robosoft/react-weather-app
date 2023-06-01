interface Weather {
  locationName: string;
  locationCountryName: string;
  temperature: number;
  description: string;
  weatherIconLink: string;
  minTemperature: number;
  maxTemperature: number;
  clouds: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  isFavourite: boolean;
}

export default Weather;
