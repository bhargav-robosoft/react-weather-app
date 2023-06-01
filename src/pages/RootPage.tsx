import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../store/index";
import { uiActions } from "../store/ui";
import { weatherActions } from "../store/weather";
import { setData } from "../store/weather-actions";

import Header from "../components/Header";
import { ErrorModal } from "../components/UI/Modals";

const RootPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const homeWeather = useSelector(
    (state: RootState) => state.weather.homeWeather
  );

  const errorMessage = useSelector((state: RootState) => state.ui.errorMessage);

  const errorMessageHandler = () => {
    dispatch(weatherActions.applySearchFilter(""));
    dispatch(uiActions.setErrorMessage(""));
  };

  useEffect(() => {
    if (homeWeather === null) {
      dispatch(setData());
    }
  }, [dispatch, homeWeather]);

  useEffect(() => {
    dispatch(weatherActions.applySearchFilter(""));
  }, [location, dispatch]);

  return (
    <>
      {errorMessage !== "" && (
        <ErrorModal title={errorMessage} confirmHandler={errorMessageHandler} />
      )}
      <Header />
      <Outlet />
    </>
  );
};

export default RootPage;
