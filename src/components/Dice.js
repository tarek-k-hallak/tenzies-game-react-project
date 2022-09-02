import React from 'react'

export default function Dice(props) {
    var style = props.dice.isHeld ? "dice dice-held" : "dice"
    return (
        <div
            className={style}
            onClick={() => props.hold(props.dice.id)}>
            <h2>{props.dice.value}</h2 >
        </div>
    )
}