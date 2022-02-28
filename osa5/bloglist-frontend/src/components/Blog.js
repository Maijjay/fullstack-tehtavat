import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [extend, setExtend] = useState(false)

  const handleClick = () => {
    setExtend(!extend)
  }

  const handleLike = () => {
    addLike(blog)
  }

  const handleRemoveClick = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        {extend ? <div>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={handleLike}> like </button> </p>
          <p>{blog.user.username}</p>
        </div> : null}
        <button onClick={handleClick}>{extend ? <>hide</> : <>view</>}</button>
      </div>
      <button onClick={handleRemoveClick}>remove</button>
    </div>
  )

}

export default Blog