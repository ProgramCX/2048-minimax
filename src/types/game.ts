// TypeScript类型定义
export interface Tile {
  id: string;
  value: number;
  position: Position;
  isNew?: boolean;
  isMerged?: boolean;
  mergedFrom?: Tile[];
}

export interface Position {
  row: number;
  col: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

// 常量
export const BOARD_SIZE = 4;
export const WINNING_TILE = 2048;
export const TILE_COLORS: { [key: number]: string } = {
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