// 游戏状态类型定义
export interface GameState {
  board: number[][]
  score: number
  bestScore: number
  isGameOver: boolean
  isWin: boolean
  canUndo: boolean
  moves: number
}

// 移动方向枚举
export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

// 游戏动作接口
export interface GameAction {
  type: string
  payload?: any
}

// 历史记录接口
export interface GameHistory {
  board: number[][]
  score: number
  moves: number
}

// 游戏配置接口
export interface GameConfig {
  size: number
  target: number
  startTiles: number
}

// 默认游戏配置
export const DEFAULT_CONFIG: GameConfig = {
  size: 4,
  target: 2048,
  startTiles: 2
}