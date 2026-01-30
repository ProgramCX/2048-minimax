import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState, Direction, GameHistory } from '@/types/game'
import {
  move,
  canMove,
  checkWin,
  addRandomTile,
  initializeGame,
  saveBestScore
} from '@/utils/gameLogic'

export const useGameStore = defineStore('game', () => {
  // 状态
  const gameState = ref<GameState>(initializeGame())
  const history = ref<GameHistory[]>([])
  
  // 计算属性
  const currentBoard = computed(() => gameState.value.board)
  const score = computed(() => gameState.value.score)
  const bestScore = computed(() => gameState.value.bestScore)
  const isGameOver = computed(() => gameState.value.isGameOver)
  const isWin = computed(() => gameState.value.isWin)
  const canUndo = computed(() => gameState.value.canUndo)
  const moves = computed(() => gameState.value.moves)
  
  // 游戏操作
  function makeMove(direction: Direction) {
    if (isGameOver.value) return
    
    const result = move(gameState.value.board, direction)
    if (!result.moved) return
    
    // 保存历史记录
    history.value.push({
      board: gameState.value.board.map(row => [...row]),
      score: gameState.value.score,
      moves: gameState.value.moves
    })
    
    // 更新游戏状态
    gameState.value.board = addRandomTile(result.board)
    gameState.value.score += result.score
    gameState.value.moves++
    gameState.value.canUndo = history.value.length > 0
    
    // 检查游戏结束
    gameState.value.isWin = checkWin(gameState.value.board)
    gameState.value.isGameOver = !canMove(gameState.value.board)
    
    // 保存最佳分数
    if (gameState.value.score > gameState.value.bestScore) {
      gameState.value.bestScore = gameState.value.score
      saveBestScore(gameState.value.score)
    }
  }
  
  function undo() {
    if (history.value.length === 0) return
    
    const previousState = history.value.pop()!
    gameState.value.board = previousState.board.map(row => [...row])
    gameState.value.score = previousState.score
    gameState.value.moves = previousState.moves
    gameState.value.isGameOver = false
    gameState.value.isWin = false
    gameState.value.canUndo = history.value.length > 0
  }
  
  function resetGame() {
    gameState.value = initializeGame()
    history.value = []
  }
  
  function continueGame() {
    gameState.value.isWin = false
  }
  
  return {
    // 状态
    gameState,
    history,
    
    // 计算属性
    currentBoard,
    score,
    bestScore,
    isGameOver,
    isWin,
    canUndo,
    moves,
    
    // 操作
    makeMove,
    undo,
    resetGame,
    continueGame
  }
})