<template>
  <div class="score-board">
    <div class="score-container" :class="{ 'score-updated': isScoreUpdated }">
      <div class="score-label">SCORE</div>
      <div class="score-value">{{ score }}</div>
    </div>
    <div class="best-container">
      <div class="best-label">BEST</div>
      <div class="best-value">{{ bestScore }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  score: number;
  bestScore: number;
}

const props = defineProps<Props>();

const isScoreUpdated = ref(false);

watch(() => props.score, (newScore, oldScore) => {
  if (newScore > oldScore) {
    isScoreUpdated.value = true;
    setTimeout(() => {
      isScoreUpdated.value = false;
    }, 600);
  }
});
</script>

<style scoped>
.score-board {
  display: flex;
  gap: 10px;
}

.score-container,
.best-container {
  background: rgba(255, 107, 53, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 53, 0.3);
  padding: 10px 15px;
  border-radius: 12px;
  text-align: center;
  min-width: 80px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.score-container:hover,
.best-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

.score-container.score-updated {
  animation: scorePulse 0.6s ease-in-out;
}

.score-label,
.best-label {
  font-size: 12px;
  color: #FF8E53;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

.score-value,
.best-value {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes scorePulse {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.8);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  }
}

@media (max-width: 480px) {
  .score-board {
    flex-direction: column;
    width: 100%;
  }
  
  .score-container,
  .best-container {
    flex: 1;
  }
}
</style>