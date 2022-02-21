
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })
  return sum
}

const favouriteBlog = (blogs) => {
  let favourite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes  > favourite.likes){
      favourite = blog
    }
  })
  return favourite
}

const mostBlogs = (blogs) => {
  let most = 0
  let author = ""
  blogs.forEach(blog1 => {
    let count = 0
    blogs.forEach(blog2 => {
      if (blog1.author === blog2.author){
        count += 1
      }
    })
    if (count > most){
      most = count
      author = blog1.author
    }
  })
  return author
}

const mostLikes = (blogs) => {
  let most = 0
  let author = ""
  blogs.forEach(blog1 => {
    let count = blog1.likes
    blogs.forEach(blog2 => {
      if (blog1.author === blog2.author){
        count += blog2.likes
      }
    })
    if (count > most){
      most = count
      author = blog1.author
    }
  })
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}