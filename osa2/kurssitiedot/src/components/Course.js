const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
        <>
            <Part part={part} />
        </>       
    )}
  </>

const Total = ({course}) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <>Total of {total} exercises</>  
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      <ul>
        {courses.map(course =>
          <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total course={course}/> 
          </>
        )}
      </ul>
    </div>
  )
}

export default Course