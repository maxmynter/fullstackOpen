import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = ({ stat }) => (
  <>
    <td key={`${stat.text}_td`}>{stat.text}</td>
    <td key={`${stat.stat}_td`}>{stat.stat}</td>
  </>
);

const Statistics = (props) => {
  if (props.stats.find((obj) => obj.text == "All").stat == 0) {
    return <p key="NoFeedback">No Feedback given!</p>;
  } else {
    return (
      <table>
        <tbody>
          {props.stats.map((stat) => {
            return (
              <tr key={`${stat.text}_tr`}>
                <StatisticLine stat={stat} />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
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
    { text: "Average", stat: (good - bad) / 2 },
    {
      text: "Positive Rate",
      stat: `${
        good + bad + neutral > 0 ? (100 * good) / (good + neutral + bad) : 0
      } %`,
    },
    { text: "All", stat: good + bad + neutral },
  ];

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />
      <Header text="Statistics" />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
