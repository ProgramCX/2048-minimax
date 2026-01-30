import type { Tile, Direction, Position, GameState } from '../types/game';
import { BOARD_SIZE, WINNING_TILE } from '../types/game';

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// 生成新方块
export function generateTile(board: (Tile | null)[][]): boolean {
  const emptyCells: Position[] = [];
  
  // 找到所有空位置
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col]) {
        emptyCells.push({ row, col });
      }
    }
  }
  
  if (emptyCells.length === 0) return false;
  
  // 随机选择一个空位置
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const position = emptyCells[randomIndex];
  
  // 90%的概率生成2，10%的概率生成4
  const value = Math.random() < 0.9 ? 2 : 4;
  
  board[position.row][position.col] = {
    id: generateId(),
    value,
    position,
    isNew: true,
  };
  
  return true;
}

// 移动方块
export function moveTiles(board: (Tile | null)[][], direction: Direction): { newBoard: (Tile | null)[][]; scoreGained: number } {
  const newBoard = board.map(row => [...row]);
  let scoreGained = 0;
  
  switch (direction) {
    case 'left':
      return moveLeft(newBoard);
    case 'right':
      return moveRight(newBoard);
    case 'up':
      return moveUp(newBoard);
    case 'down':
      return moveDown(newBoard);
    default:
      return { newBoard, scoreGained: 0 };
  }
}

// 向左移动
function moveLeft(board: (Tile | null)[][]): { newBoard: (Tile | null)[][]; scoreGained: number } {
  let scoreGained = 0;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    const tiles = board[row].filter(tile => tile !== null) as Tile[];
    const newRow: (Tile | null)[] = new Array(BOARD_SIZE).fill(null);
    let col = 0;
    
    for (let i = 0; i < tiles.length; i++) {
      const currentTile = tiles[i];
      
      // 检查是否可以与下一个方块合并
      if (i < tiles.length - 1 && tiles[i + 1].value === currentTile.value && !currentTile.isMerged) {
        // 合并方块
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          position: { row, col },
          isMerged: true,
          mergedFrom: [currentTile, tiles[i + 1]],
        };
        
        newRow[col] = mergedTile;
        scoreGained += mergedTile.value;
        i++; // 跳过下一个方块，因为它已经被合并了
        col++;
      } else {
        // 移动方块
        currentTile.position = { row, col };
        currentTile.isMerged = false;
        currentTile.isNew = false;
        newRow[col] = currentTile;
        col++;
      }
    }
    
    board[row] = newRow;
  }
  
  return { newBoard: board, scoreGained };
}

// 向右移动
function moveRight(board: (Tile | null)[][]): { newBoard: (Tile | null)[][]; scoreGained: number } {
  let scoreGained = 0;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    const tiles = board[row].filter(tile => tile !== null) as Tile[];
    const newRow: (Tile | null)[] = new Array(BOARD_SIZE).fill(null);
    let col = BOARD_SIZE - 1;
    
    for (let i = tiles.length - 1; i >= 0; i--) {
      const currentTile = tiles[i];
      
      // 检查是否可以与前一个方块合并
      if (i > 0 && tiles[i - 1].value === currentTile.value && !currentTile.isMerged) {
        // 合并方块
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          position: { row, col },
          isMerged: true,
          mergedFrom: [currentTile, tiles[i - 1]],
        };
        
        newRow[col] = mergedTile;
        scoreGained += mergedTile.value;
        i--; // 跳过前一个方块
        col--;
      } else {
        // 移动方块
        currentTile.position = { row, col };
        currentTile.isMerged = false;
        currentTile.isNew = false;
        newRow[col] = currentTile;
        col--;
      }
    }
    
    board[row] = newRow;
  }
  
  return { newBoard: board, scoreGained };
}

