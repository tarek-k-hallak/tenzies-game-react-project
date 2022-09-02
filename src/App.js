import React, { useEffect } from 'react'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'

export default function App() {
    const [dices, setDices] = React.useState(getNewDices())
    const [counter, setCounter] = React.useState(0)
    const [win, SetWin] = React.useState(false)
    const dicesElements = dices.map(dice =>
        <Dice
            key={dice.id}
            dice={dice}
            hold={hold} />
    )

    //Win in C++ way B)
    React.useEffect(() => {
        let flag
        for (let i = 0; i < dices.length; i++) {
            let curr = dices[i]
            flag = true
            if (dices[0].value != curr.value) {
                flag = false
                break
            }
            if (!curr.isHeld) {
                flag = false
                break
            }
        }
        if (flag) {
            SetWin(true)
        }
    }, [dices])

    //Win in JavaScript way 
    React.useEffect(() => {
        // * 1. All dice are held, and
        // * 2. all dice have the same value

        // this every well return a boolean value
        const allHeld = dices.every(dice => dice.isHeld)

        //loop on all value and check if they equall the first one
        const allSameValue = dices.every(dice => dice.value === dices[0].value)

        if (allSameValue && allHeld) {
            SetWin(true)
        }
    }, [dices])

    function getNewDices() {
        let newDices = [];
        for (let i = 0; i < 10; i++) {
            newDices.push({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return newDices
    }

    function roll() {
        setCounter(prevCounter => prevCounter + 1)
        setDices(prevDices => {
            let newDices = []
            for (let i = 0; i < prevDices.length; i++) {
                let curr = prevDices[i]
                if (curr.isHeld) {
                    newDices.push(curr)
                } else {
                    newDices.push({
                        ...curr,
                        value: Math.ceil(Math.random() * 6)
                    })
                }
            }
            return newDices
        })
    }

    function reset() {
        setCounter(0)
        setDices(getNewDices)
        SetWin(false)
    }

    function hold(diceID) {
        setDices(prevDices => {
            let newDices = []
            for (let i = 0; i < prevDices.length; i++) {
                let curr = prevDices[i]
                if (curr.id == diceID) {
                    newDices.push({
                        ...curr,
                        isHeld: !curr.isHeld
                    })
                } else {
                    newDices.push(curr)
                }
            }
            return newDices
        })
    }
    console.log(useWindowSize)

    const { width, height } = useWindowSize()
    return (
        <main>
            {win && <Confetti
                width={width}
                height={height} />
            }
            <h1 className="title">Tenzies
            </h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dices-container">
                {dicesElements}
            </div>
            <label className="counter">
                {counter}
            </label>
            <div className='btns'>
                {!win &&
                    <button
                        className="btn"
                        onClick={roll}>
                        Roll
                    </button>
                }
                <button
                    className="btn"
                    onClick={reset}>
                    {win ? "New Game" : "Reset"}
                </button>
            </div>
        </main>
    )
}