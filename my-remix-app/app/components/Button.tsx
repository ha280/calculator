import React from "react";
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
    <button
      onClick={onClick}
      // className={buttonStyle}
      style={{
        borderRadius: "50%",
        backgroundColor: "red",
        padding: "0.5rem",
        width: "3rem",
        height: "3rem",
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
