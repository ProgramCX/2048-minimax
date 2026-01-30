<template>
  <div class="home-view">
    <div class="home-content">
      <h1 class="title">2048</h1>
      <p class="subtitle">Join the numbers and get to the 2048 tile!</p>
      
      <div class="game-info">
        <div class="score-board">
          <div class="score-item">
            <div class="score-label">Score</div>
            <div class="score-value">{{ gameStore.score }}</div>
          </div>
          <div class="score-item">
            <div class="score-label">Best</div>
            <div class="score-value">{{ gameStore.bestScore }}</div>
          </div>
        </div>
        
        <div class="moves-info">
          <div class="moves-label">Moves</div>
          <div class="moves-value">{{ gameStore.moves }}</div>
        </div>
      </div>
      
      <div class="controls">
        <button @click="startNewGame" class="btn btn-primary">
          New Game
        </button>
        <router-link to="/game" class="btn btn-secondary">
          Continue Game
        </router-link>
      </div>
      
      <div class="instructions">
        <h3>How to play:</h3>
        <p>Use your <strong>arrow keys</strong> to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach <strong>2048</strong>!</p>
      </div>
      
      <div class="game-stats" v-if="gameStore.score > 0">
        <h3>Current Game Stats</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Game Status:</span>
            <span class="stat-value" :class="gameStatusClass">
              {{ gameStatus }}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Empty Cells:</span>
            <span class="stat-value">{{ emptyCells }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Can Move:</span>
            <span class="stat-value" :class="{ 'can-move': gameStore.canMakeMove, 'cannot-move': !gameStore.canMakeMove }">
              {{ gameStore.canMakeMove ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore';

const router = useRouter();
const gameStore = useGameStore();

onMounted(() => {
  // 初始化游戏（如果需要）
  if (gameStore.score === 0 && gameStore.moves === 0) {
    gameStore.initializeGame();
  }
});

const startNewGame = () => {
  gameStore.resetGame();
  router.push('/game');
};

const gameStatus = computed(() => {
  if (gameStore.isGameOver) return 'Game Over';
  if (gameStore.isWon && !gameStore.isPlayingAfterWin) return 'You Won!';
  return 'Playing';
});

const gameStatusClass = computed(() => {
  if (gameStore.isGameOver) return 'game-over';
  if (gameStore.isWon && !gameStore.isPlayingAfterWin) return 'won';
  return 'playing';
});

const emptyCells = computed(() => {
  return gameStore.hasEmptyCells ? 'Available' : 'None';
});
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.home-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: #776e65;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: #8f7a66;
  margin: 0 0 30px 0;
}

.game-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.score-board {
  display: flex;
  gap: 20px;
}

.score-item {
  background: #bbada0;
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
  min-width: 80px;
}

.score-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.moves-info {
  background: #bbada0;
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
  min-width: 80px;
}

.moves-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
}

.moves-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
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
  text-transform: uppercase;
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
  background: transparent;
  color: #8f7a66;
  border: 2px solid #8f7a66;
}

.btn-secondary:hover {
  background: #8f7a66;
  color: white;
  transform: translateY(-2px);
}

.instructions {
  background: #f8f5f0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: left;
}

.instructions h3 {
  color: #776e65;
  margin: 0 0 10px 0;
}

.instructions p {
  color: #8f7a66;
  line-height: 1.6;
  margin: 0;
}

.game-stats {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.game-stats h3 {
  color: #776e65;
  margin: 0 0 15px 0;
  text-align: center;
}

.stats-grid {
  display: grid;
  gap: 10px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: bold;
  color: #776e65;
}

.stat-value {
  font-weight: bold;
  color: #8f7a66;
}

.stat-value.game-over {
  color: #d32f2f;
}

.stat-value.won {
  color: #388e3c;
}

.stat-value.playing {
  color: #1976d2;
}

.stat-value.can-move {
  color: #388e3c;
}

.stat-value.cannot-move {
  color: #d32f2f;
}

@media (max-width: 768px) {
  .home-content {
    padding: 20px;
  }
  
  .title {
    font-size: 3rem;
  }
  
  .game-info {
    flex-direction: column;
    gap: 15px;
  }
  
  .score-board {
    justify-content: center;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>