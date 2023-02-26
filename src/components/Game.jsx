import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ColorSliders from './ColorSliders';
import Timer from './Timer';

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30em;
  max-width: 50%;
  flex-wrap: wrap;
`

const Menu = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
`

const ColorBoxes = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 50%;
  padding-top: 1em;
  padding-bottom: 1em;
`

const ColorBox = styled(Box)`
  background-color: rgb(${(props) => `${props.r},${props.g},${props.b}`});
  width: 100%;
  height: 50%;
`

const DifficultyMenu = styled(Select)`
  height: 2.5em;
  width: 9em;
`

const StartButton = styled(Button)`
  height: 3em;
  width: 9em;
`

const SliderBox = styled(Box)`
  width: 90%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`

const Instructions = styled(Box)`
  text-align: center;
  width: 100%;
`

const Game = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [color, setColor] = useState(null);
  const [guess, setGuess] = useState({ r: 0, g: 0, b: 0 });
  const [won, setWon] = useState(false)
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0)

  const difficulties = {
    "easy": 75,
    "medium": 50,
    "hard": 25,
    "i hate myself": 1
  }

  const fetchColor = async () => {

    const getRandomNumber = (interval) => Math.floor(Math.floor(Math.random() * Math.floor(255 / interval)) * interval);
    const interval = difficulties[difficulty]
    setColor({ r: getRandomNumber(interval), g: getRandomNumber(interval), b: getRandomNumber(interval) })

    setTime(0)
    setIsActive(true)
    setWon(false)
    setGuess({ r: 0, g: 0, b: 0 })
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  if (
    guess?.r === color?.r
    && guess?.g === color?.g
    && guess?.b === color?.b
    && won === false
  ) {
    setWon(true)
    setIsActive(false)
  }

  const rawTimeToHumanReadable = (time) => {
    return Math.floor(time / 1000)
  }

  return (
    <Container>
      <Menu>
        <DifficultyMenu value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {Object.keys(difficulties).map((d) => <MenuItem value={d}>{d}</MenuItem>)}
        </DifficultyMenu>
        {isActive ? <Timer time={rawTimeToHumanReadable(time)} /> : won && <p>You won in {rawTimeToHumanReadable(time)} seconds!</p>}
        <StartButton variant='outlined' onClick={() => fetchColor()}>Start</StartButton>
      </Menu>
      <ColorBoxes>
        {!color && <Instructions><p>Match the colors using the RGB sliders at the bottom of the screen.</p></Instructions>}
        {color && <ColorBox r={color.r} g={color.g} b={color.b} />}
        {color && <ColorBox r={guess.r} g={guess.g} b={guess.b} />}
      </ColorBoxes>
      <SliderBox>
        {color && <ColorSliders won={won} difficulty={difficulty} guess={guess} setGuess={setGuess} />}
      </SliderBox>
    </Container>
  )
}

export default Game