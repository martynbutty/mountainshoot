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
});

// Game state reducer
const gameStateReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStatus: 'playing',
        turnState: {
          ...state.turnState,
          turnStartTime: Date.now(),
        },
      };

    case 'END_GAME':
      return {
        ...state,
        gameStatus: 'game_over',
      };

    case 'START_TURN':
      return {
        ...state,
        turnState: {
          ...state.turnState,
          turnStartTime: Date.now(),
          playerActions: {
            hasFired: false,
            hasAimed: false,
          },
        },
      };

    case 'END_TURN':
      return {
        ...state,
        turnState: {
          ...state.turnState,
          turnStartTime: null,
        },
      };

    case 'SWITCH_TURN':
      const nextPlayer = state.currentPlayer === 1 ? 2 : 1;
      return {
        ...state,
        currentPlayer: nextPlayer,
        turnState: {
          ...state.turnState,
          turnStartTime: Date.now(),
          turnNumber: state.turnState.turnNumber + 1,
          playerActions: {
            hasFired: false,
            hasAimed: false,
          },
        },
      };

    case 'PLAYER_AIMED':
      return {
        ...state,
        turnState: {
          ...state.turnState,
          playerActions: {
            ...state.turnState.playerActions,
            hasAimed: true,
          },
        },
      };

    case 'PLAYER_FIRED':
      return {
        ...state,
        turnState: {
          ...state.turnState,
          playerActions: {
            ...state.turnState.playerActions,
            hasFired: true,
          },
        },
      };

    case 'RESET_TURN':
      return {
        ...state,
        turnState: {
          ...state.turnState,
          playerActions: {
            hasFired: false,
            hasAimed: false,
          },
          turnStartTime: Date.now(),
        },
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
        turnState: {
          ...state.turnState,
          turnStartTime: null,
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

    case 'RESET_GAME':
      return createInitialGameState();

    case 'RECORD_HIT':
      const hitPlayerId = action.playerId;
      const roundWinner = hitPlayerId === 1 ? 2 : 1;
      
      return {
        ...state,
        gameStatus: 'round_over',
        roundWinner,
        roundEndTime: Date.now(),
        isRoundActive: false,
        sessionScores: {
          ...state.sessionScores,
          [`player${roundWinner}Wins` as keyof typeof state.sessionScores]: 
            state.sessionScores[`player${roundWinner}Wins` as keyof typeof state.sessionScores] + 1,
        },
        turnState: {
          ...state.turnState,
          turnStartTime: null,
        },
      };

    case 'END_ROUND':
      return {
        ...state,
        gameStatus: 'round_over',
        roundWinner: action.winnerId,
        roundEndTime: Date.now(),
        isRoundActive: false,
        turnState: {
          ...state.turnState,
          turnStartTime: null,
        },
      };

    case 'RESET_GAME_SESSION':
      return {
        ...state,
        gameStatus: 'waiting',
        roundNumber: 1,
        currentPlayer: 1,
        players: {
          player1: {
            ...state.players.player1,
            health: 100,
            score: 0,
          },
          player2: {
            ...state.players.player2,
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
  const { dispatch, gameState } = useGameState();

  // Turn validation functions
  const canPlayerAct = (): boolean => {
    return gameState.gameStatus === 'playing' && 
           gameState.turnState.turnStartTime !== null &&
           !gameState.turnState.playerActions.hasFired;
  };

  const isCurrentPlayerTurn = (playerId: 1 | 2): boolean => {
    return gameState.currentPlayer === playerId && canPlayerAct();
  };

  return {
    // Basic game actions
    startGame: () => dispatch({ type: 'START_GAME' }),
    endGame: () => dispatch({ type: 'END_GAME' }),
    playerHit: (playerId: 1 | 2) => dispatch({ type: 'PLAYER_HIT', playerId }),
    startNewRound: () => dispatch({ type: 'START_NEW_ROUND' }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),

    // Turn management actions
    startTurn: () => dispatch({ type: 'START_TURN' }),
    endTurn: () => dispatch({ type: 'END_TURN' }),
    switchToNextPlayer: () => dispatch({ type: 'SWITCH_TURN' }),
    resetTurn: () => dispatch({ type: 'RESET_TURN' }),

    // Player action tracking
    playerAimed: () => dispatch({ type: 'PLAYER_AIMED' }),
    playerFired: () => dispatch({ type: 'PLAYER_FIRED' }),

    // Win condition actions
    recordHit: (playerId: 1 | 2) => dispatch({ type: 'RECORD_HIT', playerId }),
    endRound: (winnerId: 1 | 2) => dispatch({ type: 'END_ROUND', winnerId }),
    resetGameSession: () => dispatch({ type: 'RESET_GAME_SESSION' }),

    // Turn validation functions
    canPlayerAct,
    isCurrentPlayerTurn,

    // Legacy action for backward compatibility
    switchTurn: () => dispatch({ type: 'SWITCH_TURN' }),
  };
};
