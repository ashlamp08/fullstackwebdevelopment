import { useState } from "react";

const Feedback = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ statistics }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {statistics.good}</p>
      <p>netural {statistics.neutral}</p>
      <p>bad {statistics.bad}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const statistics = { good: good, neutral: neutral, bad: bad };

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <Feedback />
      <div>
        <Button handleClick={handleGoodClick} text={"good"} />
        <Button handleClick={handleNeutralClick} text={"neutral"} />
        <Button handleClick={handleBadClick} text={"bad"} />
      </div>
      <Statistics statistics={statistics} />
    </>
  );
};

export default App;
