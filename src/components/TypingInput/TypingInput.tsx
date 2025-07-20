import "./TypingInput.css";

interface Props {
  input: string;
  onChange: (value: string) => void;
  isFinished: boolean;
}

const TypingInput = ({ input, onChange, isFinished }: Props) => {
  if (isFinished) return null;

  return (
    <input
      name="text"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing..."
      autoFocus
      className="typing-input"
    />
  );
};

export default TypingInput;
