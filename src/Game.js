import './Game.css';
import { Logo } from './Home';
import { useState, useEffect } from 'react';

// https://www.wordsapi.com/#try for words api
// https://random-word-api.vercel.app/api?words=10&length=4 for random words

let timeInterval = null;
let word = null;
let hints = null;
let previousWord = null;

export function Game(props) {

    const [wordsHistory, setWordsHistory] = useState([]);

    // function to add the word to the words history, and re-render just the WordsHistory component, and passed as props to the GameContent component
    function addWordToHistory(word) {
        setWordsHistory((prev) => [...prev, word]);
    }

    return (
        <>
            <Notification />
            <Logo />
            <GameHeader />
            <GameContent level={props.level} addWordToHistory={addWordToHistory} />
            <WordsHistory wordsHistory={wordsHistory} />
            <Keyboard />
        </>
    )
}

function WordsHistory(props) {
    const innerHTML = [];
    for (let i = 0; i < props.wordsHistory.length; i++) {
        innerHTML.push(
            <div className='word-history-item' key={i}>
                <span className='word-history-letter'>Word: </span>
                <span className='word-history-word'>{props.wordsHistory[i]}</span>
            </div>
        );
    }

    return (
        <div className="words-history container">
            {innerHTML}
        </div>
    )
}

function Keyboard() {
    return (
        <div className="keyboard container">
            <div className="row">
                <Key value='q' />
                <Key value='w' />
                <Key value='e' />
                <Key value='r' />
                <Key value='t' />
                <Key value='y' />
                <Key value='u' />
                <Key value='i' />
                <Key value='o' />
                <Key value='p' />
            </div>
            <div className="row">
                <Key value='a' />
                <Key value='s' />
                <Key value='d' />
                <Key value='f' />
                <Key value='g' />
                <Key value='h' />
                <Key value='j' />
                <Key value='k' />
                <Key value='l' />
            </div>
            <div className="row">
                <Key value='Enter' />
                <Key value='z' />
                <Key value='x' />
                <Key value='c' />
                <Key value='v' />
                <Key value='b' />
                <Key value='n' />
                <Key value='m' />
                <Key value='Backspace' />
            </div>
        </div>
    )
}

function Key(props) {
    // function to handle the key click, then click the letter on the keyboard 
    function handleClick() {
        const event = new KeyboardEvent('keydown', {
            key: props.value
        });
        document.dispatchEvent(event);
    }

    return (
        <span className="key" key={props.value} onClick={handleClick}>{props.value}</span>
    )
}

function Notification() {
    return (
        <div className="notification">
            <span className="notification-text">Game Over</span>
        </div>
    )
}

function DisplayTime() {
    const [time, setTime] = useState(0);
    useEffect(function() {
        timeInterval = setInterval(() => {
            setTime((prev) => prev + 0.01);
        }, 1000);
        return () => {
            clearInterval(timeInterval);
        }
    }, []);
    return (
        <span className='time item'>Time: {time.toFixed(2)}</span>
    )
}

function GameHeader(props) {
    return (
        <div className="game-header container">
            <button className="new-button item">New Game</button>
            <button className="hint-button item">Use Hint</button>
            <button className='more-button item disable'>More Chance</button>
            <DisplayTime />
        </div>
    )
}

