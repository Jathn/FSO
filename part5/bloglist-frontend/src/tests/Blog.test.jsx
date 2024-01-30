import React from 'react'
import { render, userEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog component', () => {

  test('renders blog title and author', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5,
      url: 'https://example.com',
      user: {
        username: 'testuser',
        name: 'Test User',
      }
    }

    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('Test Author')
  })

  test('renders blog url and likes when view button is clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5,
      url: 'https://example.com',
      user: {
        username: 'testuser',
        name: 'Test User',
      }
    }

    const component = render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = component.getByText('view')
    user.click(button)

    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).toHaveTextContent('https://example.com')
    expect(component.container).toHaveTextContent('likes: 5')
  })

  test('clicking the like button calls the increaseLikes function', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5,
      url: 'https://example.com',
      user: {
        username: 'testuser',
        name: 'Test User',
      }
    }

    const increaseLikes = jest.fn()
    const user = userEvent.setup()
    const component = render(<Blog blog={blog} increaseLikes={increaseLikes} />)
    const viewButton = component.getByText('view')
    user.click(viewButton)

    const likeButton = component.getByText('like')
    user.click(likeButton)

    expect(increaseLikes).toHaveBeenCalledTimes(1)
  })

  test('clicking the like button twice calls the increaseLikes function twice', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5,
      url: 'https://example.com',
      user: {
        username: 'testuser',
        name: 'Test User',
      }
    }

    const increaseLikes = jest.fn()
    const user = userEvent.setup()

    const component = render(<Blog blog={blog} increaseLikes={increaseLikes} />)
    const viewButton = component.getByText('view')
    user.click(viewButton)

    const likeButton = component.getByText('like')
    user.click(likeButton)
    user.click(likeButton)

    expect(increaseLikes).toHaveBeenCalledTimes(2)
  })
})
