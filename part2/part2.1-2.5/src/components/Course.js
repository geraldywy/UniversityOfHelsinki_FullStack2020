import React from 'react'

const Course = ({course}) => {

    const total = course.parts.map((part)=>part.exercises).reduce((acc, curr)=> acc+curr)

    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map((part, i) => <li  key={i}>{part.name} {part.exercises}</li>)}
                <p><strong>total of {total} exercises</strong></p>
            </ul>
        </div>
    )
}




export default Course