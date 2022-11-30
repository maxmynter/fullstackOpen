import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Header = ({ text }) => <h1>{text}</h1>;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  const [points, setPoints] = useState(anecdotes.map(() => 0));

  const updateRandomNumber = () => {
    const randomNumber = getRandomInt(anecdotes.length);
    setSelected(randomNumber);
    return randomNumber;
  };

  const vote = () => {
    let newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <>
      <Header text="Anecdote of the Day" />
      <div>{anecdotes[selected]}</div>
      <table>
        <tbody>
          <tr>
            <td>Votes:</td>
            <td>{points[selected]}</td>
          </tr>
          <tr>
            <td>
              <Button text="Vote" onClick={vote} />
            </td>
            <td>
              <Button text="Next Anecdote" onClick={updateRandomNumber} />
            </td>
          </tr>
        </tbody>
      </table>
      <Header text="Anecdote with most Votes" />
      <div>{anecdotes[points.indexOf(Math.max(...points))]}</div>
    </>
  );
};

export default App;
