/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )

}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [, setUrl] = useState('')
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    let message = (`A new blog ${title} by ${author} added `)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage(message)
      })
      .catch(err => { setErrorMessage(err.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setNewBlogVisible(false)
  }

  const removeBlog = (blogObject) => {
    blogService
      .remove({ ...blogObject, user : blogObject.user.id })
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      })
  }

  const addLike = (blogObject) => {
    let like = blogObject.likes += 1
    blogService
      .update({ ...blogObject, likes : like, user : blogObject.user.id })
      .then(returnedBlog => {
        const index = blogs.findIndex(({ id }) => id === returnedBlog.id)
        const tmp = [...blogs]
        tmp[index] = returnedBlog
        setBlogs(tmp)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log('logged out')
      setUser(null)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit"> login </button>
    </form>
  )

  const toggleBlogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogVisible ? '' : 'none' }
    return (
      <div>
        <div style = {hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>Create blog</button>
        </div>
        <div style = {showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const sortBlogs = () => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
  }

  const showBlogs = () => {
    sortBlogs()
    return (
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}/>
        )}
      </ul>

    )
  }
  if (user === null ) {
    return (
      <div>
        <Notification message={errorMessage} />

        <h2> Log in</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Blogs</h2>

      <p>{user.name} is logged in
        <button onClick={handleLogout}>log out</button>
      </p>

      <p> Create new:</p>
      {toggleBlogForm()}

      {showBlogs()}

    </div>
  )
}

export default App