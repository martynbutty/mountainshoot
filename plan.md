# Mountain Shoot Mobile Game - Development Plan

## Project Overview
Building a cross-platform mobile recreation of the classic Atari "Mountain Shoot" artillery game using React Native for consistent Android/iOS experience.

## Technology Stack
- **Framework**: React Native with Expo
- **Graphics**: React Native Skia for pixel art rendering and animations
- **Physics**: Custom physics engine for projectile motion and wind effects
- **Audio**: Expo AV for sound effects
- **State Management**: React Context/Hooks
- **Testing**: Jest + React Native Testing Library

## High-Level Architecture

### Core Systems
1. **Game Engine**: Turn-based game loop, state management
2. **Physics Engine**: Projectile motion, wind effects, collision detection
3. **Rendering System**: Pixel art terrain, sprites, animations
4. **Input System**: Touch-based angle/power controls
5. **Audio System**: Sound effects management
6. **UI System**: Game interface, scoring, turn indicators

## Development Phases

### Phase 1: Foundation & Core Setup
**Goal**: Establish project structure and basic game loop

#### 1.1 Project Initialization
- Set up React Native with Expo
- Configure development environment
- Establish folder structure
- Set up testing framework

#### 1.2 Basic Game State Management
- Create game state context
- Implement turn-based logic
- Basic player data structures
- Simple state transitions

#### 1.3 Core Game Loop
- Game initialization
- Turn management
- Win condition detection
- Round/session management

### Phase 2: Physics & Mechanics
**Goal**: Implement core artillery mechanics

#### 2.1 Basic Physics Engine
- Projectile motion calculations
- Gravity simulation
- Basic trajectory computation
- Time-step integration

#### 2.2 Wind System
- Wind generation (direction/strength)
- Wind effect on projectile
- Wind display system
- Difficulty-based wind parameters

#### 2.3 Collision Detection
- Point-in-terrain collision
- Hit detection for players
- Crater creation (visual only)

### Phase 3: Rendering & Visuals
**Goal**: Create pixel art graphics and animations

#### 3.1 Terrain Generation
- Random terrain algorithm
- Pixel art terrain rendering
- Terrain collision boundaries
- Difficulty-based terrain complexity

#### 3.2 Sprite System
- Player cannon sprites
- Projectile rendering
- Explosion animations
- Crater visual effects

#### 3.3 Animation System
- Projectile trajectory animation
- Explosion effects
- Smooth interpolation
- Frame-rate independent timing

### Phase 4: User Interface
**Goal**: Implement touch controls and UI

#### 4.1 Control System
- Angle adjustment slider/dial
- Power adjustment slider/dial
- Touch input handling
- Control responsiveness

#### 4.2 Game UI
- Turn indicator
- Wind display
- Score display
- Fire button

#### 4.3 Screen Layout
- Landscape orientation lock
- Responsive layout
- Control positioning
- Visual hierarchy

### Phase 5: Audio & Polish
**Goal**: Add sound effects and final polish

#### 5.1 Audio System
- Sound effect loading
- Cannon fire sound
- Explosion sound
- Audio timing synchronization

#### 5.2 Difficulty System
- Easy/Medium/Very Difficult modes
- Parameter adjustment per difficulty
- Limited powder system (Very Difficult)
- Difficulty selection UI

#### 5.3 Final Polish
- Performance optimization
- Bug fixes
- Visual polish
- User experience refinements

## Detailed Implementation Steps

### Step 1: Project Setup and Basic Structure
**Size**: Small - Foundation setup
**Risk**: Low
**Dependencies**: None

### Step 2: Game State Management
**Size**: Small - Core data structures
**Risk**: Low
**Dependencies**: Step 1

### Step 3: Turn-Based Game Loop
**Size**: Medium - Core game logic
**Risk**: Medium
**Dependencies**: Step 2

### Step 4: Basic Physics Engine
**Size**: Medium - Mathematical calculations
**Risk**: Medium
**Dependencies**: Step 3

### Step 5: Wind System Implementation
**Size**: Small - Extends physics
**Risk**: Low
**Dependencies**: Step 4

### Step 6: Collision Detection
**Size**: Medium - Complex geometry
**Risk**: Medium
**Dependencies**: Step 4

