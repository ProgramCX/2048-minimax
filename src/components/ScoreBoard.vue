<template>
  <div class="score-board">
    <div class="score-card">
      <div class="score-label">分数</div>
      <div class="score-value">{{ score }}</div>
    </div>
    
    <div class="score-card">
      <div class="score-label">最佳</div>
      <div class="score-value">{{ bestScore }}</div>
    </div>
    
    <div class="score-card">
      <div class="score-label">步数</div>
      <div class="score-value">{{ moves }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
const score = computed(() => gameStore.score)
const bestScore = computed(() => gameStore.bestScore)
const moves = computed(() => gameStore.moves)
</script>

<style scoped>
.score-board {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.score-card {
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  text-align: center;
  min-width: 100px;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  transition: transform 0.3s ease;
}

.score-card:hover {
  transform: translateY(-2px);
}

.score-label {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
  margin-bottom: 5px;
}

.score-value {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

@media (max-width: 768px) {
  .score-board {
    gap: 15px;
  }
  
  .score-card {
    padding: 12px 20px;
    min-width: 80px;
  }
  
  .score-label {
    font-size: 11px;
  }
  
  .score-value {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .score-board {
    gap: 10px;
  }
  
  .score-card {
    padding: 10px 15px;
    min-width: 70px;
  }
  
  .score-value {
    font-size: 18px;
  }
}
</style>