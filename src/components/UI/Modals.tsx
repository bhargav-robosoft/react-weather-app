import { ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./Modals.module.css";

type BackdropPropType = {
  onConfirm: () => void;
  children?: ReactNode;
};

const Backdrop = ({ onConfirm }: BackdropPropType) => {
  return <div className={classes.backdrop} onClick={onConfirm} />;
};

type ModalOverlayPropType = {
  title: string;
  onConfirm: (confirm: boolean) => void;
  children?: ReactNode;
};

export const ModalOverlay = ({ title, onConfirm }: ModalOverlayPropType) => {
  return (
    <div className={classes.parent}>
      <div className={classes.modal}>
        <header className={classes.header}>
          <div>{title}</div>
        </header>
        <footer className={classes.footer}>
          <button onClick={() => onConfirm(true)}>Yes</button>
          <button onClick={() => onConfirm(false)}>No</button>
        </footer>
      </div>
    </div>
  );
};

type ConfirmModalPropType = {
  title: string;
  confirmHandler: (confirm: boolean) => void;
  children?: ReactNode;
};

export const ConfirmModal = ({
  title,
  confirmHandler,
}: ConfirmModalPropType) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={() => confirmHandler(false)} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} onConfirm={confirmHandler} />,
        document.getElementById("overlay-root")!
      )}
    </>
  );
};

type ErrorModalPropType = {
  title: string;
  confirmHandler: () => void;
  children?: ReactNode;
};

export const ErrorModal = ({ title, confirmHandler }: ErrorModalPropType) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={confirmHandler} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <div className={classes.parent}>
          <div className={`${classes.modal} ${classes["modal-error"]}`}>
            <header className={classes.header}>
              <div>{title}</div>
            </header>
            <footer className={classes.footer}>
              <button onClick={confirmHandler}>Okay</button>
            </footer>
          </div>
        </div>,
        document.getElementById("overlay-root")!
      )}
    </>
  );
};
