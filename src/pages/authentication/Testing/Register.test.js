import { render, screen } from '@testing-library/react'
import Register from '../Register'

test('renders exist title', () => {
  render(<Register />);
  const item = screen.getAllByText(/REGISTER/i)
  expect(item).toBeInTheDocument();
});