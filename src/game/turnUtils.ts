// ABOUTME: Turn management utility functions
// ABOUTME: Provides helper functions for turn validation and management

import { GameState } from '../types';

/**
 * Calculate how long the current turn has been active
 */
export const getTurnDuration = (gameState: GameState): number => {
  if (!gameState.turnState.turnStartTime) {
    return 0;
  }
  return Date.now() - gameState.turnState.turnStartTime;
};

/**
 * Check if the current turn has exceeded the time limit
 */
export const isTurnExpired = (gameState: GameState): boolean => {
  if (!gameState.turnState.turnTimeLimit) {
    return false; // No time limit set
  }
  return getTurnDuration(gameState) > gameState.turnState.turnTimeLimit;
};

/**
 * Get remaining time for the current turn
 */
export const getRemainingTurnTime = (gameState: GameState): number => {
  if (!gameState.turnState.turnTimeLimit) {
    return Infinity; // No time limit
  }
  const remaining = gameState.turnState.turnTimeLimit - getTurnDuration(gameState);
  return Math.max(0, remaining);
};

/**
 * Format turn duration for display
 */
export const formatTurnDuration = (duration: number): string => {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${remainingSeconds}s`;
};

/**
 * Check if player can perform a specific action
 */
export const canPlayerPerformAction = (
  gameState: GameState, 
  playerId: 1 | 2, 
  action: 'aim' | 'fire'
): boolean => {
  // Must be the current player's turn
  if (gameState.currentPlayer !== playerId) {
    return false;
  }

  // Game must be in playing state
  if (gameState.gameStatus !== 'playing') {
    return false;
  }

  // Turn must be active
  if (!gameState.turnState.turnStartTime) {
    return false;
  }

  // Check if turn has expired
  if (isTurnExpired(gameState)) {
    return false;
  }

  // Action-specific validation
  switch (action) {
    case 'aim':
      return true; // Can always aim during turn
    case 'fire':
      return !gameState.turnState.playerActions.hasFired; // Can only fire once per turn
    default:
      return false;
  }
};

/**
 * Get turn status description for UI
 */
export const getTurnStatusDescription = (gameState: GameState): string => {
  if (gameState.gameStatus !== 'playing') {
    return `Game ${gameState.gameStatus}`;
  }

  const player = `Player ${gameState.currentPlayer}`;
  const turnNum = `Turn ${gameState.turnState.turnNumber}`;
  
  if (!gameState.turnState.turnStartTime) {
    return `${player} - ${turnNum} (Not started)`;
  }

  if (gameState.turnState.playerActions.hasFired) {
    return `${player} - ${turnNum} (Fired)`;
  }

  if (gameState.turnState.playerActions.hasAimed) {
    return `${player} - ${turnNum} (Aimed)`;
  }

  return `${player} - ${turnNum} (Active)`;
};

/**
 * Validate turn transition
 */
export const canSwitchTurn = (gameState: GameState): boolean => {
  return gameState.gameStatus === 'playing' && 
         gameState.turnState.playerActions.hasFired;
};
