import Container from './layout/Container'
import '@/styles/global.css'
import Left from './components/Left'
import Right from './components/Right'

function App() {
  return (
    <Container>
      <Left />
      <Right />
    </Container>
  )
}

export default App
