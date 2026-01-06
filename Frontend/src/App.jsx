import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import ScrollToTop from './utils/ScrollToTop'

// Placeholder imports until files are created
import Home from './pages/Home'
import About from './pages/About'
import Amenities from './pages/Amenities'
import Activities from './pages/Activities'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

// Temporary components if files don't exist yet to prevent crash
const TempHome = () => <div className="h-screen flex items-center justify-center">Home Page Loading...</div>
const TempAbout = () => <div className="h-screen flex items-center justify-center">About Page Loading...</div>
const TempAmenities = () => <div className="h-screen flex items-center justify-center">Amenities Page Loading...</div>
const TempGallery = () => <div className="h-screen flex items-center justify-center">Gallery Page Loading...</div>
const TempContact = () => <div className="h-screen flex items-center justify-center">Contact Page Loading...</div>

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Using lazy logic: if import fails, these will crash, so I will ensure files exist immediately next */}
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="amenities" element={<Amenities />} />
                    <Route path="activities" element={<Activities />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
