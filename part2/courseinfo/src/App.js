const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <b>total of exercises {sum}</b>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Course = ({ course }) => {
  const parts = course.parts;
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
