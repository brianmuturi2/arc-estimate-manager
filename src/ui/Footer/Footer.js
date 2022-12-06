import React from "react";
import classes from './Footer.module.css';

export default function Footer(props) {

  return (
    <footer className={classes.footer}>

      <img
        alt="black decorative slash"
        src="/assets/footerAdornment.svg"
        className={classes.adornment}
      />

    </footer>
  );
}
