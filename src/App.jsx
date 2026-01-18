import { useState } from 'react';
import PlayerName from './components/PlayerName';
import './App.css';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
  ]);

  const handleNameChange = (id, newName) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, name: newName } : player
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>EZStaff - Project Staffing</h1>
      </header>
      <main className="app-main">
        <div className="players-section">
          <h2>Team Members</h2>
          <div className="players-list">
            {players.map(player => (
              <div key={player.id} className="player-card">
                <PlayerName
                  initialName={player.name}
                  onNameChange={(newName) => handleNameChange(player.id, newName)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
