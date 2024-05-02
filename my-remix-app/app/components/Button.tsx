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
    <button onClick={onClick} className="rounded-full bg-red-400 p-2 w-12 h-12">
      {props.children}
    </button>
  );
};

export default Button;
