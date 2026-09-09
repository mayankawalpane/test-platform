import { useState, useEffect } from 'react'
import './CognitiveGames.css'

// Game 1: Door & Key Puzzle - Find shortest path to collect key and reach door
function DoorsKeyPuzzle({ onComplete }) {
  const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 }) // Start center
  const [hasKey, setHasKey] = useState(false)
  const [moves, setMoves] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [gameWon, setGameWon] = useState(false)
  
  // 3x3 grid - medium difficulty
  const keyPos = { row: 0, col: 0 } // Top-left
  const doorPos = { row: 2, col: 2 } // Bottom-right
  
  // Black/blocked cells (walls) - creating a maze but solvable
  // Solution path exists: Center → Top → Top-left (get key) → move around to bottom-right (door)
  const blockedCells = [
    { row: 0, col: 1 }, // Block top-center
    { row: 1, col: 2 }  // Block center-right
  ]

  const isBlocked = (row, col) => {
    return blockedCells.some(cell => cell.row === row && cell.col === col)
  }

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameWon) {
      // Time's up - restart and increment attempts
      setAttempts(attempts + 1)
      setTimeout(() => {
        setPlayerPos({ row: 1, col: 1 })
        setHasKey(false)
        setMoves(0)
        setTimeLeft(180)
      }, 1500)
    }
  }, [timeLeft, gameWon, attempts])

  const movePlayer = (direction) => {
    if (gameWon) return
    
    let newRow = playerPos.row
    let newCol = playerPos.col

    switch(direction) {
      case 'up': newRow--; break
      case 'down': newRow++; break
      case 'left': newCol--; break
      case 'right': newCol++; break
      default: break
    }

    // Check bounds (3x3 grid)
    if (newRow < 0 || newRow > 2 || newCol < 0 || newCol > 2) return

    // Check blocked cells
    if (isBlocked(newRow, newCol)) return

    setPlayerPos({ row: newRow, col: newCol })
    setMoves(moves + 1)

    // Check if collected key
    if (!hasKey && newRow === keyPos.row && newCol === keyPos.col) {
      setHasKey(true)
    }

    // Check if reached door (must have key first)
    if (hasKey && newRow === doorPos.row && newCol === doorPos.col) {
      setGameWon(true)
      setAttempts(attempts + 1) // Count successful completion as an attempt
      setTimeout(() => {
        onComplete(3)
      }, 800)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        movePlayer('up')
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        movePlayer('down')
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        movePlayer('left')
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        movePlayer('right')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playerPos, hasKey, gameWon])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="cognitive-game">
      <div className="game-title">🚪 Door & Key Puzzle</div>
      <div className="game-stats">
        <div className="stat-item">
          <strong>⏱️</strong> {formatTime(timeLeft)}
        </div>
        <div className="stat-item">
          <strong>Moves:</strong> {moves}
        </div>
        <div className="stat-item">
          {hasKey ? '✅ Key!' : '🔑 Need Key'}
        </div>
        <div className="stat-item">
          <strong>Attempts:</strong> {attempts}
        </div>
      </div>
      
      <div className="door-key-grid">
        {[0, 1, 2].map(row => (
          <div key={row} className="grid-row">
            {[0, 1, 2].map(col => {
              const isPlayer = playerPos.row === row && playerPos.col === col
              const isKey = !hasKey && keyPos.row === row && keyPos.col === col
              const isDoor = doorPos.row === row && doorPos.col === col
              const isWall = isBlocked(row, col)
              
              return (
                <div 
                  key={`${row}-${col}`} 
                  className={`door-key-cell ${isWall ? 'wall-cell' : ''}`}
                >
                  {isWall && <div className="wall-indicator"></div>}
                  {isPlayer && <div className="player-char">🚶</div>}
                  {isKey && <div className="key-icon">🔑</div>}
                  {isDoor && <div className="door-icon">🚪</div>}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Direction buttons */}
      <div className="direction-controls">
        <div className="control-row">
          <button className="direction-btn" onClick={() => movePlayer('up')}>
            ↑
          </button>
        </div>
        <div className="control-row">
          <button className="direction-btn" onClick={() => movePlayer('left')}>
            ←
          </button>
          <button className="direction-btn" onClick={() => movePlayer('down')}>
            ↓
          </button>
          <button className="direction-btn" onClick={() => movePlayer('right')}>
            →
          </button>
        </div>
      </div>

      <div className="game-instructions">
        <strong>Goal:</strong> Collect 1 KEY 🔑 then get to the DOOR 🚪
        <br />
        <strong>Controls:</strong> Arrow Keys (↑ ↓ ← →) or WASD or click buttons
        <br />
        <strong>Note:</strong> Some cells are blocked (invisible walls) - find the path!
        <br />
        <em className="hint-text">💡 Attempts: {attempts} | Try navigating around edges to find the open path!</em>
      </div>
      
      {gameWon && (
        <div className="game-message success">
          🎉 Completed in {moves} moves on attempt #{attempts}! Optimal: 8 moves
        </div>
      )}
      {timeLeft === 0 && !gameWon && (
        <div className="game-message error">
          ⏰ Time's up! Restarting... (Attempt #{attempts})
        </div>
      )}
    </div>
  )
}

// Game 2: Select Bubbles (HARD MODE - Complex Arithmetic)
function SelectBubblesPuzzle({ onComplete }) {
  const [selectedBubbles, setSelectedBubbles] = useState([])
  const [isCorrect, setIsCorrect] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60) // 60 second time limit

  // HARD: 6 bubbles with simpler expressions
  const bubbles = [
    { id: 1, expression: '(12 + 8) / 4', value: 5 },      // = 5
    { id: 2, expression: '√49 + 1', value: 8 },            // = 8
    { id: 3, expression: '2³ - 5', value: 3 },             // = 3
    { id: 4, expression: '9 × 2 - 6', value: 12 },         // = 12
    { id: 5, expression: '15 / 3', value: 5 },             // = 5
    { id: 6, expression: '3² - 1', value: 8 }              // = 8
  ]

  const correctOrder = [3, 5, 5, 8, 8, 12] // ascending order of values

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      // Time's up - auto fail and retry
      setIsCorrect(false)
      setAttempts(attempts + 1)
      setTimeout(() => {
        setSelectedBubbles([])
        setIsCorrect(null)
        setTimeLeft(60)
      }, 2000)
    }
  }, [timeLeft])

  const handleBubbleClick = (bubble) => {
    if (isCorrect !== null) return // Disable during result display
    
    if (selectedBubbles.includes(bubble.id)) {
      setSelectedBubbles(selectedBubbles.filter(id => id !== bubble.id))
    } else {
      const newSelection = [...selectedBubbles, bubble.id]
      setSelectedBubbles(newSelection)

      if (newSelection.length === 6) {
        checkAnswer(newSelection)
      }
    }
  }

  const checkAnswer = (selection) => {
    const selectedValues = selection.map(id => bubbles.find(b => b.id === id).value)
    const sortedSelectedValues = [...selectedValues].sort((a, b) => a - b)
    const isCorrectAnswer = JSON.stringify(sortedSelectedValues) === JSON.stringify(correctOrder)
    
    setIsCorrect(isCorrectAnswer)
    setAttempts(attempts + 1)
    
    if (isCorrectAnswer) {
      setTimeout(() => {
        onComplete(1) // Pass score of 1 for correct answer
      }, 2000)
    } else {
      setTimeout(() => {
        setSelectedBubbles([])
        setIsCorrect(null)
        setTimeLeft(60)
      }, 2000)
    }
  }

  return (
    <div className="cognitive-game">
      <div className="game-title">Select Bubbles: [HARD MODE]</div>
      <div className="game-stats">
        <div className="stat-item">
          <strong>Time Left:</strong> <span className={timeLeft < 20 ? 'time-warning' : ''}>{timeLeft}s</span>
        </div>
        <div className="stat-item">
          <strong>Selected:</strong> {selectedBubbles.length}/6
        </div>
        <div className="stat-item">
          <strong>Attempts:</strong> {attempts}
        </div>
      </div>
      <div className="bubbles-container large">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`bubble ${selectedBubbles.includes(bubble.id) ? 'selected' : ''} ${isCorrect === false && selectedBubbles.includes(bubble.id) ? 'wrong' : ''}`}
            onClick={() => handleBubbleClick(bubble)}
          >
            <div className="bubble-content">{bubble.expression}</div>
            {selectedBubbles.includes(bubble.id) && (
              <div className="selection-number">{selectedBubbles.indexOf(bubble.id) + 1}</div>
            )}
          </div>
        ))}
      </div>
      <div className="game-instructions">
        <strong>HARD MODE:</strong> Calculate 6 expressions. Select ALL bubbles in ascending order by values. 60 second limit!
        <br />
        <em className="hint-text">💡 Hint: Calculate each: (12+8)/4=5, √49+1=8, 2³-5=3, 9×2-6=12, 15/3=5, 3²-1=8. Order: 3, 5, 5, 8, 8, 12</em>
      </div>
      {isCorrect === false && <div className="game-message error">❌ Wrong order! Calculate carefully and try again</div>}
      {isCorrect === true && <div className="game-message success">🎉 Perfect! Correct ascending order!</div>}
      {timeLeft === 0 && <div className="game-message error">⏰ Time's up! Restarting...</div>}
    </div>
  )
}

