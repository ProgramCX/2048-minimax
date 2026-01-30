<template>
  <div class="game-controls">
    <div class="game-info">
      <p class="game-description">
        合并数字方块，达到 <strong class="target-tile">2048</strong> 方块获胜！
      </p>
    </div>
    <div class="control-buttons">
      <button class="control-btn primary" @click="$emit('newGame')">
        <span class="btn-icon">🎮</span>
        新游戏
      </button>
      <button class="control-btn secondary" @click="$emit('undo')" :disabled="!canUndo">
        <span class="btn-icon">↶</span>
        撤销
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  canUndo?: boolean;
}

withDefaults(defineProps<Props>(), {
  canUndo: false,
});

defineEmits<{
  newGame: [];
  undo: [];
}>();
</script>

<style scoped>
.game-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.game-info {
  flex: 1;
  min-width: 200px;
}

.game-description {
  color: #ffffff;
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.target-tile {
  background: linear-gradient(135deg, #FF6B35, #FF3838);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

.control-buttons {
  display: flex;
  gap: 10px;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.control-btn.primary {
  background: linear-gradient(135deg, #FF6B35, #FF3838);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

.control-btn.secondary {
  background: rgba(255, 107, 53, 0.1);
  color: #FF8E53;
  border: 1px solid rgba(255, 107, 53, 0.3);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.2);
}

.control-btn.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.control-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.control-btn:hover::before {
  left: 100%;
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

.btn-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .game-controls {
    flex-direction: column;
    text-align: center;
  }
  
  .control-buttons {
    width: 100%;
    justify-content: center;
  }
  
  .control-btn {
    flex: 1;
    max-width: 120px;
  }
}
</style>