### Step 7: Terrain Generation
**Size**: Large - Complex algorithm
**Risk**: High
**Dependencies**: Step 6

### Step 8: Basic Rendering System
**Size**: Medium - Graphics foundation
**Risk**: Medium
**Dependencies**: Step 7

### Step 9: Sprite and Animation System
**Size**: Large - Complex graphics
**Risk**: High
**Dependencies**: Step 8

### Step 10: Touch Controls
**Size**: Medium - Input handling
**Risk**: Medium
**Dependencies**: Step 9

### Step 11: User Interface
**Size**: Medium - UI components
**Risk**: Low
**Dependencies**: Step 10

### Step 12: Audio Integration
**Size**: Small - Sound effects
**Risk**: Low
**Dependencies**: Step 11

### Step 13: Difficulty System
**Size**: Medium - Game balancing
**Risk**: Low
**Dependencies**: Step 12

### Step 14: Final Integration and Polish
**Size**: Medium - Bug fixes and optimization
**Risk**: Low
**Dependencies**: Step 13

## Refined Step Breakdown

After reviewing the steps above, I need to break down the larger, riskier steps into smaller, more manageable pieces:

### Refined Steps (Right-Sized for Safe Implementation)

1. **Project Setup** (Small, Low Risk)
2. **Basic Game State** (Small, Low Risk)
3. **Player Turn Logic** (Small, Low Risk)
4. **Win Condition Detection** (Small, Low Risk)
5. **Basic Physics - Projectile Motion** (Medium, Medium Risk)
6. **Physics - Gravity Integration** (Small, Low Risk)
7. **Wind Generation System** (Small, Low Risk)
8. **Wind Physics Integration** (Medium, Medium Risk)
9. **Basic Collision Detection** (Medium, Medium Risk)
10. **Simple Terrain Generation** (Medium, Medium Risk)
11. **Terrain Collision Boundaries** (Medium, Medium Risk)
12. **Basic Canvas Rendering** (Medium, Medium Risk)
13. **Terrain Pixel Art Rendering** (Medium, Medium Risk)
14. **Player Cannon Sprites** (Small, Low Risk)
15. **Projectile Animation Foundation** (Medium, Medium Risk)
16. **Projectile Trajectory Animation** (Medium, Medium Risk)
17. **Explosion Animation System** (Medium, Medium Risk)
18. **Basic Touch Input** (Small, Low Risk)
19. **Angle Control Slider** (Medium, Medium Risk)
20. **Power Control Slider** (Medium, Medium Risk)
21. **Fire Button Integration** (Small, Low Risk)
22. **Turn Indicator UI** (Small, Low Risk)
23. **Wind Display UI** (Small, Low Risk)
24. **Score Display UI** (Small, Low Risk)
25. **Audio System Setup** (Small, Low Risk)
26. **Cannon Fire Sound** (Small, Low Risk)
27. **Explosion Sound Integration** (Small, Low Risk)
28. **Difficulty Parameter System** (Medium, Medium Risk)
29. **Limited Powder System** (Medium, Medium Risk)
30. **Final Integration and Testing** (Medium, Low Risk)

## Test-Driven Development Approach

Each step will follow TDD principles:
1. Write failing tests first
2. Implement minimal code to pass tests
3. Refactor for quality
4. Integrate with existing system
5. Verify no regressions

## Success Criteria for Each Step
- All tests pass
- Code integrates cleanly with previous steps
- No orphaned or hanging code
- Functionality works as specified
- Performance remains acceptable

## Risk Mitigation
- Keep steps small and focused
- Maintain comprehensive test coverage
- Regular integration testing
- Incremental complexity increases
- Clear rollback points at each step

---

# Implementation Prompts for Code Generation

## Step 1: Project Setup

### Context
This is the first step in building a Mountain Shoot mobile game - a 2-player artillery game for mobile devices. We're using React Native with Expo for cross-platform development.

