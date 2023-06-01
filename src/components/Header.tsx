import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../store/index";
import { weatherActions } from "../store/weather";
import { searchWeatherForLocation } from "../store/weather-actions";

import NavBar from "./NavBar";

import classes from "./Header.module.css";

import logo from "../assets/logo_web.png";
import search from "../assets/icon_search_white.png";

const Header = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const error = useSelector((state: RootState) => state.ui.errorMessage);

  useEffect(() => {
    dispatch(weatherActions.applySearchFilter(""));
    setSearchText("");
    setSuggestions([]);
  }, [location, error, dispatch]);

  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("change", event.target.value);

    setSearchText(event.target.value);

    if (location.pathname !== "/") {
      applySearchFilter(event.target.value);
    } else {
      const suggestions = await autocomplete(event.target.value);

      setSuggestions(suggestions);

      if (suggestions.length === 0) {
        setShowSuggestions(false);
      } else {
        setShowSuggestions(true);
      }
    }
  };

  const selectSuggestionHandler = (suggestion: string) => {
    setShowSuggestions(false);
    setSearchText(suggestion);
    dispatch(searchWeatherForLocation(suggestion));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      applySearchFilter(searchText);
    } else {
      searchHandler();
    }
  };

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (location.pathname !== "/") {
      applySearchFilter(searchText);
    } else {
      searchHandler();
    }
  };

  const searchHandler = () => {
    dispatch(searchWeatherForLocation(searchText));
  };

  const applySearchFilter = (text: string) => {
    // console.log("applySearchFilter", text);
    // console.log("applySearchFilter", searchText);

    dispatch(weatherActions.applySearchFilter(text));
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-bar"]}>
        <img src={logo} alt="logo" />
        <div className={classes["search-box"]}>
          <form onSubmit={submitHandler} className={classes["input-box"]}>
            <input
              type="text"
              placeholder="Search City"
              onChange={changeHandler}
              value={searchText}
            />
            <input type="submit" style={{ display: "none" }} />
          </form>

          <img
            className={classes["search-icon"]}
            src={search}
            alt="search"
            onClick={clickHandler}
          />
        </div>
      </div>
      {showSuggestions && (
        <div className={classes["suggestion-box"]}>
          {suggestions.map((suggestion) => (
            <div
              className={classes.suggestion}
              key={suggestion}
              onClick={() => selectSuggestionHandler(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <NavBar />
    </header>
  );
};

export default Header;

const autocomplete = async (query: string) => {
  "https://api.foursquare.com/v3/autocomplete?query=$query&types=geo";
  const response = await fetch(
    `https://api.foursquare.com/v3/autocomplete?query=${query}&types=geo`,
    {
      headers: {
        Authorization: "fsq3/Vr+Nmzkyj7t+yDgqpCXAcL8FRRi/7SPQNG5YsEHmPE=",
        accept: "application/json",
      },
    }
  );
  const responseBody = await response.json();

  const results = new Set();
  for (var res of responseBody["results"]) {
    const name = res["geo"]["name"] as String;
    const pos = name.indexOf(",");
    if (pos === -1) {
      results.add(name);
    } else {
      results.add(name.substring(0, pos));
    }
  }
  // const returnValue: string[] = [];
  // results.forEach((res) => returnValue.push(res as string));
  const returnValue: string[] = Array.from(results) as string[];
  return returnValue;
};
