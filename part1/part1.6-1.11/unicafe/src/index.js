import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={()=>setGood(good+1)}/>
      <Button text="neutral" handleClick={()=>setNeutral(neutral+1)}/>
      <Button text="bad" handleClick={()=>setBad(bad+1)}/>
      <table>
        <th colspan="2"><h1>statistics</h1></th>
        <tbody>
        <tr><p>good {good}</p> </tr>
        <tr><p>neutral {neutral} </p> </tr>
        <tr><p>bad {bad} </p> </tr>
        <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad===0){
    return null
  }
  return(
      <>
        <Statistic text="all" value ={good+neutral+bad} />
        <Statistic text="average" value ={(good-bad)*100/(good+neutral+bad)} />
        <Statistic text="positive" value ={good*100/(good+neutral+bad)} />
      </>
  )
}

const Statistic = ({text, value}) => {
  return(
    <tr>
      <p>{text} {value} %</p>
    </tr>
  )
}

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)