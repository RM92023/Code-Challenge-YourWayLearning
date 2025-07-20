import "./ControlButtons.css";

interface Props {
  isFinished: boolean;
  isStarted: boolean;
  onReset: () => void;
}

const ControlButtons = ({ isFinished, isStarted, onReset }: Props) => {
  return (
    <div className="control-buttons">
      {isFinished && (
        <button onClick={onReset} className="control-button primary">
          Reiniciar test
        </button>
      )}

      {isStarted && !isFinished && (
        <button onClick={onReset} className="control-button cancel">
          Cancelar test
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
