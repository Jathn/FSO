import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('BlogForm component', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    const user = { username: 'testuser', name: 'Test User' }

    const { getByLabelText, getByText } = render(<BlogForm createBlog={createBlog} user={user} />)

    const titleInput = getByLabelText('Title:')
    const authorInput = getByLabelText('Author:')
    const urlInput = getByLabelText('Url:')
    const saveButton = getByText('save')

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })

    fireEvent.click(saveButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://example.com',
      user: { username: 'testuser', name: 'Test User' }
    })
  })
})