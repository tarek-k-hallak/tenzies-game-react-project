import React from 'react'

export default function Dice(props) {
    var style = props.dice.isHeld ? "dice dice-held" : "dice"

    const dotsElements = []
    for (let i = 0; i < props.dice.value; i++) {
        dotsElements.push(
            <span
                key={i}
                className="dot">
            </span>
        )
    }

    console.log("Dice renderd")
    return (
        <div
            onClick={() => props.hold(props.dice.id)}
            className={style + " face-" + props.dice.value}>
            {dotsElements}
        </div>
    )
}