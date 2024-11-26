import './Home.css';

export function Home() {
    return (
        <>
            <Logo />
        </>
    )
}

function Logo() {
    return (
        <div className="logo">
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