### Prompt
```
Create a new React Native project with Expo for a mobile artillery game called "Mountain Shoot". Set up the basic project structure with the following requirements:

1. Initialize a new Expo React Native project
2. Configure for landscape orientation only
3. Set up the folder structure:
   - /src/components (UI components)
   - /src/game (game logic)
   - /src/physics (physics engine)
   - /src/audio (sound management)
   - /src/utils (utilities)
   - /src/types (TypeScript types)
4. Install and configure testing framework (Jest + React Native Testing Library)
5. Set up TypeScript configuration
6. Create basic App.tsx that renders a simple "Mountain Shoot" title screen
7. Add basic styling for landscape layout
8. Write initial tests to verify the app renders correctly

Requirements:
- Use TypeScript throughout
- Follow React Native best practices
- Include proper error boundaries
- Set up proper linting (ESLint)
- Create package.json with all necessary dependencies
- Include basic README with setup instructions

Deliverables:
- Complete project structure
- Working App.tsx with title screen
- Test suite that passes
- All configuration files
- Documentation for next developer
```

## Step 2: Basic Game State

### Context
Building on the project setup, we now need to create the core game state management system. This will handle player data, game status, and turn management without any UI yet.

### Prompt
```
Create a comprehensive game state management system for the Mountain Shoot artillery game. Build on the existing project structure from Step 1.

Requirements:
1. Create TypeScript interfaces for:
   - Player (id, position, health, score)
   - GameState (current player, game status, round number, scores)
   - GameConfig (difficulty settings, game parameters)

2. Implement a React Context for game state management:
   - GameStateContext with provider
   - Custom hooks for accessing game state
   - Actions for state updates (useGameActions)

3. Game state should include:
   - Two players with positions and scores
   - Current active player (1 or 2)
   - Game status (waiting, playing, round_over, game_over)
   - Round counter
   - Session scores (wins per player)

4. Create initial game state with default values:
   - Player 1 at left side of screen
   - Player 2 at right side of screen
   - Player 1 starts first
   - All scores at zero

5. Write comprehensive tests:
   - Test initial state creation
   - Test state updates
   - Test context provider/consumer
   - Test custom hooks

6. Update App.tsx to use the game state context
   - Wrap app in GameStateProvider
   - Display current player and basic game info
   - Show placeholder for game area

Integration requirements:
- Must integrate cleanly with existing App.tsx
- All code must be fully tested
- No orphaned components or unused code
- Follow established TypeScript patterns
```
## Step 3: Player Turn Logic

### Context
Building on the game state system, we need to implement the turn-based logic that manages player turns, validates actions, and handles turn transitions.

### Prompt
```
Implement turn-based game logic for the Mountain Shoot game. Build on the existing game state management from Step 2.

Requirements:
1. Create turn management functions:
   - switchTurn(): Move to next player
   - canPlayerAct(): Validate if current player can take action
   - startPlayerTurn(): Initialize turn for current player
   - endPlayerTurn(): Clean up after player action

2. Add turn-related state to GameState:
   - turnStartTime: When current turn began
   - turnTimeLimit: Optional time limit per turn
   - playerActions: Track what actions player has taken this turn

3. Implement turn validation:
   - Ensure only current player can act
   - Prevent actions during invalid game states
   - Handle edge cases (game over, paused, etc.)

4. Create turn transition logic:
   - Automatic turn switching after player fires
   - Proper state cleanup between turns
   - Turn counter increment

5. Add turn-related actions to useGameActions hook:
   - startTurn()
   - endTurn()
   - switchToNextPlayer()
   - resetTurn()

6. Update UI to show turn information:
   - Current player indicator
   - Turn counter display
   - Visual feedback for turn transitions

7. Write comprehensive tests:
   - Test turn switching logic
   - Test turn validation
   - Test edge cases and error conditions
   - Test UI updates during turn changes

8. Integration with existing code:
   - Extend GameStateContext with turn logic
   - Update App.tsx to display turn information
   - Ensure all existing tests still pass

Integration requirements:
- Must work with existing game state system
- All new functionality must be tested
- UI updates should be smooth and clear
- No breaking changes to existing API
```

## Step 4: Win Condition Detection

### Context
Building on the turn logic, we need to implement win condition detection and round management. This handles when a player hits their opponent and manages round/game completion.

