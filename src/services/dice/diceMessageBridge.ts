export const DiceBridge = {
  addDice: (sides: number) =>
    JSON.stringify({
      type: "ADD_DICE",
      sides,
    }),

  removeDice: (id: string) =>
    JSON.stringify({
      type: "REMOVE_DICE",
      id,
    }),

  rollAll: () =>
    JSON.stringify({
      type: "ROLL_ALL",
    }),

  clear: () =>
    JSON.stringify({
      type: "CLEAR",
    }),
};