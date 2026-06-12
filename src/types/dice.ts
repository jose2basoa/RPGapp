export type DiceType =
  | 4
  | 6
  | 8
  | 10
  | 12
  | 20;

export interface DiceInstance {
  id: string;
  sides: DiceType;
  value: number;
}

export interface RollResult {
  total: number;
  dice: DiceInstance[];
  timestamp: number;
}