### Prompt
```
Implement win condition detection and round management for Mountain Shoot. Build on existing turn logic from Step 3.

Requirements:
1. Create win condition detection:
   - checkForHit(): Determine if projectile hit opponent
   - declareRoundWinner(): Handle round completion
   - updateScores(): Update session win counts
   - checkForGameEnd(): Determine if game should end

2. Add round management state:
   - roundWinner: Which player won current round
   - roundEndTime: When round ended
   - isRoundActive: Whether round is in progress
   - gameWinner: Overall game winner (if any)

3. Implement round lifecycle:
   - startNewRound(): Initialize new round with fresh terrain
   - endCurrentRound(): Clean up and prepare for next round
   - resetGame(): Start completely new game session

4. Add scoring system:
   - Track wins per player per session
   - Display running score
   - Handle score display formatting

5. Create round transition logic:
   - Pause between rounds
   - Show round winner announcement
   - Automatic new round start (or manual)
   - Handle game end conditions

6. Add win-related actions to useGameActions:
   - recordHit()
   - endRound()
   - startNewRound()
   - resetGameSession()

7. Update UI for win conditions:
   - Round winner display
   - Score display
   - "New Round" button
   - Game over screen

8. Write comprehensive tests:
   - Test hit detection logic
   - Test score tracking
   - Test round transitions
   - Test game end conditions
   - Test UI state changes

Integration requirements:
- Integrate with existing turn system
- Maintain all existing functionality
- Add smooth transitions between rounds
- Ensure proper state cleanup
- All tests must pass
```
## Step 5: Basic Physics - Projectile Motion

### Context
Now we implement the core physics engine for projectile motion. This is fundamental to the artillery game mechanics and will be extended with wind and collision detection in later steps.

### Prompt
```
Create a physics engine for projectile motion in the Mountain Shoot game. Build on the existing game foundation from Steps 1-4.

Requirements:
1. Create physics types and interfaces:
   - Vector2D: {x: number, y: number} for positions and velocities
   - Projectile: position, velocity, acceleration, mass
   - PhysicsConfig: gravity, time step, simulation parameters

2. Implement core physics calculations:
   - calculateTrajectory(): Compute projectile path over time
   - updatePosition(): Update projectile position per time step
   - applyGravity(): Apply gravitational acceleration
   - getProjectileAtTime(): Get projectile state at specific time

3. Create physics simulation system:
   - PhysicsEngine class with step-based simulation
   - Time integration using Euler or Verlet method
   - Configurable time step for smooth animation
   - Boundary checking (screen edges)

4. Add projectile launching:
   - launchProjectile(): Create projectile from angle/power
   - convertAnglePowerToVelocity(): Convert user input to physics
   - validateLaunchParameters(): Ensure valid input ranges

5. Physics constants and configuration:
   - Realistic gravity constant
   - Appropriate time step for smooth simulation
   - Screen coordinate system mapping
   - Unit conversions (pixels to physics units)

6. Create physics utilities:
   - Vector math functions (add, multiply, normalize)
   - Angle/distance calculations
   - Coordinate system conversions

7. Integration with game state:
   - Add projectile state to game context
   - Track active projectile during flight
   - Update game state during physics simulation

8. Write comprehensive tests:
   - Test trajectory calculations
   - Test physics constants and formulas
   - Test edge cases (zero velocity, extreme angles)
   - Test integration with game state
   - Verify physics accuracy with known trajectories

9. Create simple visualization:
   - Basic projectile dot moving across screen
   - Show trajectory path for testing
   - Display physics debug info (velocity, position)

Integration requirements:
- Integrate with existing game state management
- Work with turn-based system
- Prepare for wind effects (next step)
- All existing functionality must continue working
- Comprehensive test coverage
```

## Step 6: Physics - Gravity Integration

### Context
Building on the basic projectile motion, we need to properly integrate gravity effects and ensure realistic physics behavior throughout the flight path.

