import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About'
import Stay from './pages/Stay'
import Amenities from './pages/Amenities'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Activities from './pages/Activities'
import { ThemeProvider } from './context/ThemeContext'
import { LeafProvider } from './context/LeafContext'
import Preloader from './components/Preloader'
import FloatingLeaf from './components/FloatingLeaf'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <LeafProvider>
        <FloatingLeaf />
        {isLoading ? (
          <Preloader onComplete={() => setIsLoading(false)} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="stay" element={<Stay />} />
                <Route path="activities" element={<Activities />} />
                <Route path="amenities" element={<Amenities />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </Router>
        )}
      </LeafProvider>
    </ThemeProvider>
  )
}

export default App