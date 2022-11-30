const Header = ({ heading }) => <h1>{heading}</h1>;

const Total = ({ sum }) => (
  <p>
    <b>Total number of exercises: {sum}</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name}: {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <>
      <Header heading={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)}
      />
    </>
  );
};

export default Course;
