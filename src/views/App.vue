<template>
  <div id="app">
    <GameBoard />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import GameBoard from './GameBoard.vue';

onMounted(() => {
  // 设置页面标题
  document.title = '2048 Vue Game';
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif;
  background: #faf8ef;
  color: #776e65;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  width: 100%;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #bbada0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8f7a66;
}

/* 通用动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  body {
    font-size: 12px;
  }
}

/* 无障碍支持 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #e0e0e0;
  }
}

/* 高对比度支持 */
@media (prefers-contrast: high) {
  body {
    background: #ffffff;
    color: #000000;
  }
}
</style>