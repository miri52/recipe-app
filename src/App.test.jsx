import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the recipe search input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/search recipes/i)).toBeInTheDocument();
});

test('renders the recipes heading', () => {
  render(<App />);
  expect(screen.getByText(/all time flavourite/i)).toBeInTheDocument();
});