// 向上移动
function moveUp(board: (Tile | null)[][]): { newBoard: (Tile | null)[][]; scoreGained: number } {
  let scoreGained = 0;
  
  for (let col = 0; col < BOARD_SIZE; col++) {
    const tiles: Tile[] = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (board[row][col]) {
        tiles.push(board[row][col] as Tile);
      }
    }
    
    const newCol: (Tile | null)[] = new Array(BOARD_SIZE).fill(null);
    let row = 0;
    
    for (let i = 0; i < tiles.length; i++) {
      const currentTile = tiles[i];
      
      if (i < tiles.length - 1 && tiles[i + 1].value === currentTile.value && !currentTile.isMerged) {
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          position: { row, col },
          isMerged: true,
          mergedFrom: [currentTile, tiles[i + 1]],
        };
        
        newCol[row] = mergedTile;
        scoreGained += mergedTile.value;
        i++;
        row++;
      } else {
        currentTile.position = { row, col };
        currentTile.isMerged = false;
        currentTile.isNew = false;
        newCol[row] = currentTile;
        row++;
      }
    }
    
    for (let r = 0; r < BOARD_SIZE; r++) {
      board[r][col] = newCol[r];
    }
  }
  
  return { newBoard: board, scoreGained };
}

// 向下移动
function moveDown(board: (Tile | null)[][]): { newBoard: (Tile | null)[][]; scoreGained: number } {
  let scoreGained = 0;
  
  for (let col = 0; col < BOARD_SIZE; col++) {
    const tiles: Tile[] = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (board[row][col]) {
        tiles.push(board[row][col] as Tile);
      }
    }
    
    const newCol: (Tile | null)[] = new Array(BOARD_SIZE).fill(null);
    let row = BOARD_SIZE - 1;
    
    for (let i = tiles.length - 1; i >= 0; i--) {
      const currentTile = tiles[i];
      
      if (i > 0 && tiles[i - 1].value === currentTile.value && !currentTile.isMerged) {
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          position: { row, col },
          isMerged: true,
          mergedFrom: [currentTile, tiles[i - 1]],
        };
        
        newCol[row] = mergedTile;
        scoreGained += mergedTile.value;
        i--;
        row--;
      } else {
        currentTile.position = { row, col };
        currentTile.isMerged = false;
        currentTile.isNew = false;
        newCol[row] = currentTile;
        row--;
      }
    }
    
    for (let r = 0; r < BOARD_SIZE; r++) {
      board[r][col] = newCol[r];
    }
  }
  
  return { newBoard: board, scoreGained };
}

// 检查是否获胜
export function checkWin(board: (Tile | null)[][]): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const tile = board[row][col];
      if (tile && tile.value >= WINNING_TILE) {
        return true;
      }
    }
  }
  return false;
}

// 检查是否游戏结束
export function checkGameOver(board: (Tile | null)[][]): boolean {
  // 检查是否有空位
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col]) {
        return false;
      }
    }
  }
  
  // 检查是否有可能的合并
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const currentTile = board[row][col];
      if (!currentTile) continue;
      
      // 检查右边
      if (col < BOARD_SIZE - 1) {
        const rightTile = board[row][col + 1];
        if (rightTile && rightTile.value === currentTile.value) {
          return false;
        }
      }
      
      // 检查下边
      if (row < BOARD_SIZE - 1) {
        const bottomTile = board[row + 1][col];
        if (bottomTile && bottomTile.value === currentTile.value) {
          return false;
        }
      }
    }
  }
  
  return true;
}

// 获取方块颜色
export function getTileColor(value: number): string {
  const colors: Record<number, string> = {
    0: '#cdc1b4',
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
  
  if (colors[value]) {
    return colors[value];
  }
  
  // 对于高数值方块，使用渐变色
  if (value > 2048) {
    const hue = 45 + (value - 2048) * 0.1;
    return `hsl(${hue}, 70%, 45%)`;
  }
  
  return '#3c3a32';
}

// 获取方块文字颜色
export function getTileTextColor(value: number): string {
  return value <= 4 ? '#776e65' : '#f9f6f2';
}