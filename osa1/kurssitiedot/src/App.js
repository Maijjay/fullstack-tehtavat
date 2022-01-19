
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React ',
      exercises: 10
      },
      {
      name: 'Using props to pass data ',
      exercises: 7
      },
      {
      name: 'State of a component ',
      exercises: 14
      }
    ]
  } 

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>
        {course.name}
      </h1>
    </>
  )
}

const Part = (props) =>{
  console.log(props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>  
  )
}
  
const Content = (props) => {
  console.log(props)
  return (
    <>
       <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
       <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
       <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  console.log(props)
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises 
  return (
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}
  return (
    <>
      <Header coursename={course}/>
      <Content />
      <Total />
    </>
  )
}

export default App