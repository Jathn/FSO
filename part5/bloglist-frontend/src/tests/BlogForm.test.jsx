import React from 'react'
import { render, userEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('BlogForm component', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} user={user} />)

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
  })
})
