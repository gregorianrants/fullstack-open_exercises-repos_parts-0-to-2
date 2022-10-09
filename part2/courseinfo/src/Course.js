const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        <Part
            part={parts[0]}
        />
        <Part
            part={parts[1]}
        />

    </>

const Sum =({parts}) =>{
    const sum = parts
        .map(({exercises})=>exercises)
        .reduce((a,b)=>a+b)

    return (
        <p>total of {sum} exercises</p>
    )
}

const Course = ({course})=>{
    const {name, parts} = course

    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Sum parts={parts}/>
        </div>
    )
}

export default Course