### Prompt
```
Enhance the physics engine with proper gravity integration and realistic projectile behavior. Build on the basic physics from Step 5.

Requirements:
1. Improve gravity implementation:
   - Consistent gravitational acceleration
   - Proper integration over time steps
   - Realistic falling behavior
   - Terminal velocity considerations

2. Enhanced trajectory calculation:
   - More accurate numerical integration
   - Better time step handling
   - Smooth acceleration curves
   - Predictable physics behavior

3. Physics validation and tuning:
   - Calibrate gravity for game feel
   - Ensure realistic arc shapes
   - Balance realism with gameplay
   - Consistent behavior across different angles/powers

4. Add physics debugging tools:
   - Trajectory preview (for testing only)
   - Physics parameter display
   - Performance monitoring
   - Accuracy validation tools

5. Optimize physics performance:
   - Efficient calculation methods
   - Minimal memory allocation
   - Smooth 60fps simulation
   - Early termination for off-screen projectiles

6. Enhance projectile lifecycle:
   - Proper initialization
   - Clean state management
   - Graceful termination
   - Memory cleanup

7. Improve integration with game loop:
   - Smooth animation timing
   - Consistent frame rates
   - Proper state synchronization
   - Clean separation of concerns

8. Write additional tests:
   - Test gravity accuracy
   - Test performance under load
   - Test edge cases (very high/low trajectories)
   - Test integration stability
   - Verify no memory leaks

9. Update visualization:
   - Smoother projectile animation
   - Better visual feedback
   - Accurate position rendering
   - Clean animation cleanup

Integration requirements:
- Maintain compatibility with existing physics API
- Ensure all previous tests still pass
- Smooth integration with game state
- Prepare foundation for wind effects
- No performance regressions
```
## Step 7: Wind Generation System

### Context
Building on the solid physics foundation, we now add the wind system that affects projectile flight. Wind is a key gameplay element that adds strategy and unpredictability.

### Prompt
```
Implement a wind generation and display system for Mountain Shoot. Build on the physics engine from Steps 5-6.

Requirements:
1. Create wind data structures:
   - Wind: {direction: number, strength: number, description: string}
   - WindConfig: min/max strength per difficulty, variation ranges
   - WindDisplay: formatted text for UI display

2. Implement wind generation:
   - generateRandomWind(): Create wind for each turn
   - getWindForDifficulty(): Adjust wind based on game difficulty
   - formatWindDisplay(): Create user-friendly wind description
   - validateWindParameters(): Ensure wind values are reasonable

3. Wind generation logic:
   - Random direction (0-360 degrees or -1 to 1 for left/right)
   - Strength varies by difficulty level:
     - Easy: 0-10 mph, gentle breezes
     - Medium: 0-20 mph, moderate winds
     - Very Difficult: 0-40 mph, strong gusts
   - Consistent wind per turn (doesn't change during flight)

4. Wind display system:
   - Text format: "15 mph wind to right" or "No wind"
   - Clear direction indicators (left/right or compass)
   - Strength categories (light, moderate, strong)
   - Color coding for wind strength

5. Integration with game state:
   - Add currentWind to game state
   - Generate new wind each turn
   - Store wind history for debugging
   - Reset wind between rounds

6. Wind configuration per difficulty:
   - Easy: Light winds, predictable patterns
   - Medium: Moderate winds, some variation
   - Very Difficult: Strong, variable winds

7. Create wind utilities:
   - Wind strength categorization
   - Direction conversion functions
   - Wind effect calculations (preparation for physics)
   - Wind description formatting

8. Write comprehensive tests:
   - Test wind generation ranges
   - Test difficulty-based parameters
   - Test wind display formatting
   - Test integration with game state
   - Test edge cases (zero wind, maximum wind)

9. Update UI to display wind:
   - Wind indicator in game interface
   - Clear, readable wind information
   - Update wind display each turn
   - Visual wind strength indicators

Integration requirements:
- Integrate with existing game state and turn system
- Prepare for physics integration in next step
- Maintain all existing functionality
- Clean, testable wind API
- No impact on existing performance
```

## Step 8: Wind Physics Integration

### Context
Now we integrate the wind system with the physics engine to actually affect projectile flight. This is where wind becomes a gameplay mechanic rather than just a display element.

