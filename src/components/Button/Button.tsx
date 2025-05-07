import button from "./Button.module.css";

interface ButtonProps {
  buttonDisplayText: string;
  // Drew's notes -> while e is not passed in here, it is internally inferred by react when we click the button
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ buttonDisplayText, onClick }: ButtonProps) {
  return (
    <button className={button.button} onClick={onClick}>
      {buttonDisplayText}
    </button>
  );
}
