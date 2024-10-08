import './App.css';
import { useState } from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDrag} from 'react-dnd';
import {useDrop} from 'react-dnd';
import React, {useEffect } from 'react';


interface Team {
  name: string;
}

interface Match {
  name: string;
  teams: Team[];
}

interface Round {
  name: string;
  matches: Match[];
}

interface BracketProps {
  rounds: Round[];
}

interface DropZoneProps {
  onDrop: (name: string) => void;
}

interface Item {
  name: string;
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

function TeamSelection({name}:Team){
  
  const [, drag] = useDrag(() => ({
    type: 'box',
    item: {name},
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


// function Bracket ({rounds}:BracketProps) {
//   return(
//   <div className='Bracket'>
//     {rounds.map((round,roundIndex) => (
//       <div key={roundIndex} className={`round-${roundIndex}`}>
//         <h2>{round.name}</h2>
//       {round.matches.map((match,matchIndex) => (
//         <div className='Match' key={matchIndex}>
//           <h3>{match.name}</h3>
//           <div className='Teams1'>
//             {match.teams.map((team,teamIndex) => (
//               <button className='Team' key={teamIndex}>{team.name}</button>
//             ))}
//           </div>
//         </div>
//       ))}
//       </div>
//     ))}
//   </div>
//   );
// }

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

function CreateBracket(){
  const [topTeams, setTeams] = useState<Team[]>([]);
  const [teams, setAvailableTeams] = useState(initialTeams);

  const initalRounds = [
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

  const [rounds, setRounds] = useState<Round[]>(initalRounds);
  function HandleClick(roundIndex: number, matchIndex: number, teamIndex: number) {
    const newRounds = [...rounds];
    const currentMatch = newRounds[roundIndex].matches[matchIndex];
    const advancingTeam = currentMatch.teams[teamIndex];

    if (roundIndex + 1 < newRounds.length) {
      const nextRound = newRounds[roundIndex + 1];
      const nextMatch = nextRound.matches.find(match => match.teams.includes(fillers[matchIndex]));

      if (nextMatch) {
        nextMatch.teams = nextMatch.teams.map(team => team.name.includes('Winner') ? advancingTeam : team);
      }
    }
    setRounds(newRounds);
  }

  function Bracket ({rounds}:BracketProps) {
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
                <button onClick= {()=>HandleClick(roundIndex,matchIndex,teamIndex)} className='Team' key={teamIndex}>{team.name}</button>
              ))}
            </div>
          </div>
        ))}
        </div>
      ))}
    </div>
    );
  }

  useEffect(() => {
    if(topTeams.length === 12){
      alert('Bracket is full!')
    }
  }, [topTeams]
  );

  function DropZone({onDrop}: DropZoneProps) {
    const [, drop] = useDrop<Item>(() => ({
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

  const moveTeam = (name: string) => {

    const newTeams = teams.filter((team) => name === team.name);
    const newAvailableTeams = teams.filter((team) => name !== team.name);
    setTeams(topTeams => [...topTeams, newTeams[0]]);
    setAvailableTeams(newAvailableTeams);
  };

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
            <TeamSelection key= {team.name} name={team.name}/>
          ))}
        </div>
        <DropZone onDrop={moveTeam}/>
      </div>
      <div className='BracketButton'>
        <button onClick={()=> handleClick()}>Create Bracket!</button>
        {showBracket && <Bracket rounds = {initalRounds}/>}
      </div>
    </>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Title/>
        <CreateBracket/>
        <header className="App-header">
        </header>
      </div>
    </DndProvider>
  );
}

export default App;
