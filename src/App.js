import './App.css';
import { Home } from './Home';
import { useState } from 'react';
import { Game } from './Game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [level, setLevel] = useState(5);

  function handleLevel(e) {
    let level = parseInt(e?.target?.innerText);
    if (level && level > 2 && level < 8)
      setLevel(level);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home handleLevel={handleLevel} />} />
        <Route path="/game" element={<Game level={level} />} />
      </Routes>
    </Router>
  );

}

export default App;
