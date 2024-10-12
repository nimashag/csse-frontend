import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import './App.css'
import Test from './pages/test'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Test />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
