interface Props {
  isFinished: boolean;
  onReset: () => void;
}

const ControlButtons =({ isFinished, onReset }: Props) => {
  return (
    <>
      {isFinished && (
        <button onClick={onReset} className="btn btn-primary">
          Reiniciar test
        </button>
      )}
    </>
  );
};

export default ControlButtons;
