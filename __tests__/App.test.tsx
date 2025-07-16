// ABOUTME: Test suite for main App component
// ABOUTME: Verifies that the app renders correctly and displays expected content

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the title screen correctly', () => {
    render(<App />);
    
    // Check that the main title is displayed
    expect(screen.getByText('MOUNTAIN SHOOT')).toBeTruthy();
    expect(screen.getByText('Artillery Game')).toBeTruthy();
  });

  it('displays game instructions', () => {
    render(<App />);
    
    // Check that instructions are present
    expect(screen.getByText(/Two-player artillery game/)).toBeTruthy();
    expect(screen.getByText(/Take turns firing at your opponent/)).toBeTruthy();
    expect(screen.getByText(/First hit wins the round!/)).toBeTruthy();
  });

  it('shows placeholder for game area', () => {
    render(<App />);
    
    // Check that game area placeholder is displayed
    expect(screen.getByText('Game Area - Coming Soon')).toBeTruthy();
  });

  it('renders without crashing', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
