<template>
  <div class="game-board">
    <div class="board-container">
      <div class="board">
        <div 
          v-for="(row, rowIndex) in currentBoard" 
          :key="rowIndex" 
          class="board-row"
        >
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex" 
            class="board-cell"
            :class="getCellClass(cell)"
          >
            <span v-if="cell !== 0" class="cell-value">{{ cell }}</span>
          </div>
        </div>
      </div>
      
      <!-- 游戏结束提示 -->
      <div v-if="isGameOver" class="game-overlay">
        <div class="overlay-content">
          <h2 class="overlay-title">游戏结束</h2>
          <p class="overlay-message">无法再移动了！</p>
          <button @click="resetGame" class="btn btn-primary">重新开始</button>
        </div>
      </div>
      
      <!-- 获胜提示 -->
      <div v-if="isWin" class="game-overlay">
        <div class="overlay-content">
          <h2 class="overlay-title victory">祝贺！</h2>
          <p class="overlay-message">你达到了 {{ targetTile }}！</p>
          <div class="overlay-buttons">
            <button @click="continueGame" class="btn btn-secondary">继续游戏</button>
            <button @click="resetGame" class="btn btn-primary">新游戏</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
const currentBoard = computed(() => gameStore.currentBoard)
const isGameOver = computed(() => gameStore.isGameOver)
const isWin = computed(() => gameStore.isWin)
const targetTile = computed(() => 2048)

function resetGame() {
  gameStore.resetGame()
}

function continueGame() {
  gameStore.continueGame()
}

function getCellClass(value: number): string {
  if (value === 0) return 'cell-empty'
  
  const classMap: { [key: number]: string } = {
    2: 'cell-2',
    4: 'cell-4',
    8: 'cell-8',
    16: 'cell-16',
    32: 'cell-32',
    64: 'cell-64',
    128: 'cell-128',
    256: 'cell-256',
    512: 'cell-512',
    1024: 'cell-1024',
    2048: 'cell-2048'
  }
  
  return classMap[value] || 'cell-super'
}
</script>

<style scoped>
.game-board {
  position: relative;
  margin: 0 auto;
}

.board-container {
  position: relative;
  display: inline-block;
}

.board {
  background: #bbada0;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-row {
  display: flex;
  margin-bottom: 10px;
}

.board-row:last-child {
  margin-bottom: 0;
}

.board-cell {
  width: 80px;
  height: 80px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
  font-size: 24px;
  transition: all 0.3s ease;
}

.board-cell:last-child {
  margin-right: 0;
}

/* 空格子 */
.cell-empty {
  background: rgba(238, 228, 218, 0.35);
}

/* 数字格子 */
.cell-2 {
  background: #eee4da;
  color: #776e65;
}

.cell-4 {
  background: #ede0c8;
  color: #776e65;
}

.cell-8 {
  background: #f2b179;
  color: #f9f6f2;
}

.cell-16 {
  background: #f59563;
  color: #f9f6f2;
}

.cell-32 {
  background: #f67c5f;
  color: #f9f6f2;
}

.cell-64 {
  background: #f65e3b;
  color: #f9f6f2;
}

.cell-128 {
  background: #edcf72;
  color: #f9f6f2;
}

.cell-256 {
  background: #edcc61;
  color: #f9f6f2;
}

.cell-512 {
  background: #edc850;
  color: #f9f6f2;
}

.cell-1024 {
  background: #edc53f;
  color: #f9f6f2;
  font-size: 20px;
}

.cell-2048 {
  background: #edc22e;
  color: #f9f6f2;
  font-size: 20px;
}

.cell-super {
  background: #3c3a32;
  color: #f9f6f2;
  font-size: 18px;
}

/* 游戏覆盖层 */
.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  z-index: 10;
}

.overlay-content {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
}

.overlay-title {
  margin: 0 0 10px 0;
  font-size: 28px;
  color: #333;
}

.overlay-title.victory {
  color: #edc22e;
  font-size: 32px;
}

.overlay-message {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #666;
}

.overlay-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #8f7a66;
  color: white;
}

.btn-primary:hover {
  background: #9f8a76;
}

.btn-secondary {
  background: #eee4da;
  color: #776e65;
}

.btn-secondary:hover {
  background: #f3e9d7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .board-cell {
    width: 60px;
    height: 60px;
    font-size: 18px;
  }
  
  .cell-1024,
  .cell-2048 {
    font-size: 16px;
  }
  
  .cell-super {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .board-cell {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }
  
  .cell-1024,
  .cell-2048,
  .cell-super {
    font-size: 12px;
  }
}
</style>