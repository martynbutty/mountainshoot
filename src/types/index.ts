// ABOUTME: Core TypeScript type definitions for Mountain Shoot game
// ABOUTME: Defines interfaces for game state, players, and configuration

export interface Player {
  id: 1 | 2;
  position: {
    x: number;
    y: number;
  };
  health: number;
  score: number;
}

export interface GameState {
  currentPlayer: 1 | 2;
  gameStatus: 'waiting' | 'playing' | 'round_over' | 'game_over';
  roundNumber: number;
  players: {
    player1: Player;
    player2: Player;
  };
  sessionScores: {
    player1Wins: number;
    player2Wins: number;
  };
}

export interface GameConfig {
  difficulty: 'easy' | 'medium' | 'very_difficult';
  screenWidth: number;
  screenHeight: number;
}

export type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'SWITCH_TURN' }
  | { type: 'PLAYER_HIT'; playerId: 1 | 2 }
  | { type: 'START_NEW_ROUND' }
  | { type: 'RESET_GAME' };
