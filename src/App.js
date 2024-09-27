import './App.css';
import { useState } from 'react';

const user = {
  name: 'John Doe',
  imageURL: 'https://i.imgur.com/yXOvdOSs.jpg',
  imgSize: 90,
};

const products = [
  {title: 'React', price: 100,isGood: true},
  {title: 'Angular', price: 100, isGood: false},
  {title: 'Vue', price: 100, isGood: true},
];

function Product({title, price, isGood}){
  return (
    <div>
      <h2
      style={{color: isGood? 'green': 'red'}}
      >{title}
      </h2>
      <p>${price}</p>
    </div>
  );
}

function Profile(){
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.imageURL} 
      className="avatar"
      alt={'Photo of ' + user.name} 
      style = {{
      width: user.imgSize,
      height: user.imgSize
      }}/>
    </div>
  );
}

function MyButton(){
  function handleClick(){
    alert('You Clicked me!');
  }
  return (
    <button onClick={handleClick}>Click me</button>
  );
}

function ButtonCounter({count, onClick}){
  return (
    <div>
      <button onClick= {onClick}>Clicked {count} times</button>
    </div>
  );
}

function Square({value, onSquareClick}){
  return (
    <button className = "square" onClick={onSquareClick}>{value}</button>
  );
}

function Board({xIsNext, squares, onPlay}){
  function handleClick(i){
    if(squares[i] || calculateWinnder(squares) || declareDraw(squares)){
      return;
    }
    const newSquares = squares.slice();
    if(xIsNext){
      newSquares[i] = 'X';
    }else{
      newSquares[i] = 'O';
    }
    onPlay(newSquares);
  }

  const winner = calculateWinnder(squares);
  const draw = declareDraw(squares);
  let status;
  if(winner){
    status = 'Winner: ' + winner;
  }else if(draw){
    status = 'Draw';
  }else{
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <> 
    <div className = "status">{status}</div>
    <div className = "board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className = "board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className = "board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  );
}

function Game(){
  const[history, setHistory] = useState([Array(9).fill(null)]);
  const[currentMove, setCurrentMove] = useState(0);
  const xIsNext = (currentMove % 2) === 0;
  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    // Todo
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(nextMove){
    // Todo
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = 'Go to move #' + move;
    }else{
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  
  return (
    <div className = "game">
      <div className = "game-board">
        <Board xIsNext = {xIsNext} squares={currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className = "game-info">
        <ol>{moves}</ol>
        </div>
    </div>
  );
}

function calculateWinnder(squares){
  const lines = [
    [0, 1, 2],//Top row
    [3, 4, 5],//Middle row
    [6, 7, 8],//Bottom row
    [0, 3, 6],//Left column
    [1, 4, 7],//Middle column
    [2, 5, 8],//Right column
    [0, 4, 8],//Diagonal from top left to bottom right
    [2, 4, 6],//Diagonal from top right to bottom left
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function declareDraw(squares){
  for(let i = 0; i < squares.length; i++){
    if(squares[i] === null){
      return false;
    }
  }
  return true;
}

function App() {
  const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
  }
  return (
    <div className="App">
      <Profile/>
      {products.map(product => (
        <Product title={product.title} price={product.price} isGood = {product.isGood}/>
      ))}
      <MyButton/>
      <ButtonCounter count= {count} onClick={handleClick}/>
      <ButtonCounter count={count} onClick={handleClick}/>
      <Game/>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
