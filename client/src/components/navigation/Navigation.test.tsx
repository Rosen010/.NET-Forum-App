import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/test-utils';
import Navigation from './Navigation';
import type { AuthUser } from '../../types';

describe('Navigation Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the ForumApp logo', () => {
    render(<Navigation />);

    const logo = screen.getByText('ForumApp');
    expect(logo).toBeInTheDocument();
  });

  it('shows login and register buttons when user is not authenticated', () => {
    render(<Navigation />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows user email and logout button when authenticated', () => {
    const mockUser: AuthUser = {
      _id: '123',
      _createdOn: 1234567890000,
      email: 'test@example.com',
      accessToken: 'token123',
    };

    render(<Navigation />, { initialUser: mockUser });

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('displays user initials when no profile picture', () => {
    const mockUser: AuthUser = {
      _id: '123',
      _createdOn: 1234567890000,
      email: 'john.doe@example.com',
      accessToken: 'token123',
    };

    render(<Navigation />, { initialUser: mockUser });

    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
