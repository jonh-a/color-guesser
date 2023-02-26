import Slider from '@mui/material/Slider'
import React from 'react'

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
        paddingTop: '1em'
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
        <ColorSlider
          interval={interval}
          name={color?.name}
          value={color?.value}
          setValue={color?.setValue}
          disabled={color?.disabled}
        />
      ))}
    </>
  )
}

export default ColorSliders