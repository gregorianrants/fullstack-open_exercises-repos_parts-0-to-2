import React from "react";

import Statistics from "./Statistics";



const App = () => {
    const [good, setGood] = React.useState(0)
    const [neutral, setNeutral] = React.useState(0)
    const [bad, setBad] = React.useState(0)

    const handleClickGood = () => setGood(good => good + 1)
    const handleClickNeutral = () => setNeutral(neutral => neutral + 1)
    const handleClickBad = () => setBad(bad => bad + 1)


    return (
        <div className="App">
            <h1>Give Feedback</h1>
            <button onClick={handleClickGood}>
                good
            </button>
            <button onClick={handleClickNeutral}>
                neutral
            </button>
            <button onClick={handleClickBad}>
                Bad
            </button>
            <h1>statistics</h1>
            <Statistics {...{good,neutral,bad}} />
        </div>
    );
}

export default App;
