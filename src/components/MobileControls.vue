<template>
  <div class="mobile-controls">
    <div class="control-grid">
      <!-- 第一行 -->
      <div></div>
      <button @click="moveUp" class="control-btn" :disabled="isGameOver">
        ↑
      </button>
      <div></div>
      
      <!-- 第二行 -->
      <button @click="moveLeft" class="control-btn" :disabled="isGameOver">
        ←
      </button>
      <div></div>
      <button @click="moveRight" class="control-btn" :disabled="isGameOver">
        →
      </button>
      
      <!-- 第三行 -->
      <div></div>
      <button @click="moveDown" class="control-btn" :disabled="isGameOver">
        ↓
      </button>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { Direction } from '@/types/game'

const gameStore = useGameStore()
const isGameOver = computed(() => gameStore.isGameOver)

function moveUp() {
  gameStore.makeMove(Direction.UP)
}

function moveDown() {
  gameStore.makeMove(Direction.DOWN)
}

function moveLeft() {
  gameStore.makeMove(Direction.LEFT)
}

function moveRight() {
  gameStore.makeMove(Direction.RIGHT)
}
</script>

<style scoped>
.mobile-controls {
  display: none;
  margin-top: 30px;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 200px;
  margin: 0 auto;
}

.control-btn {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.control-btn:active {
  transform: translateY(0);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 只在移动设备上显示 */
@media (max-width: 768px) {
  .mobile-controls {
    display: block;
  }
}
</style>