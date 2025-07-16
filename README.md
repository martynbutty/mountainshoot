# Mountain Shoot Mobile Game

A mobile recreation of the classic Atari "Mountain Shoot" artillery game for Android and iOS platforms.

## Overview

Mountain Shoot is a 2-player turn-based artillery game where players take turns firing projectiles at each other across randomly generated terrain. The first player to hit their opponent wins the round.

## Features

- **Cross-platform**: Runs on both Android and iOS
- **Local multiplayer**: Two players share the same device
- **Physics simulation**: Realistic projectile motion with wind effects
- **Random terrain**: Procedurally generated landscapes each round
- **Retro pixel art**: Authentic Atari-style graphics
- **Three difficulty levels**: Easy, Medium, and Very Difficult

## Technology Stack

- **React Native** with Expo for cross-platform development
- **TypeScript** for type safety
- **React Native Skia** for pixel art rendering and animations
- **Custom physics engine** for projectile motion and wind effects
- **Expo AV** for sound effects
- **Jest** and React Native Testing Library for testing

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mountain-shoot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on device/simulator:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

### Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

### Linting

Check code quality:
```bash
npm run lint
# or
yarn lint
```

## Development Status

This project is currently in development. See `todo.md` for current progress and `plan.md` for the detailed development roadmap.

### Current Status: Step 1 Complete
- ✅ Project setup and basic structure
- ✅ TypeScript configuration
- ✅ Testing framework setup
- ✅ Basic App component with title screen
- ✅ Landscape orientation lock

### Next Steps
- Game state management system
- Turn-based game logic
- Physics engine implementation

## Project Structure

```
src/
├── components/     # Reusable UI components
├── game/          # Game logic and state management
├── physics/       # Physics engine and calculations
├── audio/         # Sound effects management
├── utils/         # Utility functions
└── types/         # TypeScript type definitions
```

## Contributing

This project follows test-driven development (TDD) principles:
1. Write failing tests first
2. Implement minimal code to pass tests
3. Refactor for quality
4. Ensure all tests pass before committing

## License

This project is for educational purposes and recreates the classic Atari Mountain Shoot game.
