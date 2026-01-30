<template>
  <div class="mobile-controls">
    <div class="control-grid">
      <button 
        class="mobile-btn up" 
        @touchstart.prevent="handleTouchStart($event, 'up')"
        @click="handleMove('up')"
        :disabled="!canMove"
      >
        <span class="arrow">↑</span>
      </button>
      
      <div class="middle-row">
        <button 
          class="mobile-btn left" 
          @touchstart.prevent="handleTouchStart($event, 'left')"
          @click="handleMove('left')"
          :disabled="!canMove"
        >
          <span class="arrow">←</span>
        </button>
        
        <div class="control-info">
          <div class="move-count">步数: {{ moveCount }}</div>
        </div>
        
        <button 
          class="mobile-btn right" 
          @touchstart.prevent="handleTouchStart($event, 'right')"
          @click="handleMove('right')"
          :disabled="!canMove"
        >
          <span class="arrow">→</span>
        </button>
      </div>
      
      <button 
        class="mobile-btn down" 
        @touchstart.prevent="handleTouchStart($event, 'down')"
        @click="handleMove('down')"
        :disabled="!canMove"
      >
        <span class="arrow">↓</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Direction } from '../types/game';

interface Props {
  canMove: boolean;
  moveCount: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  move: [direction: Direction];
}>();

// 处理触摸开始
const handleTouchStart = (_event: TouchEvent, direction: Direction) => {
  // 延迟一点时间触发，让用户感觉到触摸反馈
  setTimeout(() => {
    handleMove(direction);
  }, 50);
};

// 处理移动
const handleMove = (direction: Direction) => {
  if (props.canMove) {
    emit('move', direction);
  }
};
</script>

<style scoped>
.mobile-controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.control-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.middle-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mobile-btn {
  background: linear-gradient(135deg, #FF6B35, #FF3838);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 15px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.mobile-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
}

.mobile-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.mobile-btn:active::before {
  width: 100%;
  height: 100%;
}

.mobile-btn:hover:not(:disabled),
.mobile-btn:active:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

.arrow {
  z-index: 2;
  position: relative;
}

.control-info {
  min-width: 80px;
  text-align: center;
}

.move-count {
  color: #FF8E53;
  font-size: 12px;
  font-weight: bold;
  background: rgba(255, 107, 53, 0.1);
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

@media (max-width: 480px) {
  .mobile-btn {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .control-info {
    min-width: 60px;
  }
  
  .move-count {
    font-size: 10px;
    padding: 6px 8px;
  }
}
</style>