import React from "react";
// styles
import classes from "./Button.module.scss";

const Button = (props: React.ComponentProps<"button">) => {
  return (
    <button className={classes.Button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
