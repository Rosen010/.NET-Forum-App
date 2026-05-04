import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/test-utils';
import PostItem from './PostItem';
import type { PostWithAuthor } from '../../types';

describe('PostItem Component', () => {
  const mockPost: PostWithAuthor = {
    _id: 'post123',
    _ownerId: 'owner456',
    title: 'Test Post Title',
    content: 'This is test post content',
    category: 'Technology',
    _createdOn: 1234567890000,
    author: {
      _id: 'owner456',
      _createdOn: 1234567000000,
      email: 'author@example.com',
      profilePicture: '',
    },
  };

  it('renders post title and content', () => {
    render(<PostItem post={mockPost} />);

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('This is test post content')).toBeInTheDocument();
  });

  it('displays author email', () => {
    render(<PostItem post={mockPost} />);

    expect(screen.getByText(/author@example.com/i)).toBeInTheDocument();
  });

  it('shows author initials when no profile picture', () => {
    render(<PostItem post={mockPost} />);

    expect(screen.getByText('AU')).toBeInTheDocument();
  });

  it('renders as a clickable link to post details', () => {
    render(<PostItem post={mockPost} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/posts/post123');
  });

  it('formats the creation date', () => {
    render(<PostItem post={mockPost} />);

    // Check that some formatted date appears (will vary by locale)
    expect(screen.getByText(/2009/i)).toBeInTheDocument();
  });
});