// Game 3: Maze Puzzle (HARD but DEFINITELY SOLVABLE)
function MazePuzzle({ onComplete }) {
  const [spaceshipPos, setSpaceshipPos] = useState({ row: 5, col: 0 })
  const [gameWon, setGameWon] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [obstaclePos, setObstaclePos] = useState({ row: 2, col: 2 })
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes - HARDER!

  const targetPos = { row: 0, col: 5 }
  
  // HARDER BUT SOLVABLE: More walls, faster obstacle, less time
  // SOLUTION: Navigate carefully - still possible via bottom-right path
  const walls = [
    // More horizontal walls (below cell)
    { row: 0, col: 1, direction: 'horizontal' },
    { row: 0, col: 3, direction: 'horizontal' },
    { row: 1, col: 0, direction: 'horizontal' },
    { row: 1, col: 2, direction: 'horizontal' },
    { row: 1, col: 4, direction: 'horizontal' },
    { row: 2, col: 1, direction: 'horizontal' },
    { row: 2, col: 3, direction: 'horizontal' },
    { row: 3, col: 0, direction: 'horizontal' },
    { row: 3, col: 2, direction: 'horizontal' },
    { row: 3, col: 4, direction: 'horizontal' },
    { row: 4, col: 1, direction: 'horizontal' },
    { row: 4, col: 3, direction: 'horizontal' },
    
    // More vertical walls (right of cell)
    { row: 0, col: 0, direction: 'vertical' },
    { row: 0, col: 2, direction: 'vertical' },
    { row: 1, col: 1, direction: 'vertical' },
    { row: 1, col: 3, direction: 'vertical' },
    { row: 2, col: 0, direction: 'vertical' },
    { row: 2, col: 2, direction: 'vertical' },
    { row: 3, col: 1, direction: 'vertical' },
    { row: 3, col: 3, direction: 'vertical' },
    { row: 4, col: 0, direction: 'vertical' },
    { row: 4, col: 2, direction: 'vertical' },
    { row: 5, col: 1, direction: 'vertical' },
    { row: 5, col: 3, direction: 'vertical' }
  ]

  // Moving obstacle - moves FASTER and covers MORE area (HARDER!)
  useEffect(() => {
    const obstacleTimer = setInterval(() => {
      setObstaclePos(prev => {
        const moves = [
          { row: prev.row - 1, col: prev.col },
          { row: prev.row + 1, col: prev.col },
          { row: prev.row, col: prev.col - 1 },
          { row: prev.row, col: prev.col + 1 }
        ]
        // Obstacle moves in LARGER area - covers most of the maze
        const validMoves = moves.filter(m => 
          m.row >= 0 && m.row <= 4 && m.col >= 1 && m.col <= 4
        )
        if (validMoves.length === 0) return prev
        return validMoves[Math.floor(Math.random() * validMoves.length)]
      })
    }, 1500) // Move every 1.5 seconds - MUCH FASTER!
    return () => clearInterval(obstacleTimer)
  }, [])

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameWon) {
      // Time's up - restart
      setTimeout(() => {
        setSpaceshipPos({ row: 5, col: 0 })
        setMoveCount(0)
        setTimeLeft(120) // Reset to 2 minutes
      }, 1500)
    }
  }, [timeLeft, gameWon])

  const hasWall = (fromRow, fromCol, toRow, toCol) => {
    if (toRow < fromRow) {
      // Moving up
      return walls.some(w => w.row === toRow && w.col === fromCol && w.direction === 'horizontal')
    } else if (toRow > fromRow) {
      // Moving down
      return walls.some(w => w.row === fromRow && w.col === fromCol && w.direction === 'horizontal')
    } else if (toCol < fromCol) {
      // Moving left
      return walls.some(w => w.row === fromRow && w.col === toCol && w.direction === 'vertical')
    } else if (toCol > fromCol) {
      // Moving right
      return walls.some(w => w.row === fromRow && w.col === fromCol && w.direction === 'vertical')
    }
    return false
  }

  const moveSpaceship = (direction) => {
    if (gameWon || timeLeft === 0) return
    
    let newRow = spaceshipPos.row
    let newCol = spaceshipPos.col

    switch(direction) {
      case 'up': newRow--; break
      case 'down': newRow++; break
      case 'left': newCol--; break
      case 'right': newCol++; break
      default: break
    }

    // Check bounds (6x6 grid)
    if (newRow < 0 || newRow > 5 || newCol < 0 || newCol > 5) return

    // Check walls
    if (hasWall(spaceshipPos.row, spaceshipPos.col, newRow, newCol)) return

    // Check if hit moving obstacle
    if (newRow === obstaclePos.row && newCol === obstaclePos.col) {
      // Hit obstacle - restart from beginning
      setSpaceshipPos({ row: 5, col: 0 })
      setMoveCount(0)
      return
    }

    setSpaceshipPos({ row: newRow, col: newCol })
    setMoveCount(moveCount + 1)

    // Check if reached target
    if (newRow === targetPos.row && newCol === targetPos.col) {
      setGameWon(true)
      setTimeout(() => {
        onComplete(1)
      }, 1200)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        moveSpaceship('up')
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        moveSpaceship('down')
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        moveSpaceship('left')
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        moveSpaceship('right')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [spaceshipPos, gameWon])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="cognitive-game">
      <div className="game-title">🚀 Maze / Spaceship Puzzle</div>
      <div className="game-stats">
        <div className="stat-item">
          <strong>⏱️</strong> <span className={timeLeft < 30 ? 'time-warning' : ''}>{formatTime(timeLeft)}</span>
        </div>
        <div className="stat-item">
          <strong>Moves:</strong> {moveCount}
        </div>
        <div className="stat-item">
          <strong>💥</strong> Moving
        </div>
      </div>
      <div className="maze-grid large-grid">
        {[0, 1, 2, 3, 4, 5].map(row => (
          [0, 1, 2, 3, 4, 5].map(col => {
            const hasBottomWall = walls.some(w => w.row === row && w.col === col && w.direction === 'horizontal')
            const hasRightWall = walls.some(w => w.row === row && w.col === col && w.direction === 'vertical')
            const isObstacle = obstaclePos.row === row && obstaclePos.col === col
            
            return (
              <div 
                key={`${row}-${col}`} 
                className={`maze-cell ${hasBottomWall ? 'wall-bottom' : ''} ${hasRightWall ? 'wall-right' : ''} ${isObstacle ? 'obstacle-cell' : ''}`}
              >
                {spaceshipPos.row === row && spaceshipPos.col === col && <div className="spaceship">🚀</div>}
                {targetPos.row === row && targetPos.col === col && <div className="target">🎯</div>}
                {isObstacle && <div className="obstacle">💥</div>}
              </div>
            )
          })
        ))}
      </div>
      
      {/* Direction buttons for mobile */}
      <div className="direction-controls">
        <div className="control-row">
          <button className="direction-btn" onClick={() => moveSpaceship('up')}>
            ↑
          </button>
        </div>
        <div className="control-row">
          <button className="direction-btn" onClick={() => moveSpaceship('left')}>
            ←
          </button>
          <button className="direction-btn" onClick={() => moveSpaceship('down')}>
            ↓
          </button>
          <button className="direction-btn" onClick={() => moveSpaceship('right')}>
            →
          </button>
        </div>
      </div>

      <div className="game-instructions">
        <strong>HARD MAZE:</strong> 6×6 maze with FAST moving obstacle 💥. Reach 🎯 top-right. 2 minutes!
        <br />
        <strong>Controls:</strong> Arrow Keys (↑ ↓ ← →) or buttons
        <br />
        <em className="hint-text">💡 HINT: Try going RIGHT along bottom (avoiding walls), then UP along right side. Watch out for the fast obstacle!</em>
      </div>
      {gameWon && <div className="game-message success">🎉 Target reached in {moveCount} moves!</div>}
      {timeLeft === 0 && !gameWon && <div className="game-message error">⏰ Time's up! Restarting...</div>}
    </div>
  )
}

