import { useState } from 'react'
import './App.css'

function App() {
  const [players, setPlayers] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [lineup, setLineup] = useState([])

  const addPlayer = () => {
    if (playerName.trim()) {
      setPlayers([...players, { id: Date.now(), name: playerName.trim() }])
      setPlayerName('')
    }
  }

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  const generateLineup = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5)
    setLineup(shuffled.slice(0, 5))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPlayer()
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏀 Little Blue Devils Lineup Generator</h1>
        <p className="subtitle">Build your winning team</p>
      </header>

      <div className="container">
        <div className="section">
          <h2>Add Players</h2>
          <div className="input-group">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter player name"
              className="input"
            />
            <button onClick={addPlayer} className="btn btn-primary">
              Add Player
            </button>
          </div>

          <div className="player-list">
            <h3>Team Roster ({players.length})</h3>
            {players.length === 0 ? (
              <p className="empty-state">No players added yet</p>
            ) : (
              <ul>
                {players.map(player => (
                  <li key={player.id} className="player-item">
                    <span>{player.name}</span>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="btn-remove"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {players.length >= 5 && (
            <button onClick={generateLineup} className="btn btn-generate">
              Generate Lineup
            </button>
          )}
        </div>

        {lineup.length > 0 && (
          <div className="section lineup-section">
            <h2>Starting Lineup</h2>
            <div className="lineup">
              {lineup.map((player, index) => (
                <div key={player.id} className="lineup-item">
                  <span className="position">{index + 1}</span>
                  <span className="player-name">{player.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
