import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [likes] = useState(0)
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      likes,
      url,
    })

    setNewBlog('')
  }


  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
            Title:
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            name="title"
          />
        </div>
        <div>
            Author:
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            name="author"
          />
        </div>
        <div>
            URL:
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            name="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm