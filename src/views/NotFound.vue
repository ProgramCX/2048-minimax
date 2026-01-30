<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <div class="error-icon">
        <span class="error-number">404</span>
      </div>
      
      <h1 class="error-title">Page Not Found</h1>
      
      <p class="error-description">
        Oops! The page you're looking for doesn't exist.
      </p>
      
      <div class="error-details">
        <p>It seems you've wandered off into the digital wilderness.</p>
        <p>Don't worry, even the best players get lost sometimes!</p>
      </div>
      
      <div class="navigation-options">
        <router-link to="/" class="nav-btn primary">
          🏠 Go Home
        </router-link>
        
        <router-link to="/game" class="nav-btn secondary">
          🎮 Play Game
        </router-link>
        
        <button @click="goBack" class="nav-btn tertiary">
          ← Go Back
        </button>
      </div>
      
      <div class="helpful-links">
        <h3>You might be looking for:</h3>
        <ul>
          <li><router-link to="/">Home Page</router-link> - Start here</li>
          <li><router-link to="/game">Game Page</router-link> - Play 2048</li>
          <li><router-link to="/game">Game Board</router-link> - Continue your game</li>
        </ul>
      </div>
      
      <div class="game-preview" v-if="gameStore.score > 0">
        <h3>Your Current Game:</h3>
        <div class="game-stats-mini">
          <div class="mini-stat">
            <span class="mini-label">Score:</span>
            <span class="mini-value">{{ gameStore.score }}</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Best:</span>
            <span class="mini-value">{{ gameStore.bestScore }}</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Moves:</span>
            <span class="mini-value">{{ gameStore.moves }}</span>
          </div>
        </div>
        <router-link to="/game" class="continue-btn">
          Continue Game →
        </router-link>
      </div>
    </div>
    
    <div class="background-animation">
      <div class="floating-tile" v-for="i in 8" :key="i" :style="getTileStyle(i)">
        {{ Math.pow(2, i) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore';

const router = useRouter();
const gameStore = useGameStore();

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};

const getTileStyle = (index: number) => {
  const delay = index * 0.5;
  const duration = 3 + (index % 3);
  const size = 30 + (index % 4) * 10;
  const x = 10 + (index % 5) * 18;
  const y = 20 + (Math.floor(index / 5)) * 25;
  
  return {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    top: `${y}%`,
    fontSize: `${Math.max(8, size / 4)}px`,
    backgroundColor: getTileColor(index),
  };
};

const getTileColor = (index: number) => {
  const colors = [
    '#eee4da', '#ede0c8', '#f2b179', '#f59563', 
    '#f67c5f', '#f65e3b', '#edcf72', '#edcc61'
  ];
  return colors[index % colors.length];
};
</script>

<style scoped>
.not-found-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  z-index: 10;
}

.error-icon {
  margin-bottom: 30px;
}

.error-number {
  font-size: 6rem;
  font-weight: bold;
  color: #8f7a66;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.error-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #776e65;
  margin: 0 0 20px 0;
}

.error-description {
  font-size: 1.3rem;
  color: #8f7a66;
  margin: 0 0 30px 0;
  line-height: 1.6;
}

.error-details {
  background: #f8f5f0;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 40px;
  text-align: left;
}

.error-details p {
  color: #8f7a66;
  margin: 10px 0;
  line-height: 1.6;
  font-style: italic;
}

.navigation-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-btn.primary {
  background: #8f7a66;
  color: white;
}

.nav-btn.primary:hover {
  background: #9f8a76;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(143, 122, 102, 0.4);
}

.nav-btn.secondary {
  background: #edc22e;
  color: #f9f6f2;
}

.nav-btn.secondary:hover {
  background: #edc53f;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(237, 194, 46, 0.4);
}

.nav-btn.tertiary {
  background: transparent;
  color: #8f7a66;
  border: 2px solid #8f7a66;
}

.nav-btn.tertiary:hover {
  background: #8f7a66;
  color: white;
  transform: translateY(-3px);
}

.helpful-links {
  background: #f0f0f0;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  text-align: left;
}

.helpful-links h3 {
  color: #776e65;
  margin: 0 0 15px 0;
  text-align: center;
}

.helpful-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.helpful-links li {
  margin: 10px 0;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.helpful-links li:last-child {
  border-bottom: none;
}

.helpful-links a {
  color: #8f7a66;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.helpful-links a:hover {
  color: #776e65;
  text-decoration: underline;
}

.game-preview {
  background: linear-gradient(135deg, #edc22e 0%, #edc53f 100%);
  padding: 25px;
  border-radius: 15px;
  color: #f9f6f2;
}

.game-preview h3 {
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 1.3rem;
}

.game-stats-mini {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.mini-stat {
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.mini-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
  opacity: 0.9;
}

.mini-value {
  display: block;
  font-size: 1.4rem;
  font-weight: bold;
}

.continue-btn {
  background: rgba(255, 255, 255, 0.2);
  color: #f9f6f2;
  padding: 12px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.continue-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.floating-tile {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  animation: float 4s ease-in-out infinite;
  backdrop-filter: blur(10px);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 40px 20px;
  }
  
  .error-number {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .navigation-options {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .game-stats-mini {
    flex-direction: column;
    gap: 10px;
  }
}
</style>