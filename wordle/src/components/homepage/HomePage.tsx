import React, { useEffect, useState } from 'react'
import classes from './HomePage.module.css'
import words from "../../filtered.json"


interface Game {
    word: string
    attempts: string[]
    activeLine: number
    generated: number
}
export default function HomePage() {
    let interval: any = null
    const [game, setGame] = useState<Game>({
        word: "",
        attempts: ["", "", "", "", "", ""],
        activeLine: 0,
        generated: 0
    })

    // a and b are javascript Date objects
    function sameDay(d1: Date, d2: Date) {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();;
    }
/*
    useEffect(() => {

        const local = localStorage.getItem("wordle")
        if (local)
            setGame(JSON.parse(local))
        else
            setGame({ ...game, word: words[Math.round(Math.random() * (words.length))], generated: new Date().getMilliseconds() })

        document.addEventListener("keydown", keydownHandler)
        interval = setInterval(() => {
            if (!sameDay(new Date(game.generated), new Date()))
                setGame({ ...game, word: words[Math.round(Math.random() * (words.length))] })
        }, 60000)
        return () => {
            clearInterval(interval)
            document.removeEventListener("keydown", keydownHandler)
        }
    }, [])
*/
    useEffect(() => {
        setGame({ ...game, word: words[Math.round(Math.random() * (words.length))]})
        document.addEventListener("keydown", keydownHandler)
    }, [])

    /*useEffect(() => {
        localStorage.setItem("wordle", JSON.stringify(game))
    }, [game])
    */


    function keydownHandler(e: KeyboardEvent) {
        setGame(prev => {
            const key = e.key
            let clone = { ...prev }
            if (key === "Enter" && clone.attempts[clone.activeLine].length === 5)
                if (words.includes(clone.attempts[clone.activeLine]))
                    if( clone.word === clone.attempts[clone.activeLine]){
                        alert("Parabéns, você acertou!")
                        clone.activeLine++
                        clone.attempts = ["", "", "", "", "", ""]
                        clone.activeLine = 0
                        clone.word = words[Math.round(Math.random() * (words.length))]
                    }
                    else
                        clone.activeLine++
                else{
                    alert(clone.word)
                    alert("Palavra não existe no dicionário")
                }
            else if (key === "Backspace")
                clone.attempts[clone.activeLine] = clone.attempts[clone.activeLine].slice(0, -1)
            else if (key.length === 1 && key.match(/[a-z]/i) && clone.attempts[clone.activeLine].length < 5)
                clone.attempts[clone.activeLine] += key
            return clone
        })
    }

    function split(word: string): string[] {
        let value = word.split("")
        for (let index = value.length; index < 5; index++) {
            value.push("")
        }
        return value
    }

    function checkClass(letter: string, index: number, line: number): string {
        if (line === game.activeLine && letter !== "")
            return classes.active
        else if (letter === "")
            return classes.blank
        else if (letter === game.word[index])
            return classes.right
        else if (game.word.includes(letter))
            return classes.includes
        else return classes.wrong
    }

    return (
        <div className={classes.container}>
            {game.attempts.map((value, line) => (
                <div className={classes.grid}>
                    {split(value).map((letter, index) => (
                        <div className={checkClass(letter, index, line)}>{letter}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}