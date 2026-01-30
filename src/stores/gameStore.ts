import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Tile, GameState, Direction, Position } from '../types/game';
import { BOARD_SIZE, WINNING_TILE, TILE_COLORS } from '../types/game';
import { generateTile, moveTiles, checkWin, checkGameOver, getTileColor, getTileTextColor } from '../utils/gameLogic';

export const useGameStore = defineStore('game', () => {
  // 状态
  const board = ref<(Tile | null)[][]>(createEmptyBoard());
  const score = ref(0);
  const bestScore = ref(getBestScore());
  const isGameOver = ref(false);
  const isWon = ref(false);
  const isPlayingAfterWin = ref(false);
  const moves = ref(0);

  // 计算属性
  const canMakeMove = computed(() => {
    return !isGameOver.value && !isWon.value;
  });

  // 方法
  function createEmptyBoard(): (Tile | null)[][] {
    return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  }

  function getBestScore(): number {
    const saved = localStorage.getItem('2048-best-score');
    return saved ? parseInt(saved) : 0;
  }

  function saveBestScore(): void {
    if (score.value > bestScore.value) {
      bestScore.value = score.value;
      localStorage.setItem('2048-best-score', score.value.toString());
    }
  }

  function initializeGame(): void {
    board.value = createEmptyBoard();
    score.value = 0;
    isGameOver.value = false;
    isWon.value = false;
    isPlayingAfterWin.value = false;
    moves.value = 0;
    
    // 添加初始方块
    generateTile(board.value);
    generateTile(board.value);
  }

  function makeMove(direction: Direction): void {
    if (!canMakeMove.value) return;

    const { newBoard, scoreGained } = moveTiles(board.value, direction);
    
    if (JSON.stringify(newBoard) !== JSON.stringify(board.value)) {
      board.value = newBoard;
      score.value += scoreGained;
      moves.value++;
      
      // 添加新方块
      generateTile(board.value);
      
      // 检查游戏状态
      if (!isWon.value && checkWin(board.value)) {
        isWon.value = true;
        saveBestScore();
      } else if (checkGameOver(board.value)) {
        isGameOver.value = true;
        saveBestScore();
      }
    }
  }

  function resetGame(): void {
    initializeGame();
  }

  function continueAfterWin(): void {
    isPlayingAfterWin.value = true;
  }

  function getTileValue(row: number, col: number): number {
    const tile = board.value[row]?.[col];
    return tile?.value || 0;
  }

  function getTileColor(row: number, col: number): string {
    const value = getTileValue(row, col);
    return getTileColorValue(value);
  }

  function getTileTextColor(row: number, col: number): string {
    const value = getTileValue(row, col);
    return getTileTextColorValue(value);
  }

  function getTileColorValue(value: number): string {
    if (value === 0) return TILE_COLORS[0];
    if (TILE_COLORS[value]) return TILE_COLORS[value];
    
    // 对于超出预设值的高数值方块，使用渐变色
    if (value > 2048) {
      return `hsl(${45 + (value - 2048) * 0.1}, 70%, 45%)`;
    }
    
    return TILE_COLORS[2]; // 默认颜色
  }

  function getTileTextColorValue(value: number): string {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  }

  // 初始化游戏
  initializeGame();

  return {
    // 状态
    board,
    score,
    bestScore,
    isGameOver,
    isWon,
    isPlayingAfterWin,
    moves,
    
    // 计算属性
    canMakeMove,
    
    // 方法
    makeMove,
    resetGame,
    continueAfterWin,
    getTileValue,
    getTileColor,
    getTileTextColor,
  };
});