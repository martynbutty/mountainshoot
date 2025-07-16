// ABOUTME: Tests for turn management utility functions
// ABOUTME: Validates turn timing, validation, and status functions

import {
  getTurnDuration,
  isTurnExpired,
  getRemainingTurnTime,
  formatTurnDuration,
  canPlayerPerformAction,
  getTurnStatusDescription,
  canSwitchTurn,
} from '../../src/game/turnUtils';
import { GameState } from '../../src/types';

// Helper function to create a test game state
const createTestGameState = (overrides: Partial<GameState> = {}): GameState => ({
  currentPlayer: 1,
  gameStatus: 'playing',
  roundNumber: 1,
  players: {
    player1: {
      id: 1,
      position: { x: 100, y: 300 },
      health: 100,
      score: 0,
    },
    player2: {
      id: 2,
      position: { x: 700, y: 300 },
      health: 100,
      score: 0,
    },
  },
  sessionScores: {
    player1Wins: 0,
    player2Wins: 0,
  },
  turnState: {
    turnStartTime: Date.now(),
    turnTimeLimit: null,
    playerActions: {
      hasFired: false,
      hasAimed: false,
    },
    turnNumber: 1,
  },
  ...overrides,
});

describe('turnUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTurnDuration', () => {
    it('should return 0 when turn has not started', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: null,
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      expect(getTurnDuration(gameState)).toBe(0);
    });

    it('should return correct duration when turn is active', () => {
      const startTime = Date.now() - 5000; // 5 seconds ago
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: startTime,
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      const duration = getTurnDuration(gameState);
      expect(duration).toBeGreaterThanOrEqual(4900); // Allow for small timing differences
      expect(duration).toBeLessThanOrEqual(5100);
    });
  });

  describe('isTurnExpired', () => {
    it('should return false when no time limit is set', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now() - 10000,
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      expect(isTurnExpired(gameState)).toBe(false);
    });

    it('should return false when turn is within time limit', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now() - 5000,
          turnTimeLimit: 10000,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      expect(isTurnExpired(gameState)).toBe(false);
    });

    it('should return true when turn has exceeded time limit', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now() - 15000,
          turnTimeLimit: 10000,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      expect(isTurnExpired(gameState)).toBe(true);
    });
  });

  describe('getRemainingTurnTime', () => {
    it('should return Infinity when no time limit is set', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now(),
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      expect(getRemainingTurnTime(gameState)).toBe(Infinity);
    });

    it('should return correct remaining time', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now() - 3000,
          turnTimeLimit: 10000,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      const remaining = getRemainingTurnTime(gameState);
      expect(remaining).toBeGreaterThanOrEqual(6900);
      expect(remaining).toBeLessThanOrEqual(7100);
    });

    it('should return 0 when time has expired', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now() - 15000,
          turnTimeLimit: 10000,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });

      expect(getRemainingTurnTime(gameState)).toBe(0);
    });
  });

  describe('formatTurnDuration', () => {
    it('should format seconds correctly', () => {
      expect(formatTurnDuration(5000)).toBe('5s');
      expect(formatTurnDuration(30000)).toBe('30s');
    });

    it('should format minutes and seconds correctly', () => {
      expect(formatTurnDuration(65000)).toBe('1:05');
      expect(formatTurnDuration(125000)).toBe('2:05');
    });

    it('should handle zero duration', () => {
      expect(formatTurnDuration(0)).toBe('0s');
    });
  });

  describe('canPlayerPerformAction', () => {
    it('should return false when not current player', () => {
      const gameState = createTestGameState({ currentPlayer: 1 });
      
      expect(canPlayerPerformAction(gameState, 2, 'aim')).toBe(false);
      expect(canPlayerPerformAction(gameState, 2, 'fire')).toBe(false);
    });

    it('should return false when game is not playing', () => {
      const gameState = createTestGameState({ gameStatus: 'waiting' });
      
      expect(canPlayerPerformAction(gameState, 1, 'aim')).toBe(false);
      expect(canPlayerPerformAction(gameState, 1, 'fire')).toBe(false);
    });

    it('should return false when turn has not started', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: null,
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });
      
      expect(canPlayerPerformAction(gameState, 1, 'aim')).toBe(false);
      expect(canPlayerPerformAction(gameState, 1, 'fire')).toBe(false);
    });

    it('should return true for aiming when conditions are met', () => {
      const gameState = createTestGameState();
      
      expect(canPlayerPerformAction(gameState, 1, 'aim')).toBe(true);
    });

    it('should return true for firing when conditions are met and not fired yet', () => {
      const gameState = createTestGameState();
      
      expect(canPlayerPerformAction(gameState, 1, 'fire')).toBe(true);
    });

    it('should return false for firing when already fired', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now(),
          turnTimeLimit: null,
          playerActions: { hasFired: true, hasAimed: false },
          turnNumber: 1,
        },
      });
      
      expect(canPlayerPerformAction(gameState, 1, 'fire')).toBe(false);
    });
  });

  describe('getTurnStatusDescription', () => {
    it('should return game status when not playing', () => {
      const gameState = createTestGameState({ gameStatus: 'waiting' });
      
      expect(getTurnStatusDescription(gameState)).toBe('Game waiting');
    });

    it('should return active turn status', () => {
      const gameState = createTestGameState();
      
      expect(getTurnStatusDescription(gameState)).toBe('Player 1 - Turn 1 (Active)');
    });

    it('should return aimed status', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now(),
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: true },
          turnNumber: 1,
        },
      });
      
      expect(getTurnStatusDescription(gameState)).toBe('Player 1 - Turn 1 (Aimed)');
    });

    it('should return fired status', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now(),
          turnTimeLimit: null,
          playerActions: { hasFired: true, hasAimed: true },
          turnNumber: 1,
        },
      });
      
      expect(getTurnStatusDescription(gameState)).toBe('Player 1 - Turn 1 (Fired)');
    });

    it('should return not started status', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: null,
          turnTimeLimit: null,
          playerActions: { hasFired: false, hasAimed: false },
          turnNumber: 1,
        },
      });
      
      expect(getTurnStatusDescription(gameState)).toBe('Player 1 - Turn 1 (Not started)');
    });
  });

  describe('canSwitchTurn', () => {
    it('should return true when player has fired', () => {
      const gameState = createTestGameState({
        turnState: {
          turnStartTime: Date.now(),
          turnTimeLimit: null,
          playerActions: { hasFired: true, hasAimed: false },
          turnNumber: 1,
        },
      });
      
      expect(canSwitchTurn(gameState)).toBe(true);
    });

    it('should return false when player has not fired', () => {
      const gameState = createTestGameState();
      
      expect(canSwitchTurn(gameState)).toBe(false);
    });

    it('should return false when game is not playing', () => {
      const gameState = createTestGameState({
        gameStatus: 'waiting',
        turnState: {
          turnStartTime: Date.now(),
          turnTimeLimit: null,
          playerActions: { hasFired: true, hasAimed: false },
          turnNumber: 1,
        },
      });
      
      expect(canSwitchTurn(gameState)).toBe(false);
    });
  });
});
