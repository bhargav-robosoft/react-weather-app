import { ReactNode } from "react";

import classes from "./EmptySearch.module.css";

import emptyIcon from "../../assets/icon_nothing.png";

type PropType = {
  message: string;
  children?: ReactNode;
};

const EmptySearch = ({ message }: PropType) => {
  return (
    <div className={classes["center-container"]}>
      <img src={emptyIcon} alt="empty result" />
      <div className={classes.message}>{message}</div>
    </div>
  );
};

export default EmptySearch;
