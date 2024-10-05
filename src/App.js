import './App.css';
import { useState } from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDrag} from 'react-dnd';
import {useDrop} from 'react-dnd';
import React, {useEffect } from 'react';


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

const initialTeams = [
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

function Team({name, onDrop}){
  
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'box',
    item: {name},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if(item && dropResult){
        onDrop(item.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return(
      <>
        <button ref={drag}>{name}</button>
      </>
  )
}




function Teams(){
  const [topTeams, setTeams] = useState([]);
  const [teams, setAvailableTeams] = useState(initialTeams);
  const fillers = [
    {name:'Winner of Match 1'},
    {name:'Winner of Match 2'},
    {name:'Winner of Match 3'},
    {name:'Winner of Match 4'},
    {name:'Winner of Match 5'},
    {name:'Winner of Match 6'},
    {name:'Winner of Match 7'},
    {name:'Winner of Match 8'},
    {name:'Winner of Match 9'},
    {name:'Winner of Match 10'},
    {name:'Winner of Match 11'},
  ];

  const rounds = [
    {name: 'Round 1'
    ,matches: [
      {name: 'Match 1', teams: [topTeams[11],topTeams[4]]},
      {name: 'Match 2', teams: [topTeams[8],topTeams[7]]},
      {name: 'Match 3', teams: [topTeams[10],topTeams[5]]},
      {name: 'Match 4', teams: [topTeams[9],topTeams[6]]}
    ]},
    {name: 'Quarterfinals',
    matches: [
      {name: 'Match 5', teams: [fillers[0], topTeams[3]]},
      {name: 'Match 6', teams: [fillers[1], topTeams[0]]},
      {name: 'Match 7', teams: [fillers[2], topTeams[2]]},
      {name: 'Match 8', teams: [ fillers[3], topTeams[1],]}
    ]},
    {name: 'Semifinals',
    matches: [
      {name: 'Match 9', teams: [fillers[4], fillers[5]]},
      {name: 'Match 10', teams: [fillers[6], fillers[7]]}
    ]},
    {name: 'Championship',
    matches: [
      {name: 'Match 11', teams: [fillers[8], fillers[9]]}
    ]},
    {name: 'Champion',
    matches: [
      {name: 'National Champion', teams: [fillers[10]]}
    ]
    }
  ];

  useEffect(() => {
    if(topTeams.length === 12){
      alert('Bracket is full!')
    }
    setAvailableTeams(teams.filter((team) => !topTeams.includes(team)));
  }, [topTeams]
  );

  function DropZone({onDrop}){
    const [{isOver}, drop] = useDrop(() => ({
      accept: 'box',
      drop: (item) => onDrop(item.name),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));
    return (
      <div className='TeamSlots' ref={drop}> 
        <h2>Drop Top 12 Teams Here</h2>
          {topTeams.map((team) => (
            <button className='Slot'>{team.name}</button>
          ))}
      </div>
    );
  }

  const moveTeam = (name) => {

    const newTeams = teams.filter((team) => name === team.name);
    const newAvailableTeams = teams.filter((team) => name !== team.name);
    setTeams(topTeams => [...topTeams, newTeams[0]]);
    setAvailableTeams(newAvailableTeams);
  };

  const handleDrag = (name) => {
    const newAvailableTeams = teams.filter((team) => name !== team.name);
    setAvailableTeams(newAvailableTeams);
  }

  const [showBracket, setShowBracket] = useState(false);

  function handleClick(){
    if(topTeams.length < 12){
      alert('Please select 12 teams to create a bracket');
      return;
    }
    setShowBracket(true);
  }

  return(
    <>
      <div className='Teams'>
        <div className='TeamsBox'>
          <h2>Top 25 Teams</h2>
          {teams.map((team) => (
            <Team key={team.name} name={team.name} onDrop={handleDrag}/>
          ))}
        </div>
        <DropZone onDrop={moveTeam}/>
      </div>
      <div className='BracketButton'>
        <button onClick={()=> handleClick()}>Create Bracket!</button>
        {showBracket && <Bracket rounds = {rounds}/>}
      </div>
    </>
  );
}



function Bracket ({rounds}) {
  return(
  <div className='Bracket'>
    {rounds.map((round,roundIndex) => (
      <div key={roundIndex} className={`round-${roundIndex}`}>
        <h2>{round.name}</h2>
      {round.matches.map((match,matchIndex) => (
        <div className='Match' key={matchIndex}>
          <h3>{match.name}</h3>
          <div className='Teams1'>
            {match.teams.map((team,teamIndex) => (
              <div className='Team' key={teamIndex}>{team.name}</div>
            ))}
          </div>
        </div>
      ))}
      </div>
    ))}
  </div>
  );
}


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Title/>
        <Teams/>
        <header className="App-header">
        </header>
      </div>
    </DndProvider>
  );
}

export default App;
