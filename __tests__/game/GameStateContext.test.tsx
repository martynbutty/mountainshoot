// ABOUTME: Tests for game state context and management
// ABOUTME: Covers state initialization, actions, and context provider functionality

import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { GameStateProvider, useGameState, useGameActions } from '../../src/game/GameStateContext';

// Test component to access game state
const TestComponent: React.FC = () => {
  const { gameState } = useGameState();
  const actions = useGameActions();

  return (
    <>
      <Text testID="current-player">{gameState.currentPlayer}</Text>
      <Text testID="game-status">{gameState.gameStatus}</Text>
      <Text testID="round-number">{gameState.roundNumber}</Text>
      <Text testID="player1-wins">{gameState.sessionScores.player1Wins}</Text>
      <Text testID="player2-wins">{gameState.sessionScores.player2Wins}</Text>
      <Text testID="player1-position">{`${gameState.players.player1.position.x},${gameState.players.player1.position.y}`}</Text>
      <Text testID="player2-position">{`${gameState.players.player2.position.x},${gameState.players.player2.position.y}`}</Text>
    </>
  );
};

// Test component with actions
const TestComponentWithActions: React.FC = () => {
  const { gameState } = useGameState();
  const actions = useGameActions();

  return (
    <>
      <Text testID="current-player">{gameState.currentPlayer}</Text>
      <Text testID="game-status">{gameState.gameStatus}</Text>
      <Text testID="round-number">{gameState.roundNumber}</Text>
      <Text testID="player1-wins">{gameState.sessionScores.player1Wins}</Text>
      <Text testID="player2-wins">{gameState.sessionScores.player2Wins}</Text>
      <Text 
        testID="start-game" 
        onPress={() => actions.startGame()}
      >
        Start Game
      </Text>
      <Text 
        testID="switch-turn" 
        onPress={() => actions.switchTurn()}
      >
        Switch Turn
      </Text>
      <Text 
        testID="player1-hit" 
        onPress={() => actions.playerHit(1)}
      >
        Player 1 Hit
      </Text>
      <Text 
        testID="player2-hit" 
        onPress={() => actions.playerHit(2)}
      >
        Player 2 Hit
      </Text>
      <Text 
        testID="start-new-round" 
        onPress={() => actions.startNewRound()}
      >
        Start New Round
      </Text>
      <Text 
        testID="reset-game" 
        onPress={() => actions.resetGame()}
      >
        Reset Game
      </Text>
    </>
  );
};

describe('GameStateContext', () => {
  describe('Initial State', () => {
    it('should provide correct initial game state', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponent />
        </GameStateProvider>
      );

      expect(getByTestId('current-player').children[0]).toBe('1');
      expect(getByTestId('game-status').children[0]).toBe('waiting');
      expect(getByTestId('round-number').children[0]).toBe('1');
      expect(getByTestId('player1-wins').children[0]).toBe('0');
      expect(getByTestId('player2-wins').children[0]).toBe('0');
    });

    it('should position players correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponent />
        </GameStateProvider>
      );

      expect(getByTestId('player1-position').children[0]).toBe('100,300');
      expect(getByTestId('player2-position').children[0]).toBe('700,300');
    });
  });

  describe('Game Actions', () => {
    it('should start game correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      expect(getByTestId('game-status').children[0]).toBe('waiting');

      act(() => {
        getByTestId('start-game').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('playing');
    });

    it('should switch turns correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      expect(getByTestId('current-player').children[0]).toBe('1');

      act(() => {
        getByTestId('switch-turn').props.onPress();
      });

      expect(getByTestId('current-player').children[0]).toBe('2');

      act(() => {
        getByTestId('switch-turn').props.onPress();
      });

      expect(getByTestId('current-player').children[0]).toBe('1');
    });

    it('should handle player 1 hit correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      expect(getByTestId('game-status').children[0]).toBe('waiting');
      expect(getByTestId('player2-wins').children[0]).toBe('0');

      act(() => {
        getByTestId('player1-hit').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('round_over');
      expect(getByTestId('player2-wins').children[0]).toBe('1');
    });

    it('should handle player 2 hit correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      expect(getByTestId('game-status').children[0]).toBe('waiting');
      expect(getByTestId('player1-wins').children[0]).toBe('0');

      act(() => {
        getByTestId('player2-hit').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('round_over');
      expect(getByTestId('player1-wins').children[0]).toBe('1');
    });

    it('should start new round correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      // Hit player 1 to end round
      act(() => {
        getByTestId('player1-hit').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('round_over');
      expect(getByTestId('round-number').children[0]).toBe('1');

      // Start new round
      act(() => {
        getByTestId('start-new-round').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('playing');
      expect(getByTestId('round-number').children[0]).toBe('2');
      expect(getByTestId('current-player').children[0]).toBe('1'); // Should reset to player 1
    });

    it('should reset game correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      // Make some changes
      act(() => {
        getByTestId('start-game').props.onPress();
        getByTestId('switch-turn').props.onPress();
        getByTestId('player1-hit').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('round_over');
      expect(getByTestId('current-player').children[0]).toBe('2');
      expect(getByTestId('player2-wins').children[0]).toBe('1');

      // Reset game
      act(() => {
        getByTestId('reset-game').props.onPress();
      });

      expect(getByTestId('game-status').children[0]).toBe('waiting');
      expect(getByTestId('current-player').children[0]).toBe('1');
      expect(getByTestId('round-number').children[0]).toBe('1');
      expect(getByTestId('player1-wins').children[0]).toBe('0');
      expect(getByTestId('player2-wins').children[0]).toBe('0');
    });
  });

  describe('Context Provider', () => {
    it('should throw error when useGameState is used outside provider', () => {
      const TestComponentOutsideProvider = () => {
        try {
          useGameState();
          return <Text testID="no-error">No Error</Text>;
        } catch (error) {
          return <Text testID="error">{(error as Error).message}</Text>;
        }
      };

      const { getByTestId } = render(<TestComponentOutsideProvider />);
      
      expect(getByTestId('error').children[0]).toBe('useGameState must be used within a GameStateProvider');
    });

    it('should provide context correctly when used within provider', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponent />
        </GameStateProvider>
      );

      // Should not throw error and should render initial state
      expect(getByTestId('current-player').children[0]).toBe('1');
    });
  });

  describe('Session Score Tracking', () => {
    it('should track multiple round wins correctly', () => {
      const { getByTestId } = render(
        <GameStateProvider>
          <TestComponentWithActions />
        </GameStateProvider>
      );

      // Player 2 wins first round
      act(() => {
        getByTestId('player1-hit').props.onPress();
      });
      expect(getByTestId('player2-wins').children[0]).toBe('1');

      // Start new round
      act(() => {
        getByTestId('start-new-round').props.onPress();
      });

      // Player 1 wins second round
      act(() => {
        getByTestId('player2-hit').props.onPress();
      });
      expect(getByTestId('player1-wins').children[0]).toBe('1');
      expect(getByTestId('player2-wins').children[0]).toBe('1');

      // Start another round
      act(() => {
        getByTestId('start-new-round').props.onPress();
      });

      // Player 2 wins again
      act(() => {
        getByTestId('player1-hit').props.onPress();
      });
      expect(getByTestId('player1-wins').children[0]).toBe('1');
      expect(getByTestId('player2-wins').children[0]).toBe('2');
    });
  });
});
