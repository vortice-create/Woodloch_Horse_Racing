export type GameState = 'idle' | 'racing' | 'finished';

export interface DiceState {
  values: [number, number];
  isRolling: boolean;
}

export interface Winner {
  horseId: number;
  name: string;
}
