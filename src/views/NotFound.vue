<template>
  <div class="not-found">
    <div class="container">
      <h1 class="error-code">404</h1>
      <h2 class="error-message">页面不存在</h2>
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <button @click="goHome" class="home-btn">
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  text-align: center;
  color: white;
  max-width: 400px;
  width: 100%;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-message {
  font-size: 2rem;
  margin: 10px 0;
  opacity: 0.9;
}

.error-description {
  font-size: 1.1rem;
  opacity: 0.7;
  margin: 20px 0 30px 0;
  line-height: 1.6;
}

.home-btn {
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-code {
    font-size: 4rem;
  }
  
  .error-message {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .home-btn {
    padding: 10px 25px;
    font-size: 1rem;
  }
}
</style>