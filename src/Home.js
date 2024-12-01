import './Home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home(props) {
    return (
        <>
            <Logo />
            <SelectLevel handleLevel={props.handleLevel} />
            <HowToPlay />
            <Footer />
        </>
    )
}

export function Logo() {
    return (
        <div className="logo container">
            <h1>
                <span>W</span>
                <span>O</span>
                <span>R</span>
                <span>D</span>
                <span>L</span>
                <span>E</span>
            </h1>
            <p>Master the art of word guessing with customizable challenges</p>
        </div>
    )
}

function SelectLevel(props) {
    const navigate = useNavigate();
    useEffect(() => {
        const startButton = document.querySelector('.start-button');
        startButton.addEventListener('click', () => {
            navigate('/game');
        });

        const levelButtons = document.querySelectorAll('.level-buttons button:not(.start-button)');
        levelButtons?.forEach(button => {
            button.addEventListener('click', function (e) {
                props.handleLevel(e);
                levelButtons?.forEach(b => b.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    }, );

    return (
        <div className="select-level container">
            <h2 className='h2-heading'>SELECT YOUR CHALLENGE LEVEL</h2>
            <div className="level-buttons">
                <div>
                    <button>3 Letters</button>
                    <button>4 Letters</button>
                </div>
                <div>
                    <button >5 Letters</button>
                    <button >6 Letters</button>
                </div>
                <div>
                    <button>7 Letters</button>
                </div>
            </div>
            <button className="start-button">START</button>
        </div>
    )
}

function HowToPlay() {
    return (
        <div className="how-to-play container">
            <h2 className='h2-heading'>HOW TO PLAY</h2>
            <p>Choose your preferred word length and test your vocabulary skills.</p>
            <p>After each guess, the tiles will change color to guide you:</p>
            <div>
                <span className='letter green-letter'>W</span>
                <span className='letter'>O</span>
                <span className='letter'>R</span>
                <span className='letter'>D</span>
                <span className='letter'>S</span>
            </div>
            <h5><b>Green</b> indicates a correct letter in the perfect position</h5>
            <div>
                <span className='letter'>P</span>
                <span className='letter yellow-letter'>I</span>
                <span className='letter'>L</span>
                <span className='letter'>O</span>
                <span className='letter'>T</span>
            </div>
            <h5><b>Yellow</b> shows a correct letter in the wrong position</h5>
            <div>
                <span className='letter'>V</span>
                <span className='letter '>a</span>
                <span className='letter gray-letter'>g</span>
                <span className='letter'>u</span>
                <span className='letter'>e</span>
            </div>
            <h5><b>Gray</b> means the letter isn't in the target word</h5>
        </div>
    )
}

function Footer() {
    return (
        <div className='footer'>
            <p>Wordle</p>
            <p>Challenge yourself with unlimited WORDLE puzzle!</p>
            <p>Created by Rlabbiz - Rida Labbiz</p>
        </div>
    )
}

