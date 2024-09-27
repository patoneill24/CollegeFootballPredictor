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

function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const[squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i){
    if(squares[i] || calculateWinnder(squares)){
      return;
    }
    const newSquares = squares.slice();
    if(xIsNext){
      newSquares[i] = 'X';
    }else{
      newSquares[i] = 'O';
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinnder(squares);
  let status;
  if(winner){
    status = 'Winner: ' + winner;
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
      <Board/>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
