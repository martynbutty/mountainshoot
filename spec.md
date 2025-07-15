# Mountain Shoot Mobile Game Specification

## Overview
A mobile recreation of the classic Atari computer game "Mountain Shoot" - a 2-player artillery game for Android and iOS platforms.

## Core Gameplay
- **Game Type**: 2-player turn-based artillery game
- **Objective**: First player to hit their opponent wins the round
- **Platform**: Mobile (Android & iOS)
- **Multiplayer**: Local only (two players sharing same device)

## Game Mechanics

### Controls
- **Input Method**: Sliders or dials for angle and power adjustment
- **Interface**: Shared controls at bottom of screen
- **Turn Indication**: Clear visual indicator showing whose turn it is
- **Aiming Feedback**: No visual trajectory preview or aiming assistance

### Terrain & Environment
- **Terrain Generation**: Completely random hilly terrain each game
- **Terrain Destruction**: Shots create visual craters but don't affect physics/gameplay
- **Wind System**: 
  - Randomized direction and strength each turn
  - Displayed to players before shooting (e.g., "19 mph wind to right")
  - No wind sound effects

### Difficulty Levels
1. **Easy**: Light winds, gentle hills
2. **Medium**: Moderate winds, moderate terrain complexity  
3. **Very Difficult**: Strong gusty winds, steep mountains, limited powder per game

### Limited Powder (Very Difficult Only)
- Each player receives fixed total powder amount per game
- Players strategically distribute powder across shots
- Resource management adds strategic depth

### Combat System
- **Winning Condition**: Any hit at all (including glancing blows) wins the round
- **Shot Animation**: Full projectile arc animation from cannon to impact
- **Impact Effects**: Visual explosion with sound effect

## Visual Design

### Art Style
- **Aesthetic**: Pixel art closely mimicking original Atari graphics
- **Artillery Pieces**: Simple pixel art cannon shapes
- **Screen Orientation**: Landscape only
- **Layout**: Terrain/battlefield dominates screen, controls at bottom

### User Interface
- **Platform Consistency**: Identical experience across Android and iOS
- **Turn Indicator**: Clear visual showing current player
- **Wind Display**: Text showing wind speed and direction
- **Score Display**: Simple win/loss counter

## Audio Design
- **Sound Effects**: Cannon fire and explosion sounds only
- **Background Music**: None
- **Wind Audio**: No wind sound effects
- **Style**: Match retro aesthetic

## Scoring System
- **Format**: Simple win/loss count (Player 1: X wins, Player 2: Y wins)
- **Session Length**: Players can play indefinitely until choosing to quit
- **Persistence**: Scores reset when app is closed (session-based only)
- **History**: No detailed statistics or game history saved

## Technical Requirements

### Platform Support
- **Android**: Compatible with modern Android devices
- **iOS**: Compatible with modern iOS devices
- **Cross-Platform**: Identical experience on both platforms
- **Framework**: Use cross-platform development approach for consistency

### Performance
- **Orientation**: Landscape mode only
- **Controls**: Touch-optimized sliders/dials
- **Animation**: Smooth projectile trajectory animation
- **Physics**: Real-time wind effect calculations on projectile path

## Monetization
- **Model**: Completely free
- **No Ads**: No advertising
- **No IAP**: No in-app purchases
- **No Premium Features**: All content available to all users

## User Experience

### Onboarding
- **Tutorial**: None - let players discover through play
- **Instructions**: Minimal, maintaining authentic retro experience
- **Learning Curve**: Players figure out mechanics organically

### Game Flow
1. App launches to main screen
2. Players start new game
3. Random terrain generates
4. Player 1 takes turn (adjust angle/power, fire)
5. Projectile animates with wind effects
6. Impact shows explosion and result
7. Turn switches to Player 2
8. Repeat until someone hits opponent
9. Score updates, new round begins with new terrain
10. Continue until players choose to quit

### Session Management
- **Game State**: Not saved between app sessions
- **Score Reset**: Automatic when app closes
- **Quick Start**: Immediate gameplay access

## Development Priorities
1. **Core Gameplay**: Artillery mechanics with physics
2. **Visual System**: Pixel art terrain generation and animation
3. **Control System**: Intuitive touch-based angle/power adjustment
4. **Wind System**: Random generation and physics integration
5. **Audio Integration**: Cannon and explosion sound effects
6. **Difficulty Scaling**: Three difficulty levels with appropriate parameters
7. **UI Polish**: Clean, retro-styled interface
8. **Cross-Platform**: Consistent experience across devices

## Reference Material
- Original game screenshots: https://www.mobygames.com/game/149402/mountain-shoot/screenshots/
- Maintain authentic feel while optimizing for mobile touch interface

## Success Criteria
- Faithful recreation of original Mountain Shoot gameplay
- Intuitive mobile controls
- Smooth performance on target devices
- Engaging local multiplayer experience
- Authentic retro visual and audio aesthetic
