import { Plus } from "@phosphor-icons/react/dist/ssr";
import React, { ButtonHTMLAttributes } from "react";
import { ClipLoader } from "react-spinners";
import "./Button.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  plusIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  plusIcon,
  className: cls,
  ...rest
}) => {
  return (
    <button className="btn" {...rest}>
      {plusIcon ? <Plus size={20} /> : ""}
      {isLoading ? <ClipLoader size={20} color="#FF8C4B" /> : children}
    </button>
  );
};

export default Button;
