<template>
  <div class="game-view">
    <div class="game-header">
      <router-link to="/" class="back-btn">← Back to Home</router-link>
      <h1 class="game-title">2048 Game</h1>
      <div class="game-stats">
        <div class="stat">
          <span class="stat-label">Score</span>
          <span class="stat-value">{{ gameStore.score }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Best</span>
          <span class="stat-value">{{ gameStore.bestScore }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Moves</span>
          <span class="stat-value">{{ gameStore.moves }}</span>
        </div>
      </div>
    </div>
    
    <div class="game-container">
      <div class="game-board-wrapper">
        <div class="game-board" :class="{ 'game-over': gameStore.isGameOver, 'won': gameStore.isWon }">
          <div 
            v-for="(row, rowIndex) in gameStore.board" 
            :key="`row-${rowIndex}`"
            class="board-row"
          >
            <div
              v-for="(tile, colIndex) in row" 
              :key="`tile-${rowIndex}-${colIndex}`"
              class="tile" 
              :class="{ 'tile-empty': !tile, 'tile-with-value': tile }"
              :style="getTileStyle(rowIndex, colIndex)"
            >
              <div 
                v-if="tile" 
                class="tile-inner"
                :class="`tile-${tile.value}`"
              >
                {{ tile.value }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Game Status Overlay -->
        <div v-if="gameStore.isGameOver || (gameStore.isWon && !gameStore.isPlayingAfterWin)" 
             class="game-overlay">
          <div class="overlay-content">
            <h2 v-if="gameStore.isGameOver" class="overlay-title">Game Over!</h2>
            <h2 v-else class="overlay-title">You Won!</h2>
            <p class="overlay-text">
              Final Score: {{ gameStore.score }}
            </p>
            <p class="overlay-text">
              Total Moves: {{ gameStore.moves }}
            </p>
            <div class="overlay-buttons">
              <button @click="restartGame" class="btn btn-primary">
                New Game
              </button>
              <button v-if="gameStore.isWon && !gameStore.isPlayingAfterWin" 
                      @click="continueGame" class="btn btn-secondary">
                Continue Playing
              </button>
              <router-link to="/" class="btn btn-tertiary">
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="game-controls">
        <h3>Controls</h3>
        <div class="controls-info">
          <p>Use arrow keys or WASD to move tiles</p>
          <p>Touch and swipe on mobile devices</p>
        </div>
        
        <div class="control-buttons">
          <button @click="makeMove('up')" class="control-btn" :disabled="!gameStore.canMakeMove">
            ↑
          </button>
          <div class="control-row">
            <button @click="makeMove('left')" class="control-btn" :disabled="!gameStore.canMakeMove">
              ←
            </button>
            <button @click="makeMove('right')" class="control-btn" :disabled="!gameStore.canMakeMove">
              →
            </button>
          </div>
          <button @click="makeMove('down')" class="control-btn" :disabled="!gameStore.canMakeMove">
            ↓
          </button>
        </div>
        
        <div class="game-actions">
          <button @click="restartGame" class="btn btn-outline">
            Restart Game
          </button>
          <button @click="saveGame" class="btn btn-outline">
            Save Progress
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Touch Instructions -->
    <div class="mobile-instructions">
      <p>💡 <strong>Tip:</strong> Swipe in any direction to move tiles on mobile devices!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../stores/gameStore';
import type { Direction } from '../types/game';

const gameStore = useGameStore();

onMounted(() => {
  // 确保游戏已初始化
  if (gameStore.score === 0 && gameStore.moves === 0) {
    gameStore.initializeGame();
  }
  
  // 添加键盘事件监听器
  window.addEventListener('keydown', handleKeydown);
  
  // 添加触摸事件监听器
  let startX = 0;
  let startY = 0;
  
  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平滑动
      if (Math.abs(deltaX) > minSwipeDistance) {
        makeMove(deltaX > 0 ? 'right' : 'left');
      }
    } else {
      // 垂直滑动
      if (Math.abs(deltaY) > minSwipeDistance) {
        makeMove(deltaY > 0 ? 'down' : 'up');
      }
    }
    
    startX = 0;
    startY = 0;
  };
  
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);
  
  // 清理函数
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
  });
});

const handleKeydown = (e: KeyboardEvent) => {
  if (!gameStore.canMakeMove) return;
  
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      e.preventDefault();
      makeMove('up');
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      e.preventDefault();
      makeMove('down');
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      e.preventDefault();
      makeMove('left');
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      e.preventDefault();
      makeMove('right');
      break;
  }
};

const makeMove = (direction: Direction) => {
  if (gameStore.canMakeMove) {
    gameStore.makeMove(direction);
  }
};

