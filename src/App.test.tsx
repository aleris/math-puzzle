import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('renders config and worksheet titles', () => {
  render(<App />);
  expect(screen.getByText(/Find the animal!/)).toBeInTheDocument();
  expect(screen.getByText(/Animal Math Puzzle/)).toBeInTheDocument();
});

test('changing language changes the titles', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Language/), {target: {value: 'ro'}})
  expect(screen.getByText(/Găsește animalul!/)).toBeInTheDocument();
  expect(screen.getByText(/Puzzle matematic cu animale/)).toBeInTheDocument();
});

test('clicking on collection link navigates to collection screen', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Print collection/))
  expect(screen.getByText(/'s Animal Collection/)).toBeInTheDocument();
})
