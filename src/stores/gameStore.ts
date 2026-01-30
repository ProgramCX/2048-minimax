import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Tile, Direction } from '../types/game';
import {
  initializeBoard,
  moveTiles,
  addRandomTile,
  canMove,
  hasWon,
  calculateScore,
  getEmptyPositions,
} from '../utils/gameLogic';

export const useGameStore = defineStore('game', () => {
  // 游戏状态
  const board = ref<(Tile | null)[][]>(initializeBoard());
  const score = ref(0);
  const bestScore = ref(Number(localStorage.getItem('2048-best-score') || 0));
  const moves = ref(0);
  const isGameOver = ref(false);
  const isWon = ref(false);
  const isPlayingAfterWin = ref(false);

  // 计算属性
  const canMakeMove = computed(() => {
    return !isGameOver.value && canMove(board.value);
  });

  // 游戏初始化
  const initializeGame = () => {
    board.value = initializeBoard();
    score.value = 0;
    moves.value = 0;
    isGameOver.value = false;
    isWon.value = false;
    isPlayingAfterWin.value = false;
  };

  // 重置游戏
  const resetGame = () => {
    initializeGame();
  };

  // 执行移动
  const makeMove = (direction: Direction) => {
    if (!canMakeMove.value) return;

    const newBoard = moveTiles(board.value, direction);
    
    if (newBoard !== board.value) {
      // 移动成功
      board.value = newBoard;
      moves.value++;
      
      // 检查是否获胜
      if (!isWon.value && hasWon(board.value)) {
        isWon.value = true;
      }
      
      // 检查是否游戏结束
      if (!canMove(board.value)) {
        isGameOver.value = true;
      }
      
      // 添加新方块
      board.value = addRandomTile(board.value);
      
      // 更新分数
      score.value = calculateScore(board.value);
      
      // 更新最高分
      if (score.value > bestScore.value) {
        bestScore.value = score.value;
        localStorage.setItem('2048-best-score', bestScore.value.toString());
      }
    }
  };

  // 胜利后继续游戏
  const continueAfterWin = () => {
    if (isWon.value) {
      isPlayingAfterWin.value = true;
    }
  };

  // 获取方块颜色
  const getTileColor = (row: number, col: number): string => {
    const tile = board.value[row][col];
    if (!tile) return '#cdc1b4';
    
    const colors: { [key: number]: string } = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    
    return colors[tile.value] || '#3c3a32';
  };

  // 获取方块文字颜色
  const getTileTextColor = (row: number, col: number): string => {
    const tile = board.value[row][col];
    if (!tile) return '#776e65';
    
    return tile.value <= 4 ? '#776e65' : '#f9f6f2';
  };

  return {
    // 状态
    board,
    score,
    bestScore,
    moves,
    isGameOver,
    isWon,
    isPlayingAfterWin,
    
    // 计算属性
    canMakeMove,
    
    // 方法
    initializeGame,
    resetGame,
    makeMove,
    continueAfterWin,
    getTileColor,
    getTileTextColor,
  };
});