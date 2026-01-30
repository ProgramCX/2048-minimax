<template>
  <div class="game-container">
    <!-- 游戏头部 -->
    <div class="game-header">
      <div class="title">
        <h1>2048</h1>
        <div class="subtitle">现代化拼图游戏</div>
      </div>
      
      <ScoreBoard :score="score" :best-score="bestScore" />
    </div>

    <!-- 游戏控制 -->
    <GameControls 
      @new-game="resetGame"
      @undo="undoLastMove"
      :can-undo="canUndo"
    />

    <!-- 游戏板 -->
    <div class="game-board-wrapper">
      <div class="game-board" :class="{ 'game-won': isWon && !isPlayingAfterWin }">
        <div class="board-container">
          <!-- 背景网格 -->
          <div class="grid">
            <div 
              v-for="i in 16" 
              :key="i" 
              class="grid-cell"
            ></div>
          </div>
          
          <!-- 方块 -->
          <div class="tile-container">
            <div
              v-for="(row, rowIndex) in board"
              :key="`row-${rowIndex}`"
              class="tile-row"
            >
              <div
                v-for="(tile, colIndex) in row"
                :key="`tile-${rowIndex}-${colIndex}`"
                class="tile"
                :class="{
                  'tile-new': tile?.isNew,
                  'tile-merged': tile?.isMerged,
                  [`tile-value-${tile?.value}`]: tile?.value
                }"
                :style="getTileStyle(rowIndex, colIndex)"
              >
                <div v-if="tile" class="tile-inner">
                  <div class="tile-value">{{ tile.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 游戏状态指示器 -->
        <div class="game-status">
          <div v-if="isWon && !isPlayingAfterWin" class="status-badge won">
            🎉 胜利！
          </div>
          <div v-if="isGameOver" class="status-badge game-over">
            💥 结束
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端控制 -->
    <MobileControls 
      :can-move="canMakeMove"
      :move-count="moves"
      @move="makeMove"
    />

    <!-- 胜利弹窗 -->
    <div v-if="isWon && !isPlayingAfterWin" class="message-container">
      <div class="message">
        <div class="message-icon">🏆</div>
        <div class="message-title">恭喜获胜！</div>
        <div class="message-subtitle">您达到了 2048 方块！</div>
        <div class="message-stats">
          <div class="stat-item">
            <span class="stat-label">最终得分</span>
            <span class="stat-value">{{ score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">移动步数</span>
            <span class="stat-value">{{ moves }}</span>
          </div>
        </div>
        <div class="message-buttons">
          <button class="continue-button" @click="continueAfterWin">
            <span class="btn-icon">🎯</span>
            继续挑战
          </button>
          <button class="restart-button" @click="resetGame">
            <span class="btn-icon">🔄</span>
            重新开始
          </button>
        </div>
      </div>
    </div>

    <!-- 游戏结束弹窗 -->
    <div v-if="isGameOver" class="message-container">
      <div class="message">
        <div class="message-icon">💔</div>
        <div class="message-title">游戏结束</div>
        <div class="message-subtitle">没有更多可移动的空间</div>
        <div class="message-stats">
          <div class="stat-item">
            <span class="stat-label">最终得分</span>
            <span class="stat-value">{{ score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最高得分</span>
            <span class="stat-value">{{ bestScore }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">移动步数</span>
            <span class="stat-value">{{ moves }}</span>
          </div>
        </div>
        <div class="message-buttons">
          <button class="restart-button" @click="resetGame">
            <span class="btn-icon">🔄</span>
            再试一次
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { Direction } from '../types/game';
import ScoreBoard from '../components/ScoreBoard.vue';
import GameControls from '../components/GameControls.vue';
import MobileControls from '../components/MobileControls.vue';

const gameStore = useGameStore();

const {
  board,
  score,
  bestScore,
  isGameOver,
  isWon,
  isPlayingAfterWin,
  moves,
  canMakeMove,
  makeMove,
  resetGame,
  continueAfterWin,
  getTileValue,
  getTileColor,
  getTileTextColor,
} = gameStore;

// 计算属性
const canUndo = computed(() => {
  // 这里可以添加撤销逻辑
  return false;
});

// 方法
const undoLastMove = () => {
  // 实现撤销逻辑
  console.log('撤销功能待实现');
};

// 获取方块样式
const getTileStyle = (row: number, col: number) => {
  const backgroundColor = getTileColor(row, col);
  const textColor = getTileTextColor(row, col);
  
  return {
    backgroundColor,
    color: textColor,
  };
};

// 处理键盘输入
const handleKeyPress = (event: KeyboardEvent) => {
  const keyMap: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
    W: 'up',
    S: 'down',
    A: 'left',
    D: 'right',
  };

  const direction = keyMap[event.key];
  if (direction) {
    event.preventDefault();
    makeMove(direction);
  }
};

// 处理触摸手势（简单实现）
let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
};

const handleTouchEnd = (event: TouchEvent) => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
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
};

// 组件挂载时添加事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchend', handleTouchEnd);
});
</script>

<style scoped>
/* 现代化橙色-红色主题样式 */
.game-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 50%, #1a1a1a 100%);
  min-height: 100vh;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(255, 107, 53, 0.3);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title h1 {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(135deg, #FF6B35, #FF3838);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}

.subtitle {
  font-size: 14px;
  color: #FF8E53;
  margin-top: 5px;
  opacity: 0.8;
}





.game-board-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.game-board {
  position: relative;
  background: rgba(255, 107, 53, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
}

.game-status {
  position: absolute;
  top: -10px;
  right: 10px;
  z-index: 10;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: statusPulse 2s ease-in-out infinite;
}

.status-badge.won {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.9));
  color: white;
}

.status-badge.game-over {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.9), rgba(255, 56, 56, 0.9));
  color: white;
}

@keyframes statusPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.game-won {
  box-shadow: 0 0 0 3px #FFD700 inset, 0 0 25px rgba(255, 215, 0, 0.5);
  animation: goldenGlow 2s ease-in-out infinite alternate;
}

.board-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 15px;
  width: 100%;
  height: 100%;
}

