// ABOUTME: Integration tests for win conditions with game state context
// ABOUTME: Tests the complete win condition flow with React context

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { GameStateProvider, useGameState, useGameActions } from '../../src/game/GameStateContext';

// Test component that uses the game state and actions
const TestComponent = () => {
  const { gameState } = useGameState();
  const actions = useGameActions();

  return (
    <>
      <text testID="game-status">{gameState.gameStatus}</text>
      <text testID="round-number">{gameState.roundNumber}</text>
      <text testID="player1-wins">{gameState.sessionScores.player1Wins}</text>
      <text testID="player2-wins">{gameState.sessionScores.player2Wins}</text>
      <text testID="current-player">{gameState.currentPlayer}</text>
      <text testID="round-winner">{gameState.roundWinner || 'none'}</text>
      <text testID="is-round-active">{gameState.isRoundActive ? 'true' : 'false'}</text>
      
      <button testID="start-game" onPress={actions.startGame}>Start Game</button>
      <button testID="record-hit-p1" onPress={() => actions.recordHit(1)}>P1 Hit</button>
      <button testID="record-hit-p2" onPress={() => actions.recordHit(2)}>P2 Hit</button>
      <button testID="start-new-round" onPress={actions.startNewRound}>New Round</button>
      <button testID="reset-game-session" onPress={actions.resetGameSession}>Reset Session</button>
    </>
  );
};

const TestApp = () => (
  <GameStateProvider>
    <TestComponent />
  </GameStateProvider>
);

describe('Win Conditions Integration', () => {
  it('should handle complete round win flow', async () => {
    const { getByTestId } = render(<TestApp />);
    
    // Initial state
    expect(getByTestId('game-status').props.children).toBe('waiting');
    expect(getByTestId('round-number').props.children).toBe(1);
    expect(getByTestId('player1-wins').props.children).toBe(0);
    expect(getByTestId('player2-wins').props.children).toBe(0);
    expect(getByTestId('round-winner').props.children).toBe('none');
    expect(getByTestId('is-round-active').props.children).toBe('false');
    
    // Start game
    await act(async () => {
      fireEvent.press(getByTestId('start-game'));
    });
    
    expect(getByTestId('game-status').props.children).toBe('playing');
    expect(getByTestId('current-player').props.children).toBe(1);
    
    // Player 1 gets hit (Player 2 wins)
    await act(async () => {
      fireEvent.press(getByTestId('record-hit-p1'));
    });
    
    expect(getByTestId('game-status').props.children).toBe('round_over');
    expect(getByTestId('round-winner').props.children).toBe(2);
    expect(getByTestId('player2-wins').props.children).toBe(1);
    expect(getByTestId('player1-wins').props.children).toBe(0);
    expect(getByTestId('is-round-active').props.children).toBe('false');
    
    // Start new round
    await act(async () => {
      fireEvent.press(getByTestId('start-new-round'));
    });
    
    expect(getByTestId('game-status').props.children).toBe('playing');
    expect(getByTestId('round-number').props.children).toBe(2);
    expect(getByTestId('current-player').props.children).toBe(1);
    expect(getByTestId('round-winner').props.children).toBe('none');
    expect(getByTestId('is-round-active').props.children).toBe('true');
    
    // Player 2 gets hit (Player 1 wins)
    await act(async () => {
      fireEvent.press(getByTestId('record-hit-p2'));
    });
    
    expect(getByTestId('game-status').props.children).toBe('round_over');
    expect(getByTestId('round-winner').props.children).toBe(1);
    expect(getByTestId('player1-wins').props.children).toBe(1);
    expect(getByTestId('player2-wins').props.children).toBe(1);
  });

  it('should handle game session reset', async () => {
    const { getByTestId } = render(<TestApp />);
    
    // Set up some game state
    await act(async () => {
      fireEvent.press(getByTestId('start-game'));
    });
    
    await act(async () => {
      fireEvent.press(getByTestId('record-hit-p1'));
    });
    
    // Verify state before reset
    expect(getByTestId('game-status').props.children).toBe('round_over');
    expect(getByTestId('round-number').props.children).toBe(1);
    expect(getByTestId('player2-wins').props.children).toBe(1);
    expect(getByTestId('round-winner').props.children).toBe(2);
    
    // Reset game session
    await act(async () => {
      fireEvent.press(getByTestId('reset-game-session'));
    });
    
    // Verify everything is reset
    expect(getByTestId('game-status').props.children).toBe('waiting');
    expect(getByTestId('round-number').props.children).toBe(1);
    expect(getByTestId('player1-wins').props.children).toBe(0);
    expect(getByTestId('player2-wins').props.children).toBe(0);
    expect(getByTestId('round-winner').props.children).toBe('none');
    expect(getByTestId('is-round-active').props.children).toBe('false');
  });

  it('should handle multiple rounds correctly', async () => {
    const { getByTestId } = render(<TestApp />);
    
    // Start game
    await act(async () => {
      fireEvent.press(getByTestId('start-game'));
    });
    
    // Play several rounds
    for (let round = 1; round <= 3; round++) {
      expect(getByTestId('round-number').props.children).toBe(round);
      expect(getByTestId('game-status').props.children).toBe('playing');
      
      // Player 1 gets hit in each round (Player 2 wins)
      await act(async () => {
        fireEvent.press(getByTestId('record-hit-p1'));
      });
      
      expect(getByTestId('game-status').props.children).toBe('round_over');
      expect(getByTestId('round-winner').props.children).toBe(2);
      expect(getByTestId('player2-wins').props.children).toBe(round);
      
      if (round < 3) {
        await act(async () => {
          fireEvent.press(getByTestId('start-new-round'));
        });
      }
    }
    
    // Final state check
    expect(getByTestId('player1-wins').props.children).toBe(0);
    expect(getByTestId('player2-wins').props.children).toBe(3);
    expect(getByTestId('round-number').props.children).toBe(3);
  });

  it('should maintain player positions across rounds', async () => {
    const { getByTestId } = render(<TestApp />);
    
    // Start game
    await act(async () => {
      fireEvent.press(getByTestId('start-game'));
    });
    
    // Record hit and start new round
    await act(async () => {
      fireEvent.press(getByTestId('record-hit-p1'));
    });
    
    await act(async () => {
      fireEvent.press(getByTestId('start-new-round'));
    });
    
    // Player 1 should always start new rounds
    expect(getByTestId('current-player').props.children).toBe(1);
    expect(getByTestId('game-status').props.children).toBe('playing');
    expect(getByTestId('is-round-active').props.children).toBe('true');
  });
});
