const Header = (props) =>{

  return(
    <>
      <h1>{props.course}</h1> 
    </>
  )

}

const Part = (props) =>  (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.name} part={part}/>
      ))}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts.map(part=>part.exercises).reduce((acc, val)=> acc+val, 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App