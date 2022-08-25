import {useState} from "react";
import {random, zeros} from "./utilities.mjs";
import {indexOfMax} from "./utilities.mjs";


function MostVotes({anecdotes, points}) {
    const highestScoringAnecdote = anecdotes[indexOfMax(points)]
    const highestScore = points[indexOfMax(points)]


    return (
        <p>{highestScoringAnecdote} has {highestScore}</p>
    )

}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(zeros(anecdotes.length))


    const handleClickNextAnecdote = () => {
        const maxIndex = anecdotes.length - 1
        const index = random(maxIndex)
        setSelected(index)
    }

    const handleClickVote = () => {
        setPoints(points => {
            const pointsNew = [...points]
            pointsNew[selected] += 1
            return pointsNew
        })
    }

    const selectedItemPoints = () => points[selected]

    return (
        <div>
            <p>{anecdotes[selected]}</p>
            <p>has {selectedItemPoints()}</p>
            <button onClick={handleClickNextAnecdote}>next anecdote</button>
            <button onClick={handleClickVote}>vote</button>
            <MostVotes points={points} anecdotes={anecdotes}/>
        </div>
    )
}

export default App