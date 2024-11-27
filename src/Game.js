import './Game.css';
import { Logo } from './Home';
import { useEffect } from 'react';

export function Game(props) {
    return (
        <>
            <Logo />
            <GameHeader />
            <GameContent />
        </>
    )
}

function GameHeader(props) {
    return (
        <div className="game-header container">
            <button className="new-button item">New Game</button>
            <button className="hint-button item">Use Hint</button>
            <button className='more-button item disable'>More Chance</button>
            <span className='item'>Time: 0.00</span>
        </div>
    )
}

function GameContent(props) {

    // listeaning to keydown event and logging the key pressed to the span items
    useEffect(() => {

        const word = {
            0: 'h',
            1: 'e',
            2: 'l',
            3: 'l',
            4: 'o'
        };
        const lettersArray = Object.values(word);

        const lines = document.querySelectorAll('.game-line');
        let spans = document.querySelectorAll('.game-line.use .letter');
        const lettersLenght = spans?.length;
        const lettersFiled = {};
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let index = 0;
        let lineIndex = 0;
        function handleNextLine() {
            if (index == 0) {
                lines[lineIndex].classList.add('use');
                spans = document.querySelectorAll('.game-line.use .letter');
                console.log('lineIndex:', lineIndex);
                return ;
            } else {
                if (lineIndex >= lines.length - 1) 
                    return handleGameOver();
                handleCurrentLine();
                index = 0;
                lines[lineIndex].classList.remove('use');
                lineIndex++;
                lines[lineIndex].classList.add('use');
                spans = document.querySelectorAll('.game-line.use .letter');
                console.log('lineIndex:', lineIndex);
                return ;
            }
            
        }
        function handleCurrentLine() {
            let wordIndex = 0;
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].innerHTML === word[wordIndex]) {
                    spans[i].classList.add('green-letter');
                
                }
                else if (lettersArray.includes(spans[i].innerHTML)) {
                    spans[i].classList.add('yellow-letter');
                } else {
                    spans[i].classList.add('gray-letter');
                }
                wordIndex++;
            }
        }
        function handleGameOver() {
            console.log('Game Over');
            document.removeEventListener('keydown', handleKeyDown);
            return ;
        }
        handleNextLine();
        function handleKeyDown(e) {
            // handle enter key, check if all keys are pressed and submit
            if (e.key === 'Enter') {
                if (index < lettersLenght) {
                    console.log('please press all keys');
                    return;
                }
                handleNextLine()
                console.log(lettersFiled);
                return ;
            } 

            // handle backspace key, remove the last letter
            if (e.key === 'Backspace') {
                if (index > 0) {
                    index--;
                    spans[index].innerText = '';
                    spans[index].classList.remove('filled');
                    // remove the letter from the list of filled letters
                    lettersFiled[index] = '';
                } else {
                    console.log('no letters to remove');
                }
                return;
            }
            
            // if key not letter then return
            if (!letters.includes(e.key))
                return;

            if (index >= lettersLenght) {
                console.log('pressed all keys press enter to submit or remove letters using backspace');
                return;
            }
            if (spans && spans[index]) {
                spans[index].innerText = e.key;
                spans[index].classList.add('filled');
                // add the letter to the list of filled letters
                lettersFiled[index] = e.key;
                index++;
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div className="game-content container">
            <div className="game-line">
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
            </div>
            <div className="game-line">
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
            </div>
            <div className="game-line">
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
            </div>
            <div className="game-line">
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
            </div>
            <div className="game-line">
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
            </div>
            <div className="game-line">
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
                <span className="letter"></span>
            </div>
        </div>
    )
}