async function fetchrandomWord(length) {
    const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${length}`).then(response => response.json());
    return response;
}


async function checkWord(word) {
    if (previousWord === word)
        return {title: 'No Definitions Found'};
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9d82a3b783mshd3bc8a92820456bp1a65a8jsn9fccee6e2284',
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    }).then(response => response.json());
    previousWord = response;
    return response;
}

function wordToarray(word) {
    return word.split('');
}

function DisplayNotification(type, text) {
    const notification = document.querySelector('.notification');
    if (notification && notification.classList.contains('show'))
        return ;
    if (notification)
        notification.classList.add('show');
    else 
        return ;
    const notificationText = document.querySelector('.notification-text');
    const time = document.querySelector('.time.item');
    if (notificationText && time){
        if (type === 'error') {
            notificationText.innerText = text;
            notification.style.backgroundColor = 'red';
        } else {
            notificationText.innerText = text + time.innerText;
        }
    }
    setInterval(() => {
        notification.classList.remove('show');
    }, 3000);
}

function GameContent(props) {
    useEffect(function() {
        const keyboardKeys = document.querySelectorAll('.key');

        // function to handle the key press on the keyboard and add animastion to the key
        function handleKeyboardKeys(key) {
            for (let i = 0; i < keyboardKeys.length; i++) {
                if (keyboardKeys[i].innerText === key) {
                    keyboardKeys[i].style.animation = 'pop 0.1s ease';
                    setTimeout(() => {
                        keyboardKeys[i].style.animation = '';
                    }, 100);
                }
            }
        }

        // function to set keyboard keys if the letter is info or correct or wrong
        function setKeyboardKeys(key, type) {
            console.log('Key: ', key + ' Type: ', type);
            for (let i = 0; i < keyboardKeys.length; i++) {
                if (keyboardKeys[i].innerHTML === key) {
                    if (type === 'info') {
                        if (keyboardKeys[i].classList.contains('wrog'))
                            keyboardKeys[i].classList.remove('wrong');
                        if (!keyboardKeys[i].classList.contains('success')){
                            if (!keyboardKeys[i].classList.contains('yellow'))
                                keyboardKeys[i].classList.add('yellow');
                        }
                    } else if (type === 'correct') {
                        if (keyboardKeys[i].classList.contains('yellow'))
                            keyboardKeys[i].classList.remove('yellow');
                        if (keyboardKeys[i].classList.contains('wrong'))
                            keyboardKeys[i].classList.remove('wrong');
                        if (!keyboardKeys[i].classList.contains('success'))
                            keyboardKeys[i].classList.add('success');
                    } else if (type === 'wrong') {
                        if (!keyboardKeys[i].classList.contains('success') && !keyboardKeys[i].classList.contains('yellow'))
                            keyboardKeys[i].classList.add('wrong');
                    }
                }
            }
        }

        console.log('word: ', word);
        (async function() {
            // fetch the random word
            let tmp = await fetchrandomWord(props.level);

            // check if the word is correct
            let data = await checkWord(tmp[0]);
            while (data.title === 'No Definitions Found') {
                tmp = await fetchrandomWord(props.level);
                data = await checkWord(tmp[0]);
            }
            
            // save the word to the variable, and save the hints to the variable
            word = wordToarray(tmp[0]);
            hints = data[0];

            console.log('Word: ', word.join(''));
            console.log('Hints: ', hints);
        })();

        const lines = document.querySelectorAll('.game-line');
        let spans = document.querySelectorAll('.game-line.use .letter');
        let lettersLenght = props.level;
        let lettersFiled = {};
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let index = 0;
        let lineIndex = 0;

        // function to handle the next line, if the line is the last line then call handleGameOver function if not then call handleCurrentLine function
        function handleNextLine() {
            // if the index is 0 then add the class use to the first line and get the spans of the line
            if (index === 0) {
                lines[lineIndex].classList.add('use');
                spans = document.querySelectorAll('.game-line.use .letter');
                return ;
            } else {
                handleCurrentLine();
                if (lineIndex >= lines.length - 1) 
                    return handleGameOver();
                index = 0;
                lines[lineIndex].classList.remove('use');
                lineIndex++;
                lines[lineIndex].classList.add('use');
                spans = document.querySelectorAll('.game-line.use .letter');
                return ;
            }
        }

        // function to handle the current line, check if the word is correct or not
        function handleCurrentLine() {
            let wordIndex = 0;
            const currect = []
            const wrong = []

            for (let i = 0; i < spans.length; i++) {
                // if the letter is correct and letter is not already filled
                if (spans[i].innerHTML === word[wordIndex] && !wrong.includes(spans[i].innerHTML)) {
                    spans[i].classList.add('green-letter');
                    setKeyboardKeys(spans[i].innerHTML, 'correct');
                    currect.push(spans[i].innerHTML);
                }
                else if (word.includes(spans[i].innerHTML) && !wrong.includes(spans[i].innerHTML) && !currect.includes(spans[i].innerHTML)) {
                    spans[i].classList.add('yellow-letter');
                    setKeyboardKeys(spans[i].innerHTML, 'info');
                    wrong.push(spans[i].innerHTML);
                } else {
                    setKeyboardKeys(spans[i].innerHTML, 'wrong');
                    spans[i].classList.add('gray-letter');
                }
                wordIndex++;
            }
            if (currect.length === word.length) {
                console.log('Word is correct');
                return handleGameOver();
            }
        }

        // function to handle the game over, clear the interval, show the notification and remove the event listener
        function handleGameOver() {
            console.log('Game Over');
            clearInterval(timeInterval);
            DisplayNotification('success', 'You have completed the game in ');
            
            // remove the event listener
            document.removeEventListener('keydown', handleKeyDown);
            return ;
        }
        handleNextLine();
        function handleKeyDown(e) {
            handleKeyboardKeys(e.key);
            // handle enter key, check if all keys are pressed and submit
            if (e.key === 'Enter') {
                // checl if all letters are entered, if not the do nothing and return 
                if (index < lettersLenght)
                    return;

                // check if the word is correct
                const wordToCheck = [];
                for (let i = 0; i < spans.length; i++) {
                    wordToCheck.push(spans[i].innerHTML);
                }
                (async () => {
                    document.removeEventListener('keydown', handleKeyDown);
                    let check = await checkWord(wordToCheck.join(''));

                    document.addEventListener('keydown', handleKeyDown);
                    if (check.title === 'No Definitions Found') {
                        DisplayNotification('error', 'Not a valid word');
                    } else {
                        props.addWordToHistory(wordToCheck.join(''));
                        handleNextLine()
                    }
                })();
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
                }
                return;
            }
            
            // if key not letter then return
            if (!letters.includes(e.key))
                return;

            // if all letters are filled then return
            console.log('Letters Filed: ');
            if (index >= lettersLenght) 
                return;

            // if all checks are passed then fill the letter
            if (spans && spans[index]) {
                spans[index].innerText = e.key;
                spans[index].classList.add('filled');
                // add the letter to the list of filled letters
                lettersFiled[index] = e.key;
                index++;
            }
        }

        // add event listener for keydown event and send the event to handleKeyDown function for processing
        document.addEventListener('keydown', handleKeyDown);

        // handle more button chance click 
        const moreButton = document.querySelector('.more-button');
        moreButton.addEventListener('click', function() {
            clearInterval(timeInterval);
            document.removeEventListener('keydown', handleKeyDown);

            const allSpans = document.querySelectorAll('.letter');
            for (let i = 0; i < allSpans.length; i++) {
                allSpans[i].innerText = '';
                allSpans[i].classList.remove('filled');
                allSpans[i].classList.remove('green-letter');
                allSpans[i].classList.remove('yellow-letter');
                allSpans[i].classList.remove('gray-letter');
            }
            index = 0;
            lineIndex = 0;
            lettersFiled = {};
            spans = document.querySelectorAll('.game-line.use .letter');
            lettersLenght = spans?.length;
            for (let i = 0; i < lines.length; i++) {
                lines[i].classList.remove('use');
            }
            handleNextLine();
            document.addEventListener('keydown', handleKeyDown);
        });

        // handle new Button click
        const newButton = document.querySelector('.new-button');
        if (newButton) {
            newButton.addEventListener('click', function() {
                window.location.reload();
            });
        }

        // remove the event listener when the component is unmounted
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, );

    const innerHTML = []

    for (let i = 0; i < props.level; i++) {
        innerHTML.push(<LetterComponent key={i} />);
    }

    return (
        <div className="game-content container">
            <div className="game-line">
                {innerHTML}
            </div>
            <div className="game-line">
                {innerHTML}
            </div>
            <div className="game-line">
                {innerHTML}
            </div>
            <div className="game-line">
                {innerHTML}
            </div>
            <div className="game-line">
                {innerHTML}
            </div>
            <div className="game-line">
                {innerHTML}
            </div>
        </div>
    )
}

function LetterComponent(props) {
    return (
        <span className="letter"></span>
    )
}