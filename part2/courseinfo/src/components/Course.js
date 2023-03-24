const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <b>total of exercises {sum}</b>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

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

export default Course;
