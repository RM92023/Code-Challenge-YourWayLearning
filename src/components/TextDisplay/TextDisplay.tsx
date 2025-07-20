import "./TextDisplay.css";

interface Props {
  targetText?: string;
  userInput: string;
}

const TextDisplay = ({ targetText = "", userInput }: Props) => {
  return (
    <p className="text-display">
      {targetText.split("").map((char, index) => {
        let className = "";

        if (index < userInput.length) {
          className = userInput[index] === char ? "correct" : "incorrect";
        } else if (index === userInput.length) {
          className = "next-char";
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </p>
  );
};

export default TextDisplay;
