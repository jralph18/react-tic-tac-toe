import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ value, clickHandler }) => {
    return (
        <button className="square" onClick={ clickHandler }>
            {value}
        </button>
    );
}

const Board = ({squares, handleClick}) => {

    const renderSquare = (i) => {
        return (
            <Square 
                value={squares[i]} 
                clickHandler={() => handleClick(i)}
            />
        );
    }
    return (
        <div>
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
        </div>
      );
}

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    const current = history[stepNumber];
    const winner = calculateWinner(current);
    
    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })
    
    let status;
    if (winner === "tie") {
        status = "Tie!";
    } else if (winner) {
        status = "Winner: " + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const handleClick = (i) => {
        
        if( winner || current[i] ) {
            return;
        }
        
        const tempHistory = history.slice(0, stepNumber + 1);
        let tempSquares = current.slice();
        tempSquares[i] = xIsNext ? 'X' : 'O';

        setHistory([...tempHistory, tempSquares]);
        setStepNumber(stepNumber + 1);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board squares={current} handleClick={handleClick}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );

}

  const calculateWinner = (squares) => {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
      let boardFull = true;
      for( let i=0; i < lines.length; i++ ){
          const [a, b, c] = lines[i];
          if(!squares[a] || !squares[b] || !squares[c]) {
              boardFull = false;
          }
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
          }
      }
      if(boardFull) {
          return "tie";
      } else {
          return null;
      }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  