// ABOUTME: Tests for win condition detection and round management
// ABOUTME: Validates hit detection, scoring, and round transitions

import { 
  checkForHit, 
  declareRoundWinner, 
  updateScores, 
  checkForGameEnd,
  startNewRound,
  endCurrentRound,
  resetGameSession
} from '../../src/game/winConditions';
import { GameState } from '../../src/types';

// Helper function to create a test game state
const createTestGameState = (): GameState => ({
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
});

describe('Win Condition Detection', () => {
  describe('checkForHit', () => {
    it('should return true when projectile hits player', () => {
      const projectilePosition = { x: 100, y: 300 };
      const playerPosition = { x: 100, y: 300 };
      const hitboxSize = 20;
      
      const result = checkForHit(projectilePosition, playerPosition, hitboxSize);
      expect(result).toBe(true);
    });

    it('should return false when projectile misses player', () => {
      const projectilePosition = { x: 100, y: 300 };
      const playerPosition = { x: 200, y: 300 };
      const hitboxSize = 20;
      
      const result = checkForHit(projectilePosition, playerPosition, hitboxSize);
      expect(result).toBe(false);
    });

    it('should return true when projectile is within hitbox radius', () => {
      const projectilePosition = { x: 110, y: 310 };
      const playerPosition = { x: 100, y: 300 };
      const hitboxSize = 20;
      
      const result = checkForHit(projectilePosition, playerPosition, hitboxSize);
      expect(result).toBe(true);
    });

    it('should return false when projectile is outside hitbox radius', () => {
      const projectilePosition = { x: 130, y: 330 };
      const playerPosition = { x: 100, y: 300 };
      const hitboxSize = 20;
      
      const result = checkForHit(projectilePosition, playerPosition, hitboxSize);
      expect(result).toBe(false);
    });
  });

  describe('declareRoundWinner', () => {
    it('should declare player 2 as winner when player 1 is hit', () => {
      const gameState = createTestGameState();
      const result = declareRoundWinner(gameState, 1);
      
      expect(result.roundWinner).toBe(2);
      expect(result.gameStatus).toBe('round_over');
    });

    it('should declare player 1 as winner when player 2 is hit', () => {
      const gameState = createTestGameState();
      const result = declareRoundWinner(gameState, 2);
      
      expect(result.roundWinner).toBe(1);
      expect(result.gameStatus).toBe('round_over');
    });

    it('should set round end time', () => {
      const gameState = createTestGameState();
      const beforeTime = Date.now();
      const result = declareRoundWinner(gameState, 1);
      const afterTime = Date.now();
      
      expect(result.roundEndTime).toBeGreaterThanOrEqual(beforeTime);
      expect(result.roundEndTime).toBeLessThanOrEqual(afterTime);
    });

    it('should clear turn start time', () => {
      const gameState = createTestGameState();
      const result = declareRoundWinner(gameState, 1);
      
      expect(result.turnState.turnStartTime).toBe(null);
    });
  });

  describe('updateScores', () => {
    it('should increment player 1 wins when player 1 wins', () => {
      const gameState = createTestGameState();
      const result = updateScores(gameState, 1);
      
      expect(result.sessionScores.player1Wins).toBe(1);
      expect(result.sessionScores.player2Wins).toBe(0);
    });

    it('should increment player 2 wins when player 2 wins', () => {
      const gameState = createTestGameState();
      const result = updateScores(gameState, 2);
      
      expect(result.sessionScores.player1Wins).toBe(0);
      expect(result.sessionScores.player2Wins).toBe(1);
    });

    it('should preserve existing scores', () => {
      const gameState = createTestGameState();
      gameState.sessionScores.player1Wins = 3;
      gameState.sessionScores.player2Wins = 2;
      
      const result = updateScores(gameState, 1);
      
      expect(result.sessionScores.player1Wins).toBe(4);
      expect(result.sessionScores.player2Wins).toBe(2);
    });
  });

  describe('checkForGameEnd', () => {
    it('should return false when no player has reached win limit', () => {
      const gameState = createTestGameState();
      gameState.sessionScores.player1Wins = 2;
      gameState.sessionScores.player2Wins = 1;
      
      const result = checkForGameEnd(gameState, 5);
      expect(result).toBe(false);
    });

    it('should return true when player 1 reaches win limit', () => {
      const gameState = createTestGameState();
      gameState.sessionScores.player1Wins = 5;
      gameState.sessionScores.player2Wins = 2;
      
      const result = checkForGameEnd(gameState, 5);
      expect(result).toBe(true);
    });

    it('should return true when player 2 reaches win limit', () => {
      const gameState = createTestGameState();
      gameState.sessionScores.player1Wins = 2;
      gameState.sessionScores.player2Wins = 5;
      
      const result = checkForGameEnd(gameState, 5);
      expect(result).toBe(true);
    });
  });

  describe('startNewRound', () => {
    it('should increment round number', () => {
      const gameState = createTestGameState();
      gameState.roundNumber = 3;
      
      const result = startNewRound(gameState);
      expect(result.roundNumber).toBe(4);
    });

    it('should set game status to playing', () => {
      const gameState = createTestGameState();
      gameState.gameStatus = 'round_over';
      
      const result = startNewRound(gameState);
      expect(result.gameStatus).toBe('playing');
    });

    it('should reset player health', () => {
      const gameState = createTestGameState();
      gameState.players.player1.health = 0;
      gameState.players.player2.health = 50;
      
      const result = startNewRound(gameState);
      expect(result.players.player1.health).toBe(100);
      expect(result.players.player2.health).toBe(100);
    });

    it('should reset to player 1 turn', () => {
      const gameState = createTestGameState();
      gameState.currentPlayer = 2;
      
      const result = startNewRound(gameState);
      expect(result.currentPlayer).toBe(1);
    });

    it('should reset turn state', () => {
      const gameState = createTestGameState();
      gameState.turnState.turnNumber = 5;
      gameState.turnState.playerActions.hasFired = true;
      gameState.turnState.playerActions.hasAimed = true;
      
      const result = startNewRound(gameState);
      expect(result.turnState.turnNumber).toBe(1);
      expect(result.turnState.playerActions.hasFired).toBe(false);
      expect(result.turnState.playerActions.hasAimed).toBe(false);
      expect(result.turnState.turnStartTime).toBeTruthy();
    });

    it('should clear round winner and end time', () => {
      const gameState = createTestGameState();
      // Add round-specific state
      const stateWithRound = {
        ...gameState,
        roundWinner: 1 as 1 | 2,
        roundEndTime: Date.now(),
        isRoundActive: false,
      };
      
      const result = startNewRound(stateWithRound);
      expect(result.roundWinner).toBe(null);
      expect(result.roundEndTime).toBe(null);
      expect(result.isRoundActive).toBe(true);
    });
  });

  describe('endCurrentRound', () => {
    it('should set round as inactive', () => {
      const gameState = createTestGameState();
      const result = endCurrentRound(gameState, 1);
      
      expect(result.isRoundActive).toBe(false);
    });

    it('should set round end time', () => {
      const gameState = createTestGameState();
      const beforeTime = Date.now();
      const result = endCurrentRound(gameState, 1);
      const afterTime = Date.now();
      
      expect(result.roundEndTime).toBeGreaterThanOrEqual(beforeTime);
      expect(result.roundEndTime).toBeLessThanOrEqual(afterTime);
    });

    it('should clear turn start time', () => {
      const gameState = createTestGameState();
      const result = endCurrentRound(gameState, 1);
      
      expect(result.turnState.turnStartTime).toBe(null);
    });
  });

  describe('resetGameSession', () => {
    it('should reset all scores to zero', () => {
      const gameState = createTestGameState();
      gameState.sessionScores.player1Wins = 5;
      gameState.sessionScores.player2Wins = 3;
      
      const result = resetGameSession(gameState);
      expect(result.sessionScores.player1Wins).toBe(0);
      expect(result.sessionScores.player2Wins).toBe(0);
    });

    it('should reset round number to 1', () => {
      const gameState = createTestGameState();
      gameState.roundNumber = 10;
      
      const result = resetGameSession(gameState);
      expect(result.roundNumber).toBe(1);
    });

    it('should reset game status to waiting', () => {
      const gameState = createTestGameState();
      gameState.gameStatus = 'game_over';
      
      const result = resetGameSession(gameState);
      expect(result.gameStatus).toBe('waiting');
    });

    it('should reset player health and scores', () => {
      const gameState = createTestGameState();
      gameState.players.player1.health = 0;
      gameState.players.player1.score = 100;
      gameState.players.player2.health = 50;
      gameState.players.player2.score = 200;
      
      const result = resetGameSession(gameState);
      expect(result.players.player1.health).toBe(100);
      expect(result.players.player1.score).toBe(0);
      expect(result.players.player2.health).toBe(100);
      expect(result.players.player2.score).toBe(0);
    });

    it('should reset turn state', () => {
      const gameState = createTestGameState();
      gameState.turnState.turnNumber = 10;
      gameState.turnState.playerActions.hasFired = true;
      gameState.turnState.playerActions.hasAimed = true;
      
      const result = resetGameSession(gameState);
      expect(result.turnState.turnNumber).toBe(1);
      expect(result.turnState.playerActions.hasFired).toBe(false);
      expect(result.turnState.playerActions.hasAimed).toBe(false);
      expect(result.turnState.turnStartTime).toBe(null);
    });
  });
});
