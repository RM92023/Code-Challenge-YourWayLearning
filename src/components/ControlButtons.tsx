interface Props {
  isFinished: boolean;
  isStarted: boolean;
  onReset: () => void;
}

const ControlButtons =({ isFinished, isStarted, onReset }: Props) => {
  return (
    <>
      {isFinished && (
        <button onClick={onReset} className="btn btn-primary">
          Reiniciar test
        </button>
      )}

      {isStarted && !isFinished && (
        <button onClick={onReset} className="btn btn-cancel">
          Cancelar test
        </button>
      )}
    </>
  );
};

export default ControlButtons;
