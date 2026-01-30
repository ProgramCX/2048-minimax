import type { GameState, Direction, GameHistory } from '@/types/game'

/**
 * 创建空的游戏板
 */
export function createEmptyBoard(size: number): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(0))
}

/**
 * 随机在空白位置生成数字
 */
export function addRandomTile(board: number[][]): number[][] {
  const emptyCells: { row: number; col: number }[] = []
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col })
      }
    }
  }
  
  if (emptyCells.length === 0) return board
  
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  const newBoard = board.map(row => [...row])
  newBoard[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4
  
  return newBoard
}

/**
 * 移动数字到左侧
 */
function moveLeft(board: number[][]): { board: number[][]; moved: boolean; score: number } {
  const newBoard = board.map(row => [...row])
  let moved = false
  let score = 0
  
  for (let row = 0; row < board.length; row++) {
    const filtered = newBoard[row].filter(cell => cell !== 0)
    const merged: number[] = []
    
    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2)
        score += filtered[i] * 2
        i++
        moved = true
      } else {
        merged.push(filtered[i])
      }
    }
    
    while (merged.length < board[row].length) {
      merged.push(0)
    }
    
    for (let i = 0; i < board[row].length; i++) {
      if (newBoard[row][i] !== merged[i]) {
        moved = true
      }
      newBoard[row][i] = merged[i]
    }
  }
  
  return { board: newBoard, moved, score }
}

/**
 * 旋转矩阵90度
 */
function rotateMatrix(board: number[][]): number[][] {
  const size = board.length
  const rotated = createEmptyBoard(size)
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[col][size - 1 - row] = board[row][col]
    }
  }
  
  return rotated
}

/**
 * 移动数字
 */
export function move(board: number[][], direction: Direction): { board: number[][]; moved: boolean; score: number } {
  switch (direction) {
    case Direction.LEFT:
      return moveLeft(board)
    case Direction.RIGHT:
      const reversed = board.map(row => [...row].reverse())
      const rightResult = moveLeft(reversed)
      return {
        board: rightResult.board.map(row => row.reverse()),
        moved: rightResult.moved,
        score: rightResult.score
      }
    case Direction.UP:
      const upRotated = rotateMatrix(board)
      const upResult = moveLeft(upRotated)
      return {
        board: rotateMatrix(upResult.board),
        moved: upResult.moved,
        score: upResult.score
      }
    case Direction.DOWN:
      const downRotated = rotateMatrix(rotateMatrix(rotateMatrix(board)))
      const downResult = moveLeft(downRotated)
      return {
        board: rotateMatrix(rotateMatrix(rotateMatrix(downResult.board))),
        moved: downResult.moved,
        score: downResult.score
      }
    default:
      return { board, moved: false, score: 0 }
  }
}

/**
 * 检查是否还能移动
 */
export function canMove(board: number[][]): boolean {
  // 检查是否有空白
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) return true
    }
  }
  
  // 检查是否有相邻的相同数字
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 1; col++) {
      if (board[row][col] === board[row][col + 1]) return true
    }
  }
  
  for (let row = 0; row < board.length - 1; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === board[row + 1][col]) return true
    }
  }
  
  return false
}

/**
 * 检查是否获胜
 */
export function checkWin(board: number[][], target: number = 2048): boolean {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] >= target) return true
    }
  }
  return false
}

/**
 * 初始化游戏
 */
export function initializeGame(size: number = 4): GameState {
  let board = createEmptyBoard(size)
  board = addRandomTile(board)
  board = addRandomTile(board)
  
  return {
    board,
    score: 0,
    bestScore: parseInt(localStorage.getItem('2048-best-score') || '0'),
    isGameOver: false,
    isWin: false,
    canUndo: false,
    moves: 0
  }
}

/**
 * 保存历史记录
 */
export function saveGameHistory(history: GameHistory[]): void {
  localStorage.setItem('2048-game-history', JSON.stringify(history.slice(-10)))
}

/**
 * 获取历史记录
 */
export function getGameHistory(): GameHistory[] {
  const history = localStorage.getItem('2048-game-history')
  return history ? JSON.parse(history) : []
}

/**
 * 保存最佳分数
 */
export function saveBestScore(score: number): void {
  const bestScore = parseInt(localStorage.getItem('2048-best-score') || '0')
  if (score > bestScore) {
    localStorage.setItem('2048-best-score', score.toString())
  }
}