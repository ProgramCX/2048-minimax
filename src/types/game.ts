export interface Tile {
  id: string;
  value: number;
  position: { row: number; col: number };
  isNew?: boolean;
  isMerged?: boolean;
  mergedFrom?: Tile[];
}

export interface GameState {
  board: (Tile | null)[][];
  score: number;
  bestScore: number;
  isGameOver: boolean;
  isWon: boolean;
  canMove: boolean;
  moves: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  row: number;
  col: number;
}

export const BOARD_SIZE = 4;
export const WINNING_TILE = 2048;

export const TILE_COLORS: Record<number, string> = {
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