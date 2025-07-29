import { ThemeProvider } from './contexts/ThemeContext'
import { MoviePicker } from './components/MoviePicker'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <MoviePicker />
      </div>
    </ThemeProvider>
  )
}

export default App 