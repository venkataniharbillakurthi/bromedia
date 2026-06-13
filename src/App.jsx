import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Projects from './components/Projects'
import Industries from './components/Industries'

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Projects />
        <Industries />
      </main>
    </div>
  )
}

export default App
