import React from "react";
import {useEffect, useState } from 'react';

const Summary = ({items}) => {

    const [score, setScore] = useState(0);
    const [min, setMin] = useState(0);
    const [minIdx, setMinIdx] = useState(0);
    const [mes, setMes] = useState("");


    useEffect(() => {
        var score = 0
        var min = 101
        var minIdx = 0


        for(let i = 0 ; i < items.length; i++){
            score = score + items[i].popularity
            if (items[i].popularity < min){
                min = items[i].popularity
                minIdx = i
            }
        }
        score = score / items.length
        score = Math.trunc(score)
        setScore(score)
        setMin(min)
        setMinIdx(minIdx)
        setMessage(score)
    }, [])    

    const setMessage = (score) => {
        console.log(score)
        if(score <= 25){
            setMes("You're Super Rare!");
        }
        else if(score <= 50){
            setMes("You're Rare!");
        }
        else if(score <= 75) {
            setMes("You're Kinda Basic...");
        }
        else{
            setMes("You're Super Basic...")
        }
    }

    return (

        <div className="summary-container">
            <h1> {mes}</h1>
            <h2> Popularity Rating - {score} </h2>
            <h2> Rarest Item - {items[minIdx].name} - {min}</h2>
        </div>
    );

}

export default Summary; 