import React from "react";
import { buttonStyle } from "./button.css";
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disabled?: boolean;
  text?: string;
}

const Button = ({ onClick, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} className={buttonStyle}>
      {props.children}
    </button>
  );
};

export default Button;
