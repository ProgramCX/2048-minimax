import { Tile, Direction, Position, BOARD_SIZE, WINNING_TILE } from '../types/game';

// 生成唯一ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 创建空的游戏板
export const createEmptyBoard = (): (Tile | null)[][] => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
};

// 获取空位置
export const getEmptyPositions = (board: (Tile | null)[][]): Position[] => {
  const positions: Position[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col]) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
};

// 在随机空位置生成新方块
export const addRandomTile = (board: (Tile | null)[][]): (Tile | null)[][] => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;

  const newBoard = board.map(row => [...row]);
  const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  newBoard[randomPosition.row][randomPosition.col] = {
    id: generateId(),
    value,
    position: { ...randomPosition },
    isNew: true,
  };

  return newBoard;
};

// 初始化游戏板（添加两个初始方块）
export const initializeBoard = (): (Tile | null)[][] => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

// 移动和合并方块
export const moveTiles = (board: (Tile | null)[][], direction: Direction): (Tile | null)[][] => {
  const newBoard = board.map(row => [...row]);
  let moved = false;

  // 清除所有标记
  newBoard.forEach(row => {
    row.forEach(tile => {
      if (tile) {
        tile.isNew = false;
        tile.isMerged = false;
        tile.mergedFrom = undefined;
      }
    });
  });

  switch (direction) {
    case 'left':
      for (let row = 0; row < BOARD_SIZE; row++) {
        const result = slideRowLeft(newBoard[row]);
        newBoard[row] = result.newRow;
        if (result.moved) moved = true;
      }
      break;
    case 'right':
      for (let row = 0; row < BOARD_SIZE; row++) {
        const result = slideRowRight(newBoard[row]);
        newBoard[row] = result.newRow;
        if (result.moved) moved = true;
      }
      break;
    case 'up':
      for (let col = 0; col < BOARD_SIZE; col++) {
        const column = newBoard.map(row => row[col]);
        const result = slideColumnUp(column);
        for (let row = 0; row < BOARD_SIZE; row++) {
          newBoard[row][col] = result.newColumn[row];
        }
        if (result.moved) moved = true;
      }
      break;
    case 'down':
      for (let col = 0; col < BOARD_SIZE; col++) {
        const column = newBoard.map(row => row[col]);
        const result = slideColumnDown(column);
        for (let row = 0; row < BOARD_SIZE; row++) {
          newBoard[row][col] = result.newColumn[row];
        }
        if (result.moved) moved = true;
      }
      break;
  }

  return moved ? newBoard : board;
};

// 向左滑动一行
const slideRowLeft = (row: (Tile | null)[]): { newRow: (Tile | null)[]; moved: boolean } => {
  const filtered = row.filter(tile => tile !== null) as Tile[];
  const newRow: (Tile | null)[] = [...filtered];
  
  let moved = JSON.stringify(row) !== JSON.stringify(newRow);
  
  // 合并相邻的相同方块
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] && newRow[i + 1] && newRow[i]!.value === newRow[i + 1]!.value) {
      const mergedTile: Tile = {
        id: generateId(),
        value: newRow[i]!.value * 2,
        position: { row: 0, col: i },
        isMerged: true,
        mergedFrom: [newRow[i]!, newRow[i + 1]!],
      };
      newRow[i] = mergedTile;
      newRow.splice(i + 1, 1);
      moved = true;
    }
  }
  
  // 填充空位
  while (newRow.length < BOARD_SIZE) {
    newRow.push(null);
  }
  
  return { newRow, moved };
};

// 检查是否还能移动
export const canMove = (board: (Tile | null)[][]): boolean => {
  // 检查是否有空位
  if (getEmptyPositions(board).length > 0) {
    return true;
  }
  
  // 检查是否有相邻的相同方块
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const currentTile = board[row][col];
      if (!currentTile) continue;
      
      // 检查右边
      if (col < BOARD_SIZE - 1) {
        const rightTile = board[row][col + 1];
        if (rightTile && rightTile.value === currentTile.value) {
          return true;
        }
      }
      
      // 检查下面
      if (row < BOARD_SIZE - 1) {
        const bottomTile = board[row + 1][col];
        if (bottomTile && bottomTile.value === currentTile.value) {
          return true;
        }
      }
    }
  }
  
  return false;
};

// 检查是否获胜
export const hasWon = (board: (Tile | null)[][]): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const tile = board[row][col];
      if (tile && tile.value >= WINNING_TILE) {
        return true;
      }
    }
  }
  return false;
};

// 计算分数
export const calculateScore = (board: (Tile | null)[][]): number => {
  let score = 0;
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const tile = board[row][col];
      if (tile) {
        score += tile.value;
      }
    }
  }
  return score;
};