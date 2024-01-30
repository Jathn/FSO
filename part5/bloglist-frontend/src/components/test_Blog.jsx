import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  test('url and likes are only rendered when the button is clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
      user: {
        name: 'Test User'
      }
    };

    const increaseLikes = jest.fn();

    const component = render(<Blog blog={blog} increaseLikes={increaseLikes} />);

    // Check that url and likes are not rendered initially
    expect(component.queryByText(blog.url)).toBeNull();
    expect(component.queryByText(`likes ${blog.likes}`)).toBeNull();

    // Click the button to expand the view
    fireEvent.click(component.getByText('view'));

    // Check that url and likes are rendered after the button is clicked
    expect(component.getByText(blog.url)).toBeInTheDocument();
    expect(component.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
  });
});