### Prompt
```
Integrate wind effects into the physics engine to affect projectile flight. Build on wind generation from Step 7 and physics from Steps 5-6.

Requirements:
1. Add wind physics calculations:
   - applyWindForce(): Apply wind acceleration to projectile
   - calculateWindEffect(): Determine wind impact over time
   - windResistance(): Optional air resistance modeling
   - getWindVector(): Convert wind to physics vector

2. Integrate wind into physics simulation:
   - Apply wind force each physics time step
   - Combine wind with gravity effects
   - Maintain realistic physics behavior
   - Ensure consistent wind application

3. Wind effect implementation:
   - Horizontal wind affects X velocity
   - Wind strength determines acceleration magnitude
   - Continuous application throughout flight
   - Realistic wind physics (not just constant push)

4. Physics parameter tuning:
   - Balance wind effect with gameplay
   - Ensure wind is noticeable but not overwhelming
   - Scale wind effects appropriately for screen size
   - Maintain predictable physics behavior

5. Enhanced trajectory calculation:
   - Include wind in trajectory computation
   - Update projectile path with wind effects
   - Maintain smooth animation with wind
   - Accurate final impact prediction

6. Wind physics validation:
   - Test wind effects at different strengths
   - Verify realistic trajectory curves
   - Ensure wind direction accuracy
   - Validate physics consistency

7. Performance optimization:
   - Efficient wind force calculations
   - Minimal impact on physics performance
   - Smooth animation with wind effects
   - No frame rate degradation

8. Write comprehensive tests:
   - Test wind force calculations
   - Test trajectory accuracy with wind
   - Test different wind conditions
   - Test performance with wind enabled
   - Test edge cases (no wind, extreme wind)

9. Update visualization:
   - Show wind-affected trajectory
   - Visual feedback for wind effects
   - Accurate projectile path rendering
   - Debug visualization for wind forces

Integration requirements:
- Seamlessly integrate with existing physics engine
- Work with wind generation system
- Maintain all existing game functionality
- Preserve physics accuracy and performance
- Comprehensive test coverage
```
## Step 9: Basic Collision Detection

### Context
With physics and wind working, we need collision detection to determine when projectiles hit terrain or players. This is crucial for gameplay mechanics.

### Prompt
```
Implement collision detection system for projectiles, terrain, and players. Build on the physics system from Steps 5-8.

Requirements:
1. Create collision detection types:
   - CollisionResult: {hit: boolean, point: Vector2D, type: 'terrain' | 'player' | 'boundary'}
   - Hitbox: Rectangular or circular collision boundaries
   - CollisionConfig: Detection sensitivity, collision layers

2. Implement basic collision detection:
   - checkTerrainCollision(): Detect projectile hitting ground
   - checkPlayerCollision(): Detect projectile hitting player
   - checkBoundaryCollision(): Detect projectile leaving screen
   - getCollisionPoint(): Determine exact collision location

3. Collision detection algorithms:
   - Point-in-rectangle for simple boundaries
   - Line-segment intersection for terrain
   - Circle-rectangle for player hitboxes
   - Efficient broad-phase collision filtering

4. Player collision system:
   - Define player hitbox size and position
   - Accurate hit detection for cannon sprites
   - Handle glancing blows (any hit wins)
   - Visual feedback for successful hits

5. Terrain collision (preparation for terrain):
   - Ground-level collision detection
   - Prepare for complex terrain shapes
   - Efficient collision queries
   - Accurate impact point calculation

6. Collision response:
   - Stop projectile on collision
   - Trigger appropriate game events
   - Clean up projectile state
   - Update game state based on collision type

7. Performance optimization:
   - Efficient collision detection algorithms
   - Early termination for obvious misses
   - Spatial partitioning if needed
   - Minimal CPU impact during flight

8. Write comprehensive tests:
   - Test collision accuracy
   - Test different collision scenarios
   - Test performance under various conditions
   - Test edge cases (grazing hits, corner cases)
   - Test integration with physics system

9. Integration with game logic:
   - Connect collisions to win condition detection
   - Update game state on player hits
   - Handle collision events properly
   - Maintain clean separation of concerns

Integration requirements:
- Work seamlessly with existing physics engine
- Integrate with game state and win conditions
- Prepare for terrain system integration
- Maintain performance standards
- Comprehensive test coverage
```

## Step 10: Simple Terrain Generation

### Context
Now we create the terrain generation system that creates random hilly landscapes for each round. This is a complex system that needs to be both visually appealing and functionally accurate for collision detection.

