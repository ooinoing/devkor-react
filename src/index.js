
import React , {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = ({value,onClick})=>{
  return(
    <button className='square' onClick={onClick}>{value}</button>
  )
}

const Board = ()=>{

  const [squares, setSquares] = useState(Array(9).fill(''))
  const [next, setNext] = useState('X');

  const hasWinner = () => {
    const winningCase =[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0; i<winningCase.length; ++i){
      const [a,b,c] = winningCase[i];
      if (squares[a] != "" && squares[a]===squares[b] && squares[b]===squares[c]) 
        return squares[a]; 
    }
    return false;
  }

  const gameOver = () => {
    for(let i=0; i<9; ++i){
      if (squares[i] === "") return false; 
    }
    return true;
  }

  const renderSquare =(i) => {
    return <Square value={squares[i]} onClick={()=>{handleClick(i)}}/>;
  }

  const newGame = () => {
    if (hasWinner() || gameOver())
      return (
        <div>
        <p>New Game?</p>
        <span className="restart-button-yes" onClick={() => {
          setSquares(Array(9).fill(""));
          setNext("X");}}>Yes</span>
        <span className="restart-button-no" onClick={() => {alert('Ended!')}}>No</span>
        </div>
      ); 
  }; 

  const handleClick = (i) =>{ // next player 설정, 현재 Square state 변경
    if(hasWinner()|| squares[i]!="") return ;

    const sq = squares.slice()  // 배열의 얕은 복사본을 새로운 배열 객체로 반환
    sq[i] = next
    if(next === 'X') setNext('O') 
    else setNext('X')

    setSquares(sq)
  }

  let status = "Next Player : " + next;
    if(hasWinner()) status = 'Winner: '+ hasWinner();
    else if(gameOver()) status = 'Tied!';


  return(   
  <div>
    <div className="game-header">
      <h4></h4>TicTacToe</div>

    <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div>{newGame()}</div>
  </div>
  );

}

const Game = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-info'>
        <div>{/* status */}</div>
        <div>{/* TODO */}</div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
