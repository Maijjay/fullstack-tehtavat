import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Julle',
    likes: 0,
    url: 'moi.fi'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

})

test('likes and url is showed when view button is clikced', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Julle',
    likes: 0,
    url: 'moi.fi',
    user: {
      username: 'maija'
    }
  }

  render(<Blog blog={blog} />)

  const viewButton = screen.getByText('view')
  screen.debug(viewButton)
  userEvent.click(viewButton)

})

test('two calls when like button is clikced twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Julle',
    likes: 0,
    url: 'moi.fi',
    user: {
      username: 'maija'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)
  const viewButton = screen.getByText('view')
  userEvent.click(viewButton)

  const button = screen.getByText('like')
  userEvent.click(button)
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
