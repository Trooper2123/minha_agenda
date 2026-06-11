import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

describe('App Component', () => {
  it('renders the Dashboard main heading', () => {
    render(
      <GoogleOAuthProvider clientId="dummy">
        <App />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Greetings, Traveler/i)).toBeInTheDocument();
  });
});
