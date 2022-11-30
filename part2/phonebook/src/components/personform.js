const SubmitButton = ({ text, onSubmit }) => (
  <div>
    <button onClick={onSubmit} type="submit">
      {text}
    </button>
  </div>
);

const PersonForm = ({ inputs, onSubmit }) => {
  return (
    <form>
      {inputs.map((input, idx) => (
        <div key={idx}>{input}</div>
      ))}
      <SubmitButton text="add" onSubmit={onSubmit} />
    </form>
  );
};

export default PersonForm;
