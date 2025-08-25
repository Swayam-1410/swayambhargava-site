const { startGame, getState } = require('../script');

test('game command activates game mode and sets secret number', () => {
  startGame();
  const state = getState();
  expect(state.gameMode).toBe(true);
  expect(state.secretNumber).toBeGreaterThanOrEqual(1);
  expect(state.secretNumber).toBeLessThanOrEqual(100);
});