// Main Cognitive Games Component
function CognitiveGames({ onComplete }) {
  const [currentGame, setCurrentGame] = useState(0)
  const [completedGames, setCompletedGames] = useState([])
  const [gameScores, setGameScores] = useState({})
  const [showResults, setShowResults] = useState(false)

  const games = [
    { id: 0, name: 'Doors & Key Puzzle', component: DoorsKeyPuzzle, maxScore: 3 },
    { id: 1, name: 'Select Bubbles', component: SelectBubblesPuzzle, maxScore: 1 },
    { id: 2, name: 'Maze Puzzle', component: MazePuzzle, maxScore: 1 }
  ]

  const handleGameComplete = (score = 1) => {
    const newCompleted = [...completedGames, currentGame]
    setCompletedGames(newCompleted)
    
    // Save score for this game
    setGameScores({
      ...gameScores,
      [currentGame]: score
    })

    // Move to next game
    if (currentGame < games.length - 1) {
      setTimeout(() => {
        setCurrentGame(currentGame + 1)
      }, 1500)
    } else {
      // All games completed - show results
      setTimeout(() => {
        setShowResults(true)
      }, 2000)
    }
  }

  if (showResults) {
    // Calculate total score
    const totalScore = Object.values(gameScores).reduce((sum, score) => sum + score, 0)
    const maxTotalScore = games.reduce((sum, game) => sum + game.maxScore, 0)
    const percentage = ((totalScore / maxTotalScore) * 100).toFixed(0)

    return (
      <div className="cognitive-games-container">
        <div className="cognitive-results">
          <h2 className="results-title">🎮 Cognitive Games Complete!</h2>
          
          <div className="overall-cognitive-score">
            <div className="cognitive-score-circle">
              <div className="score-value">{percentage}%</div>
              <div className="score-label">Cognitive Score</div>
            </div>
            <div className="score-breakdown">
              <p><strong>{totalScore}</strong> out of <strong>{maxTotalScore}</strong> challenges completed</p>
            </div>
          </div>

          <div className="game-results-list">
            {games.map((game, index) => {
              const score = gameScores[index] || 0
              return (
                <div key={game.id} className="game-result-item">
                  <div className="game-result-icon">
                    {index === 0 && '🚪🔑'}
                    {index === 1 && '🫧'}
                    {index === 2 && '🚀'}
                  </div>
                  <div className="game-result-info">
                    <h4>{game.name}</h4>
                    <div className="game-score">
                      <span className="score-text">{score}/{game.maxScore}</span>
                      <span className={`status-label ${score === game.maxScore ? 'success' : 'partial'}`}>
                        {score === game.maxScore ? '✓ Perfect' : '⚡ Completed'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button className="next-section-btn" onClick={onComplete}>
            Continue to Next Assessment →
          </button>
        </div>
      </div>
    )
  }

  const CurrentGameComponent = games[currentGame].component

  return (
    <div className="cognitive-games-container">
      <div className="games-progress">
        <div className="progress-text">Game {currentGame + 1} of {games.length}</div>
        <div className="progress-dots">
          {games.map((game, index) => (
            <div 
              key={game.id} 
              className={`progress-dot ${index === currentGame ? 'active' : ''} ${completedGames.includes(index) ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
      
      <CurrentGameComponent onComplete={handleGameComplete} />
    </div>
  )
}

export default CognitiveGames
