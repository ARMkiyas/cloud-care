import React from "react";
import classes from "./AnimetedCheckStyle.module.css";

export default function AnimatedCheck() {
  return (
    <div className={classes.wrapper}>
      <svg
        className={classes.checkmark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className={classes.checkmark__circle}
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />{" "}
        <path
          className={classes.checkmark__check}
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
}
