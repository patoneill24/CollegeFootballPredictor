import './App.css';
import { useState } from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDrag} from 'react-dnd';
import {useDrop} from 'react-dnd';

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

function Title(){
  return <div>
    <h1>2025 CFB Playoff Prediction</h1>
    <h2>Team Selection</h2>
  </div>
}

const teams = [
  {name: 'Alabama'},
  {name: 'Texas'},
  {name: 'Ohio State'},
  {name: 'Tennessee'},
  {name: 'Georgia'},
  {name: 'Oregon'},
  {name: 'Penn State'},
  {name: 'Miami FL'},
  {name: 'Missouri'},
  {name: 'Michigan'},
  {name: 'USC'},
  {name: 'Ole Miss'},
  {name: 'LSU'},
  {name: 'Notre Dame'},
  {name: 'Clemson'},
  {name: 'Iowa State'},
  {name: 'BYU'},
  {name: 'Utah'},
  {name: 'Oklahoma'},
  {name: 'Kansas State'},
  {name: 'Boise State'},
  {name: 'Louisville'},
  {name: 'Indiana'},
  {name: 'Illinois'},
  {name: 'Texas A&M'}
];

function Team({name}){
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'box',
    item: {name},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return(
      <button ref={drag}>{name}</button>
  )
}


function Teams(){
  const [TopTeams, setTeams] = useState([
    {name:'Drag Teams here'},
    // {name:'2nd Seed'},
    // {name:'3rd Seed'},
    // {name:'4th Seed'},
    // {name:'5th Seed'},
    // {name:'6th Seed'},
    // {name:'7th Seed'},
    // {name:'8th Seed'},
    // {name:'9th Seed'},
    // {name:'10th Seed'},
    // {name:'11th Seed'},
    // {name:'12th Seed'}
  ]);

  const [{isOver}, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item) => moveTeam(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const moveTeam = (name) => {
    // const newTeams = TopTeams.slice();
    // for(let i = 0; i < newTeams.length; i++){
    //   if(newTeams[i].name === name){
    //     newTeams[i].name = 'Open Slot';
    //   }
    // }
    // setTeams(newTeams);
    const newTeams = teams.filter((team) => name === team.name);
    setTeams(topTeams => [...topTeams, newTeams[0]]);
  };

  return(
    <div className='Teams'>
      <div className='TeamsBox'>
        {teams.map((team) => (
          <Team name={team.name}/>
        ))}
      </div>
      <div className='TeamSlots' ref={drop}> 
          {TopTeams.map((team) => (
            <div>{team.name}</div>
          ))}
      </div>
    </div>
  );
}

function CreateBracket(){
  return(
      <div className='BracketButton'>
        <button>Create Bracket!</button>
      </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Title/>
        <Teams/>
        <CreateBracket/>
        <header className="App-header">
        </header>
      </div>
    </DndProvider>
  );
}

export default App;
