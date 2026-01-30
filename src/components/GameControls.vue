<template>
  <div class="game-controls">
    <button 
      @click="resetGame" 
      class="control-btn primary"
      :disabled="isGameOver && !isWin"
    >
      🔄 新游戏
    </button>
    
    <button 
      @click="undo" 
      class="control-btn secondary"
      :disabled="!canUndo"
    >
      ↩️ 撤销
    </button>
    
    <div class="instructions">
      <p>使用方向键或 WASD 键移动</p>
      <p>在手机上可以滑动屏幕</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
const isGameOver = computed(() => gameStore.isGameOver)
const isWin = computed(() => gameStore.isWin)
const canUndo = computed(() => gameStore.canUndo)

function resetGame() {
  gameStore.resetGame()
}

function undo() {
  gameStore.undo()
}
</script>

<style scoped>
.game-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

.control-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.control-btn.primary {
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
}

.control-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.control-btn.secondary {
  background: #eee4da;
  color: #776e65;
}

.control-btn.secondary:hover:not(:disabled) {
  background: #f3e9d7;
  transform: translateY(-1px);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.instructions {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}

.instructions p {
  margin: 5px 0;
}

@media (max-width: 768px) {
  .control-btn {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 100px;
  }
  
  .instructions {
    font-size: 13px;
  }
}
</style>