// ABOUTME: Main App component for Mountain Shoot mobile game
// ABOUTME: Renders the title screen and manages app-level state and navigation

import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GameStateProvider, useGameState } from './src/game/GameStateContext';

// Lock screen orientation to landscape on app start
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

// Game content component that uses game state
const GameContent: React.FC = () => {
  const { gameState } = useGameState();

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
          Current Player: {gameState.currentPlayer} | 
          Status: {gameState.gameStatus} | 
          Round: {gameState.roundNumber}
        </Text>
        <Text style={styles.scoreText}>
          Player 1: {gameState.sessionScores.player1Wins} wins | 
          Player 2: {gameState.sessionScores.player2Wins} wins
        </Text>
      </View>
      
      <View style={styles.gameArea}>
        <Text style={styles.placeholder}>Game Area - Coming Soon</Text>
        <Text style={styles.playerPositions}>
          Player 1 at ({gameState.players.player1.position.x}, {gameState.players.player1.position.y}){'\n'}
          Player 2 at ({gameState.players.player2.position.x}, {gameState.players.player2.position.y})
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
    fontSize: 14,
    color: '#FFFF00',
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
  },
});
