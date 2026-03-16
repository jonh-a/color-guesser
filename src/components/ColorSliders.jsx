import Slider from '@mui/material/Slider'
import { Button, Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Container = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  min-width: 20em;
`

const IntervalButton = styled(Button)`
  width: 10%;
`

const ColorSlider = ({ interval, value, setValue, disabled }) => {
  return (
    <Slider
      min={0}
      max={255}
      step={interval}
      value={value}
      onChange={setValue}
      valueLabelDisplay='auto'
      disabled={disabled}
      sx={{
        paddingTop: '1em',
        width: '90%',
      }}
    />)
}

const ColorSliders = ({ difficulty, guess, setGuess, won }) => {
  const intervals = {
    "easy": 75,
    "medium": 50,
    "hard": 25,
    "i hate myself": 1
  }

  const interval = intervals[difficulty]

  const colors = [
    {
      color: 'red',
      value: guess?.r,
      setValue: (e, newValue) => setGuess((prevState) => ({ ...prevState, r: newValue })),
      disabled: won,
    },
    {
      color: 'green',
      value: guess?.g,
      setValue: (e, newValue) => setGuess((prevState) => ({ ...prevState, g: newValue })),
      disabled: won,
    },
    {
      color: 'blue',
      value: guess?.b,
      setValue: (e, newValue) => setGuess((prevState) => ({ ...prevState, b: newValue })),
      disabled: won,
    }
  ]

  return (
    <>
      {colors?.map((color) => (
        <Container>
          <IntervalButton
            onClick={() => color.setValue(null, color.value - interval)}
            disabled={!color.value || color.value === 0}
          >-</IntervalButton>
          <ColorSlider
            interval={interval}
            name={color.name}
            value={color.value}
            setValue={color.setValue}
            disabled={color.disabled}
          />
          <IntervalButton
            onClick={() => color.setValue(null, color.value + interval)}
            disabled={color.value === 255}
          >+</IntervalButton>
        </Container>
      ))}
    </>
  )
}

export default ColorSliders