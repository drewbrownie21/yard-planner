interface ButtonProps {
  buttonDisplayText: string;
  onClick?: () => void;
}

export function Button({ buttonDisplayText, onClick }: ButtonProps) {
  return <button className="button" onClick={onClick}>{buttonDisplayText}</button>;
}