### Prompt
```
Implement terrain generation system for Mountain Shoot. Build on collision detection from Step 9.

Requirements:
1. Create terrain data structures:
   - TerrainPoint: {x: number, y: number} for terrain outline
   - Terrain: Array of points defining ground shape
   - TerrainConfig: Generation parameters per difficulty
   - TerrainBounds: Collision boundaries for terrain

2. Implement terrain generation algorithm:
   - generateRandomTerrain(): Create hilly landscape
   - smoothTerrain(): Ensure smooth, playable terrain
   - validateTerrain(): Check for gameplay issues
   - scaleTerrain(): Fit terrain to screen dimensions

3. Terrain generation parameters:
   - Easy: Gentle hills, low complexity
   - Medium: Moderate hills and valleys
   - Very Difficult: Steep mountains, complex shapes
   - Configurable height variation and frequency

4. Terrain shape requirements:
   - Random but playable terrain each round
   - Appropriate player placement areas
   - No impossible shots (completely blocked)
   - Smooth curves for realistic physics

5. Player positioning on terrain:
   - Place players on stable ground
   - Ensure clear firing positions
   - Appropriate separation distance
   - Level platforms for cannons

6. Terrain collision integration:
   - Convert terrain to collision boundaries
   - Efficient collision detection with terrain
   - Accurate impact point calculation
   - Support for crater creation (visual only)

7. Performance optimization:
   - Efficient terrain generation
   - Minimal memory usage
   - Fast collision queries
   - Smooth rendering preparation

8. Write comprehensive tests:
   - Test terrain generation consistency
   - Test collision boundary accuracy
   - Test player placement logic
   - Test different difficulty parameters
   - Test performance with complex terrain

9. Basic terrain visualization:
   - Simple line-based terrain rendering
   - Player position markers
   - Collision boundary visualization
   - Debug information display

Integration requirements:
- Integrate with collision detection system
- Work with existing game state management
- Support player positioning
- Prepare for pixel art rendering
- Maintain performance standards
```
## Step 11: Terrain Collision Boundaries

### Context
Building on terrain generation, we need precise collision boundaries that work seamlessly with the physics engine for accurate projectile impacts.

### Prompt
```
Implement precise terrain collision boundaries for the Mountain Shoot terrain system. Build on terrain generation from Step 10.

Requirements:
1. Create collision boundary system:
   - TerrainCollider: Efficient collision representation
   - CollisionMesh: Optimized collision geometry
   - BoundarySegment: Individual collision line segments
   - CollisionCache: Performance optimization for repeated queries

2. Convert terrain to collision boundaries:
   - generateCollisionMesh(): Convert terrain points to collision geometry
   - optimizeCollisionMesh(): Reduce complexity while maintaining accuracy
   - validateCollisionBoundaries(): Ensure no gaps or overlaps
   - updateCollisionCache(): Prepare for fast collision queries

3. Precise collision detection:
   - lineSegmentIntersection(): Accurate projectile-terrain collision
   - getCollisionNormal(): Surface normal for realistic bouncing (future)
   - findClosestPoint(): Efficient collision point calculation
   - raycastTerrain(): Fast collision queries

4. Collision optimization:
   - Spatial partitioning for large terrains
   - Early rejection for distant projectiles
   - Efficient broad-phase collision detection
   - Minimal CPU impact during gameplay

5. Integration with physics:
   - Seamless integration with projectile physics
   - Accurate collision timing
   - Proper collision response
   - Clean physics state management

6. Crater system preparation:
   - Mark collision points for visual craters
   - Maintain collision accuracy after crater creation
   - Efficient crater impact tracking
   - Visual-only crater effects (no physics impact)

7. Debug and visualization tools:
   - Collision boundary visualization
   - Collision point highlighting
   - Performance monitoring
   - Accuracy validation tools

8. Write comprehensive tests:
   - Test collision accuracy across terrain types
   - Test performance with complex terrain
   - Test edge cases (grazing shots, steep angles)
   - Test integration with physics engine
   - Verify no collision detection gaps

9. Performance validation:
   - Benchmark collision detection speed
   - Memory usage optimization
   - Frame rate impact analysis
   - Scalability testing

Integration requirements:
- Perfect integration with existing terrain generation
- Seamless physics engine integration
- Maintain collision detection performance
- Support future crater system
- Comprehensive test coverage
```

