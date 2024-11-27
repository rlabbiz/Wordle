import './App.css';
import { Home } from './Home';
import { useState } from 'react';
import { Game } from './Game';

function App() {

  const [level, setLevel] = useState(5);
  const [isHome, setIsHome] = useState(true);
  console.log('isHome:', isHome);

  function handleGameStart() {
    if (isHome)
      setIsHome(false);
    else
      setIsHome(true);
  }

  function handleLevel(e) {
    console.log('element : ', e?.target?.innerText)
    let level = parseInt(e?.target?.innerText);
    if (level)
      setLevel(level);
  }
  if (isHome) {
    return (
      <Home handleGameStart={handleGameStart} handleLevel={handleLevel} />
    );
  } else {
    return (
      <Game level={level} />
    );
  }
  
}

export default App;
