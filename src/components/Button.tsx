interface ButtonProps {
  buttonDisplayText: string;
}

export function Button({ buttonDisplayText }: ButtonProps) {
  return <button className="button">{buttonDisplayText}</button>;
}
