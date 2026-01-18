import { useState, useRef, useEffect } from 'react';

const PlayerName = ({ initialName = 'Player Name', onNameChange }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onNameChange) {
      onNameChange(name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (onNameChange) {
        onNameChange(name);
      }
    } else if (e.key === 'Escape') {
      setName(initialName);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="player-name-container">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="player-name-input"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="player-name-display">
          <span className="player-name-text">{name}</span>
          <button
            className="edit-button"
            onClick={handleEditClick}
            aria-label="Edit player name"
          >
            <svg
              className="pencil-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerName;
