// ABOUTME: Win condition detection and round management functions
// ABOUTME: Handles hit detection, scoring, and round transitions

import { GameState } from '../types';

/**
 * Check if a projectile hit a player based on positions and hitbox size
 */
export const checkForHit = (
  projectilePosition: { x: number; y: number },
  playerPosition: { x: number; y: number },
  hitboxSize: number
): boolean => {
  const dx = projectilePosition.x - playerPosition.x;
  const dy = projectilePosition.y - playerPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance <= hitboxSize;
};

/**
 * Declare the winner of the current round
 */
export const declareRoundWinner = (
  gameState: GameState,
  hitPlayerId: 1 | 2
): GameState => {
  const winner = hitPlayerId === 1 ? 2 : 1;
  
  return {
    ...gameState,
    gameStatus: 'round_over',
    roundWinner: winner,
    roundEndTime: Date.now(),
    isRoundActive: false,
    turnState: {
      ...gameState.turnState,
      turnStartTime: null,
    },
  };
};

/**
 * Update session scores when a player wins a round
 */
export const updateScores = (
  gameState: GameState,
  winnerId: 1 | 2
): GameState => {
  const scoreKey = winnerId === 1 ? 'player1Wins' : 'player2Wins';
  
  return {
    ...gameState,
    sessionScores: {
      ...gameState.sessionScores,
      [scoreKey]: gameState.sessionScores[scoreKey] + 1,
    },
  };
};

/**
 * Check if the game should end based on win limit
 */
export const checkForGameEnd = (
  gameState: GameState,
  winLimit: number
): boolean => {
  return gameState.sessionScores.player1Wins >= winLimit || 
         gameState.sessionScores.player2Wins >= winLimit;
};

/**
 * Start a new round with fresh state
 */
export const startNewRound = (gameState: GameState): GameState => {
  return {
    ...gameState,
    gameStatus: 'playing',
    roundNumber: gameState.roundNumber + 1,
    currentPlayer: 1, // Player 1 always starts new round
    players: {
      player1: {
        ...gameState.players.player1,
        health: 100,
      },
      player2: {
        ...gameState.players.player2,
        health: 100,
      },
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
    roundWinner: null,
    roundEndTime: null,
    isRoundActive: true,
  };
};

/**
 * End the current round and prepare for transition
 */
export const endCurrentRound = (
  gameState: GameState,
  winnerId: 1 | 2
): GameState => {
  return {
    ...gameState,
    isRoundActive: false,
    roundEndTime: Date.now(),
    roundWinner: winnerId,
    turnState: {
      ...gameState.turnState,
      turnStartTime: null,
    },
  };
};

/**
 * Reset the entire game session
 */
export const resetGameSession = (gameState: GameState): GameState => {
  return {
    ...gameState,
    gameStatus: 'waiting',
    roundNumber: 1,
    currentPlayer: 1,
    players: {
      player1: {
        ...gameState.players.player1,
        health: 100,
        score: 0,
      },
      player2: {
        ...gameState.players.player2,
        health: 100,
        score: 0,
      },
    },
    sessionScores: {
      player1Wins: 0,
      player2Wins: 0,
    },
    turnState: {
      turnStartTime: null,
      turnTimeLimit: null,
      playerActions: {
        hasFired: false,
        hasAimed: false,
      },
      turnNumber: 1,
    },
    roundWinner: null,
    roundEndTime: null,
    isRoundActive: false,
    gameWinner: null,
  };
};
