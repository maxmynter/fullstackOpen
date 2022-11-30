const Input = ({ prefix, value, onChange }) => (
  <div>
    {prefix} <input value={value} onChange={onChange} />
  </div>
);
export default Input;
