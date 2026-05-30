import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders the Dashboard main heading', () => {
    render(<App />);
    expect(screen.getByText(/Greetings, Traveler/i)).toBeInTheDocument();
  });
});