const restartGame = () => {
  if (confirm('Are you sure you want to start a new game? Your current progress will be lost.')) {
    gameStore.resetGame();
  }
};

const continueGame = () => {
  gameStore.continueAfterWin();
};

const saveGame = () => {
  // 保存游戏状态到localStorage
  localStorage.setItem('2048-saved-game', JSON.stringify({
    board: gameStore.board,
    score: gameStore.score,
    bestScore: gameStore.bestScore,
    isGameOver: gameStore.isGameOver,
    isWon: gameStore.isWon,
    moves: gameStore.moves,
    isPlayingAfterWin: gameStore.isPlayingAfterWin,
  }));
  
  alert('Game saved successfully!');
};

const getTileStyle = (rowIndex: number, colIndex: number) => {
  const tile = gameStore.board[rowIndex][colIndex];
  if (!tile) return {};
  
  return {
    backgroundColor: gameStore.getTileColor(rowIndex, colIndex),
    color: gameStore.getTileTextColor(rowIndex, colIndex),
  };
};
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  background: #faf8ef;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
}

.back-btn {
  color: #8f7a66;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #f0f0f0;
}

.game-title {
  color: #776e65;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.game-stats {
  display: flex;
  gap: 15px;
}

.stat {
  background: #bbada0;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  text-align: center;
  min-width: 70px;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

.game-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  max-width: 800px;
  width: 100%;
}

.game-board-wrapper {
  position: relative;
}

.game-board {
  background: #bbada0;
  border-radius: 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 15px;
  width: 400px;
  height: 400px;
}

.board-row {
  display: contents;
}

.tile {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  background: #cdc1b4;
}

.tile-with-value {
  background: #eee4da;
}

.tile-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  font-weight: bold;
}

.tile-2 { background: #eee4da; color: #776e65; }
.tile-4 { background: #ede0c8; color: #776e65; }
.tile-8 { background: #f2b179; color: #f9f6f2; }
.tile-16 { background: #f59563; color: #f9f6f2; }
.tile-32 { background: #f67c5f; color: #f9f6f2; }
.tile-64 { background: #f65e3b; color: #f9f6f2; }
.tile-128 { background: #edcf72; color: #f9f6f2; font-size: 1.3rem; }
.tile-256 { background: #edcc61; color: #f9f6f2; font-size: 1.3rem; }
.tile-512 { background: #edc850; color: #f9f6f2; font-size: 1.3rem; }
.tile-1024 { background: #edc53f; color: #f9f6f2; font-size: 1.1rem; }
.tile-2048 { background: #edc22e; color: #f9f6f2; font-size: 1.1rem; }

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(238, 228, 218, 0.73);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.overlay-content {
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.overlay-title {
  color: #776e65;
  font-size: 2.5rem;
  margin: 0 0 20px 0;
  font-weight: bold;
}

.overlay-text {
  color: #8f7a66;
  font-size: 1.2rem;
  margin: 10px 0;
}

.overlay-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 25px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #8f7a66;
  color: white;
}

.btn-primary:hover {
  background: #9f8a76;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #edc22e;
  color: #f9f6f2;
}

.btn-secondary:hover {
  background: #edc53f;
  transform: translateY(-2px);
}

.btn-tertiary {
  background: transparent;
  color: #8f7a66;
  border: 2px solid #8f7a66;
}

.btn-tertiary:hover {
  background: #8f7a66;
  color: white;
}

.game-controls {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

.game-controls h3 {
  color: #776e65;
  margin: 0 0 15px 0;
  text-align: center;
}

.controls-info {
  text-align: center;
  margin-bottom: 20px;
}

.controls-info p {
  color: #8f7a66;
  margin: 5px 0;
  font-size: 0.9rem;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.control-row {
  display: flex;
  gap: 10px;
}

.control-btn {
  width: 50px;
  height: 50px;
  background: #8f7a66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  background: #9f8a76;
  transform: translateY(-2px);
}

.control-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.game-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-outline {
  background: transparent;
  color: #8f7a66;
  border: 2px solid #8f7a66;
  padding: 10px 20px;
}

.btn-outline:hover {
  background: #8f7a66;
  color: white;
}

.mobile-instructions {
  margin-top: 20px;
  text-align: center;
  color: #8f7a66;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .game-view {
    padding: 10px;
  }
  
  .game-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .game-container {
    flex-direction: column;
    align-items: center;
  }
  
  .game-board {
    width: 320px;
    height: 320px;
    gap: 10px;
    padding: 10px;
  }
  
  .tile {
    font-size: 1.2rem;
  }
  
  .tile-128, .tile-256, .tile-512 {
    font-size: 1rem;
  }
  
  .tile-1024, .tile-2048 {
    font-size: 0.9rem;
  }
  
  .overlay-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>