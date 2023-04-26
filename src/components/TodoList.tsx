import React, {useEffect, useState} from 'react';


export const TodoList: React.FC = () => {

    const listOfTodos = [
        "allow step to be skipped",
        "fix bug where steps slow down over time",
        "add ability to change step length",
    ]

    return (
        <div className={`bg-pink-500 w-1/2 rounded text-white`}>
            <ol className={`text-justify p-3 absolute`}>
                {listOfTodos.map(todo=> <li className={`font-extrabold`}>{todo}</li>)}
            </ol>
        </div>
    )
}