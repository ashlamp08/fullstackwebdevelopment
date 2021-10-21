import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onclick}>{props.text}</button>;
};

const Feedback = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button onclick={props.handleGoodOnClick} text={"Good"}></Button>
      <Button onclick={props.handleNeutralOnClick} text={"Neutral"}></Button>
      <Button onclick={props.handleBadOnClick} text={"Bad"}></Button>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = (total === 0 ? 0 : (good / total) * 100) + " %";

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good}></StatisticLine>
            <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
            <StatisticLine text={"bad"} value={bad}></StatisticLine>
            <StatisticLine text={"all"} value={total}></StatisticLine>
            <StatisticLine text={"average"} value={average}></StatisticLine>
            <StatisticLine text={"positive"} value={positive}></StatisticLine>
          </tbody>
        </table>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToValue = (setter, value) => {
    setter(value);
  };

  return (
    <div>
      <Feedback
        handleGoodOnClick={() => setToValue(setGood, good + 1)}
        handleNeutralOnClick={() => setToValue(setNeutral, neutral + 1)}
        handleBadOnClick={() => setToValue(setBad, bad + 1)}
      ></Feedback>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
