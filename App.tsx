// ABOUTME: Main App component for Mountain Shoot mobile game
// ABOUTME: Renders the title screen and manages app-level state and navigation

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GameStateProvider, useGameState, useGameActions } from './src/game/GameStateContext';
import { getTurnStatusDescription, formatTurnDuration, getTurnDuration } from './src/game/turnUtils';

// Lock screen orientation to landscape on app start
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

// Game content component that uses game state
const GameContent: React.FC = () => {
  const { gameState } = useGameState();
  const actions = useGameActions();
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second for turn duration display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const turnDuration = getTurnDuration(gameState);
  const turnStatus = getTurnStatusDescription(gameState);

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="light" hidden={true} />
      <StatusBar hidden={true} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MOUNTAIN SHOOT</Text>
        <Text style={styles.subtitle}>Artillery Game</Text>
        <Text style={styles.instructions}>
          Two-player artillery game{'\n'}
          Take turns firing at your opponent{'\n'}
          First hit wins the round!
        </Text>
      </View>
      
      <View style={styles.gameInfo}>
        <Text style={styles.gameInfoText}>
          {turnStatus}
        </Text>
        {gameState.turnState.turnStartTime && (
          <Text style={styles.turnDurationText}>
            Turn Duration: {formatTurnDuration(turnDuration)}
          </Text>
        )}
        <Text style={styles.scoreText}>
          Player 1: {gameState.sessionScores.player1Wins} wins | 
          Player 2: {gameState.sessionScores.player2Wins} wins
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.button, gameState.gameStatus === 'waiting' ? styles.buttonActive : styles.buttonDisabled]}
          onPress={actions.startGame}
          disabled={gameState.gameStatus !== 'waiting'}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, actions.canPlayerAct() ? styles.buttonActive : styles.buttonDisabled]}
          onPress={actions.playerAimed}
          disabled={!actions.canPlayerAct()}
        >
          <Text style={styles.buttonText}>Aim</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, actions.canPlayerAct() && !gameState.turnState.playerActions.hasFired ? styles.buttonActive : styles.buttonDisabled]}
          onPress={() => {
            actions.playerFired();
            // Simulate turn switch after firing
            setTimeout(() => {
              actions.switchToNextPlayer();
            }, 1000);
          }}
          disabled={!actions.canPlayerAct() || gameState.turnState.playerActions.hasFired}
        >
          <Text style={styles.buttonText}>Fire</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary]}
          onPress={actions.resetGame}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.gameArea}>
        <Text style={styles.placeholder}>Game Area - Coming Soon</Text>
        <Text style={styles.playerPositions}>
          Player 1 at ({gameState.players.player1.position.x}, {gameState.players.player1.position.y}){'\n'}
          Player 2 at ({gameState.players.player2.position.x}, {gameState.players.player2.position.y})
        </Text>
        <Text style={styles.debugInfo}>
          Turn Actions: Aimed={gameState.turnState.playerActions.hasAimed ? 'Yes' : 'No'}, 
          Fired={gameState.turnState.playerActions.hasFired ? 'Yes' : 'No'}
        </Text>
      </View>
    </View>
  );
};

export default function App(): JSX.Element {
  return (
    <GameStateProvider>
      <GameContent />
    </GameStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00FF00',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'monospace',
    textAlign: 'center',
    lineHeight: 24,
  },
  gameInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gameInfoText: {
    fontSize: 16,
    color: '#FFFF00',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 5,
  },
  turnDurationText: {
    fontSize: 14,
    color: '#00FFFF',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 14,
    color: '#00FFFF',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonActive: {
    backgroundColor: '#003300',
    borderColor: '#00FF00',
  },
  buttonDisabled: {
    backgroundColor: '#333333',
    borderColor: '#666666',
  },
  buttonSecondary: {
    backgroundColor: '#330000',
    borderColor: '#FF0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'monospace',
    fontSize: 14,
    textAlign: 'center',
  },
  gameArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333333',
  },
  placeholder: {
    fontSize: 18,
    color: '#666666',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  playerPositions: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,
  },
  debugInfo: {
    fontSize: 10,
    color: '#666666',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
