import Game from './components/Game';
import Box from '@mui/material/Box'
import styled from 'styled-components';

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
`

const App = () => {
  return (
    <Container>
      <Game />
    </Container>
  )
}

export default App;