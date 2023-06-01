import React, { ReactNode } from "react";

import classes from "./WeatherParameter.module.css";

type PropType = {
  title: string;
  value: string;
  imagePath: string;
  children?: ReactNode;
};

const WeatherParameter = ({ title, value, imagePath }: PropType) => {
  return (
    <div className={classes.parameter}>
      <img
        className={classes.icon}
        src={imagePath}
        alt="weather parameter icon"
      />
      <div>
        <div className={classes.title}>{title}</div>
        <div className={classes.value}>{value}</div>
      </div>
    </div>
  );
};

export default WeatherParameter;
