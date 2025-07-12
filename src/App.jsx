import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App w-full">
      <Navbar />
      <main className="w-full">
        <Home />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;