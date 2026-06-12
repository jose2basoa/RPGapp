import { DiceInstance } from "@/src/types/dice";

class DiceService {
  private dice: DiceInstance[] = [];

  getAll() {
    return this.dice;
  }

  setAll(dice: DiceInstance[]) {
    this.dice = dice;
  }

  clear() {
    this.dice = [];
  }
}

export const diceService =
  new DiceService();