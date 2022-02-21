const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[4])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[5])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs id is id not _id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  expect(blogToView.id).toBeDefined()
  expect(blogToView._id).not.toBeDefined()
})

describe('adding a new blog', () => {
  let token = null

  beforeAll(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username: 'kiira', passwordHash })

    await user.save()

    await api
      .post('/api/login')
      .send({ username: 'kiira', password: 'salis' })
      .then((response) => {
        return (token = response.body.token)
      })

    return token
  })

  test('a new blog can be added', async () => {
  const newBlog = {
      title: "Kiisul on jano",
      author: "Kissa Kössi",
      url: "https://eitoimi.com/",
      likes: 10
  }
  await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(blog => blog.title)
  expect(title).toContain(
      'Kiisul on jano'
  )
  })

  test('likes -default value is 0 if undefined', async () => {
  const newBlog = {
      title: 'Naurava nakki',
      author: "dksad asdd",
      url: "https://eitoimi.com/"
  }
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[helper.initialBlogs.length]

  const likes = blogToView.likes
  expect(likes).toEqual(0)
  
  })

  test('a blog without title or url cannot be added', async () => {
  const newBlog = {
      author: "Kissa Koira",
      likes: 10
  }
      
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})
describe('deleting a note', () => {

    test('deleting a blog with id works', async () => {
    await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204)
        
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length -1)
    })
})
describe('updating a note', () => {

    test('updating a blog with id works', async () => {
    const newBlog = {likes : 4}
    const id = helper.initialBlogs[0]._id
    await api
        .put(`/api/blogs/${id}`)
        .send(newBlog)
        .expect(204)

    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const likes = blogToView.likes
    expect(likes).toEqual(4)

    })
})
describe('creating a new user', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'nuuskis',
        name: 'Nuuskamuikkinen',
        password: 'muumitonjees',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('username must exist', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: '',
        name: 'Nuuskamuikkinen',
        password: 'muumitonjees',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).notToContain(newUser.username)
  
    })

    test('password must exist', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'nuuskis',
        name: 'Nuuskamuikkinen',
        password: '',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).notToContain(newUser.username)
    })

    test('username must have at least 3 letters', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'ka',
        name: 'Nuuskamuikkinen',
        password: 'muumitonjees',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).notToContain(newUser.username)
  
    })
})


afterAll(() => {
  mongoose.connection.close()
})