## Step 12: Basic Canvas Rendering

### Context
Now we implement the rendering system using React Native Skia to draw the game world. This provides the foundation for all visual elements.

### Prompt
```
Implement basic canvas rendering system using React Native Skia. Build on the terrain and physics systems from previous steps.

Requirements:
1. Set up React Native Skia:
   - Install and configure react-native-skia
   - Create basic Canvas component
   - Set up rendering context
   - Configure for landscape orientation

2. Create rendering foundation:
   - GameCanvas: Main rendering component
   - RenderContext: Shared rendering state
   - CoordinateSystem: Screen to world coordinate mapping
   - ViewPort: Camera and view management

3. Basic rendering capabilities:
   - Clear screen with background color
   - Draw simple shapes (lines, circles, rectangles)
   - Handle coordinate transformations
   - Manage rendering layers

4. Coordinate system management:
   - World coordinates to screen coordinates
   - Proper scaling for different screen sizes
   - Consistent coordinate system across components
   - Handle landscape orientation

5. Rendering performance:
   - Efficient drawing operations
   - Minimal re-renders
   - Smooth 60fps rendering
   - Memory management for graphics

6. Basic game element rendering:
   - Simple terrain line drawing
   - Player position markers
   - Projectile dot rendering
   - Basic UI element positioning

7. Rendering state management:
   - Clean separation from game logic
   - Efficient state updates
   - Proper React integration
   - Minimal rendering overhead

8. Write comprehensive tests:
   - Test rendering component creation
   - Test coordinate transformations
   - Test basic drawing operations
   - Test performance characteristics
   - Test integration with game state

9. Integration with existing systems:
   - Connect to game state for rendering data
   - Integrate with terrain system
   - Support physics visualization
   - Prepare for sprite rendering

Integration requirements:
- Seamless integration with existing game state
- Work with terrain and physics systems
- Maintain performance standards
- Prepare foundation for pixel art rendering
- Clean, testable rendering API
```
## Steps 13-30: Remaining Implementation Prompts

Due to length constraints, I'll provide a condensed version of the remaining prompts. Each follows the same detailed pattern as above:

### Step 13: Terrain Pixel Art Rendering
- Implement pixel art terrain rendering using Skia
- Create retro-style terrain graphics
- Integrate with terrain generation system
- Maintain performance with detailed graphics

### Step 14: Player Cannon Sprites
- Create pixel art cannon sprites
- Position cannons on terrain
- Handle sprite rotation and scaling
- Integrate with player positioning system

### Step 15-17: Animation System
- Build projectile animation foundation
- Implement smooth trajectory animation
- Create explosion animation system
- Ensure 60fps performance

### Step 18-21: Touch Controls
- Implement basic touch input handling
- Create angle and power control sliders
- Add fire button with proper integration
- Ensure responsive touch controls

### Step 22-24: User Interface
- Create turn indicator UI
- Implement wind display interface
- Add score display system
- Ensure clean, retro-styled UI

### Step 25-27: Audio System
- Set up Expo AV audio system
- Add cannon fire sound effects
- Implement explosion sound integration
- Ensure proper audio timing

### Step 28-29: Difficulty and Features
- Implement difficulty parameter system
- Add limited powder system for Very Difficult mode
- Balance gameplay across difficulty levels
- Ensure proper difficulty scaling

### Step 30: Final Integration
- Complete system integration testing
- Performance optimization and bug fixes
- Final polish and user experience refinement
- Comprehensive end-to-end testing

## Implementation Guidelines

Each prompt should follow this structure:
1. **Context**: What was built in previous steps
2. **Requirements**: Detailed technical requirements
3. **Integration**: How it connects to existing code
4. **Testing**: Comprehensive test requirements
5. **Deliverables**: What should be completed

## Success Criteria
- All tests pass at each step
- No orphaned or unused code
- Clean integration between steps
- Maintained performance standards
- Working game at each milestone

## Risk Mitigation
- Small, focused steps
- Comprehensive testing
- Clear integration points
- Regular validation
- Rollback capability at each step
