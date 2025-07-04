import button from "./Button.module.css";

interface ButtonProps {
  buttonDisplayText: string;
  // Drew's notes -> while e is not passed in here, it is internally inferred by react when we click the button
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cssClassName?: string;
  disabled?: boolean;
}

export function Button({
  buttonDisplayText,
  onClick,
  cssClassName,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={cssClassName ? cssClassName : button.button}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonDisplayText}
    </button>
  );
}
