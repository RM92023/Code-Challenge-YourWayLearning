import "./TextDisplay.css";

interface Props {
  targetText?: string;
  userInput: string;
}
// Muestra el texto objetivo letra por letra, con estilos según lo que ha escrito el usuario
const TextDisplay = ({ targetText = "", userInput }: Props) => {
  return (
    <p className="text-display">
      {targetText.split("").map((char, index) => {
        let className = "";

        // Si el usuario ya escribió este carácter, marcamos correcto o incorrecto
        if (index < userInput.length) {
          className = userInput[index] === char ? "correct" : "incorrect";
          // Si es el próximo carácter a escribir, lo subrayamos
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
