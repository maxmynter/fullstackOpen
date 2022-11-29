import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatsDisplay = (props) => {
  return (
    <>
      {props.stats.map((stat) => (
        <p>
          {stat.text}: {stat.stat}
        </p>
      ))}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let stats = [
    { text: "Good", stat: good },
    { text: "Neutral", stat: neutral },
    { text: "Bad", stat: bad },
  ];

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />
      <Header text="Statistics" />
      <StatsDisplay stats={stats} />
    </div>
  );
};

export default App;
