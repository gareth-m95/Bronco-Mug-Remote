import React from "react";
import cn from "classnames";
import styles from "./Button.module.css";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  children,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button className={cn(styles.button, className)} {...buttonProps}>
      {children}
    </button>
  );
};
