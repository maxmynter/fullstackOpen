import Button from "./button";

const PersonForm = ({ inputs, onSubmit }) => {
  return (
    <form>
      {inputs.map((input, idx) => (
        <div key={idx}>{input}</div>
      ))}
      <Button
        key="PersonFormButton"
        text="add"
        onClick={onSubmit}
        type="submit"
      />
    </form>
  );
};

export default PersonForm;
