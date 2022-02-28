import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  render(<BlogForm createBlog={addBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  userEvent.type(inputs[0], 'testing a form...')
  userEvent.type(inputs[1], 'asd')

  userEvent.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
//   expect(addBlog.mock.calls[0].content).toBe('testing a form...')
})