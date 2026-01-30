<template>
  <div class="game-view">
    <div class="container">
      <header class="game-header">
        <button @click="goHome" class="back-btn">
          ← 返回
        </button>
        <h1 class="game-title">2048</h1>
      </header>
      
      <ScoreBoard />
      
      <GameBoard />
      
      <GameControls />
      
      <MobileControls />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { Direction } from '@/types/game'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameBoard from '@/components/GameBoard.vue'
import GameControls from '@/components/GameControls.vue'
import MobileControls from '@/components/MobileControls.vue'

const router = useRouter()
const gameStore = useGameStore()

function goHome() {
  router.push('/')
}

// 键盘事件处理
function handleKeyPress(event: KeyboardEvent) {
  if (gameStore.isGameOver && !gameStore.isWin) return
  
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      event.preventDefault()
      gameStore.makeMove(Direction.UP)
      break
    case 'ArrowDown':
    case 's':
    case 'S':
      event.preventDefault()
      gameStore.makeMove(Direction.DOWN)
      break
    case 'ArrowLeft':
    case 'a':
    case 'A':
      event.preventDefault()
      gameStore.makeMove(Direction.LEFT)
      break
    case 'ArrowRight':
    case 'd':
    case 'D':
      event.preventDefault()
      gameStore.makeMove(Direction.RIGHT)
      break
    case 'r':
    case 'R':
      if (event.ctrlKey || event.metaKey) return
      event.preventDefault()
      gameStore.resetGame()
      break
    case 'z':
    case 'Z':
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault()
        gameStore.undo()
      }
      break
  }
}

// 触摸事件处理
let startX = 0
let startY = 0

function handleTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  startX = touch.clientX
  startY = touch.clientY
}

function handleTouchEnd(event: TouchEvent) {
  if (gameStore.isGameOver && !gameStore.isWin) return
  
  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - startX
  const deltaY = touch.clientY - startY
  const minDistance = 50
  
  if (Math.abs(deltaX) < minDistance && Math.abs(deltaY) < minDistance) {
    return
  }
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // 水平滑动
    if (deltaX > 0) {
      gameStore.makeMove(Direction.RIGHT)
    } else {
      gameStore.makeMove(Direction.LEFT)
    }
  } else {
    // 垂直滑动
    if (deltaY > 0) {
      gameStore.makeMove(Direction.DOWN)
    } else {
      gameStore.makeMove(Direction.UP)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  max-width: 500px;
  width: 100%;
}

.game-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

.game-title {
  flex: 1;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .game-title {
    font-size: 2rem;
  }
  
  .back-btn {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .game-title {
    font-size: 1.8rem;
  }
}
</style>