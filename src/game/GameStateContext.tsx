// ABOUTME: React Context for managing global game state
// ABOUTME: Provides game state and actions to all components

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, Player } from '../types';

// Initial game state
const createInitialGameState = (): GameState => ({
  currentPlayer: 1,
  gameStatus: 'waiting',
  roundNumber: 1,
  players: {
    player1: {
      id: 1,
      position: { x: 100, y: 300 }, // Left side of screen
      health: 100,
      score: 0,
    },
    player2: {
      id: 2,
      position: { x: 700, y: 300 }, // Right side of screen
      health: 100,
      score: 0,
    },
  },
  sessionScores: {
    player1Wins: 0,
    player2Wins: 0,
  },
});

// Game state reducer
const gameStateReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStatus: 'playing',
      };

    case 'END_GAME':
      return {
        ...state,
        gameStatus: 'game_over',
      };

    case 'SWITCH_TURN':
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      };

    case 'PLAYER_HIT':
      const hitPlayer = action.playerId;
      const winner = hitPlayer === 1 ? 2 : 1;
      
      return {
        ...state,
        gameStatus: 'round_over',
        sessionScores: {
          ...state.sessionScores,
          [`player${winner}Wins` as keyof typeof state.sessionScores]: 
            state.sessionScores[`player${winner}Wins` as keyof typeof state.sessionScores] + 1,
        },
      };

    case 'START_NEW_ROUND':
      return {
        ...state,
        gameStatus: 'playing',
        roundNumber: state.roundNumber + 1,
        currentPlayer: 1, // Player 1 always starts new round
        players: {
          player1: {
            ...state.players.player1,
            health: 100, // Reset health for new round
          },
          player2: {
            ...state.players.player2,
            health: 100, // Reset health for new round
          },
        },
      };

    case 'RESET_GAME':
      return createInitialGameState();

    default:
      return state;
  }
};

// Context type
interface GameStateContextType {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Create context
const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

// Provider component
interface GameStateProviderProps {
  children: ReactNode;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, createInitialGameState());

  return (
    <GameStateContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

// Hook to use game state
export const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

// Hook for game actions
export const useGameActions = () => {
  const { dispatch } = useGameState();

  return {
    startGame: () => dispatch({ type: 'START_GAME' }),
    endGame: () => dispatch({ type: 'END_GAME' }),
    switchTurn: () => dispatch({ type: 'SWITCH_TURN' }),
    playerHit: (playerId: 1 | 2) => dispatch({ type: 'PLAYER_HIT', playerId }),
    startNewRound: () => dispatch({ type: 'START_NEW_ROUND' }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
  };
};