.grid-cell {
  background: rgba(45, 27, 27, 0.8);
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tile-container {
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
}

.tile-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  gap: 15px;
  height: calc((100% - 45px) / 4);
  margin-bottom: 15px;
}

.tile-row:last-child {
  margin-bottom: 0;
}

.tile {
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: clamp(16px, 4vw, 32px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tile-inner {
  text-align: center;
  z-index: 2;
  position: relative;
}

.tile-value {
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tile-new {
  animation: tile-appear 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tile-merged {
  animation: tile-merge 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 高数值方块的特殊效果 */
.tile-value-128,
.tile-value-256,
.tile-value-512,
.tile-value-1024 {
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
}

.tile-value-2048 {
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
  animation: goldenGlow 2s ease-in-out infinite alternate;
}

@keyframes tile-appear {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(180deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1) rotate(90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes tile-merge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.8);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes goldenGlow {
  0% {
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 35px rgba(255, 215, 0, 1), 0 0 50px rgba(255, 215, 0, 0.5);
  }
}



.message-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.message {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 56, 56, 0.1));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 53, 0.3);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 350px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(255, 107, 53, 0.4);
  animation: messageBounce 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes messageBounce {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-50px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.message-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: iconBounce 2s ease-in-out infinite;
}

.message-title {
  font-size: 36px;
  font-weight: bold;
  background: linear-gradient(135deg, #FF6B35, #FF3838);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}

@keyframes iconBounce {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
}

.message-subtitle {
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 25px;
  opacity: 0.9;
}

.message-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 107, 53, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 107, 53, 0.2);
}

.stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-label {
  font-size: 12px;
  color: #FF8E53;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.message-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.continue-button {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.continue-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.continue-button:hover::before {
  left: 100%;
}

.continue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
}

.restart-button {
  background: linear-gradient(135deg, #FF6B35, #FF3838);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.restart-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.restart-button:hover::before {
  left: 100%;
}

.restart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .game-container {
    padding: 10px;
  }
  
  .game-header {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .title h1 {
    font-size: 36px;
  }
  
  .title .subtitle {
    font-size: 12px;
  }
  
  .tile {
    font-size: clamp(12px, 3vw, 20px);
  }
  
  .message-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .stat-item {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .scores {
    flex-direction: column;
    width: 100%;
  }
  
  .score-container,
  .best-container {
    flex: 1;
  }
}
</style>