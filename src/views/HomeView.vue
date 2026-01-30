<template>
  <div class="home-view">
    <div class="container">
      <header class="header">
        <h1 class="title">2048</h1>
        <p class="subtitle">现代化的数字拼图游戏</p>
      </header>
      
      <div class="content">
        <div class="description">
          <h2>游戏规则</h2>
          <p>移动数字方块，合并相同的数字，目标是达到 2048！</p>
          <ul>
            <li>使用方向键或 WASD 键移动</li>
            <li>相同数字的方块会合并成一个</li>
            <li>每次移动后会在空白位置随机生成新数字</li>
            <li>无法再移动时游戏结束</li>
          </ul>
        </div>
        
        <button @click="startGame" class="start-btn">
          🎮 开始游戏
        </button>
      </div>
      
      <footer class="footer">
        <p>由 MiniMax Agent 使用 Vue.js 3.5+ 构建</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startGame() {
  router.push('/game')
}
</script>

<style scoped>
.home-view {
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
  text-align: center;
  color: white;
}

.header {
  margin-bottom: 40px;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  margin: 10px 0 0 0;
}

.content {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
}

.description h2 {
  color: #FF6B35;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.description p {
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.description ul {
  text-align: left;
  margin: 0;
  padding-left: 20px;
}

.description li {
  margin: 8px 0;
  font-size: 1rem;
  opacity: 0.9;
}

.start-btn {
  padding: 15px 40px;
  font-size: 1.3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #FF6B35 0%, #FF3838 100%);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  margin-top: 20px;
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

.footer {
  opacity: 0.6;
  font-size: 0.9rem;
}

.footer p {
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .content {
    padding: 20px;
  }
  
  .description h2 {
    font-size: 1.3rem;
  }
  
  .description p {
    font-size: 1rem;
  }
  
  .start-btn {
    padding: 12px 30px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }
  
  .content {
    padding: 15px;
  }
  
  .start-btn {
    padding: 10px 25px;
    font-size: 1rem;
  }
}
</style>