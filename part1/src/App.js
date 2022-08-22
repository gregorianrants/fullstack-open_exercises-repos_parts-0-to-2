import Header from "./Header";
import Content from "./Content";
import Total from "./Total"

const App = () => {
  const course = 'Half Stack application development'
    const parts = [
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

    const total = parts
        .map(({exercises})=>exercises)
        .reduce((a,b)=>a+b,0)

  return (
      <div>
          <Header course={course}/>
          <Content parts={parts}/>
          <Total parts={parts}/>
      </div>
  )
}

export default App
