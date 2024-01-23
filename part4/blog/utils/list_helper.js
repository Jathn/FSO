const User = require('../models/user')

initialBlogs = [
  {
    title: 'test',
    author: 'apptester',
    url: 'www.testiesdonttrythis.com',
    likes: 0,
  },
  {
    title: 'test2',
    author: 'apptester2',
    url: 'www.testiesdonttrythis2.com',
    likes: 1,
  }
]

const totalLikes = (blogs) => {
  return blogs.length === 1 ? blogs[0].likes : blogs.length;
  
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author);
  const authorCounts = authors.reduce((prev, current) => {
    prev[current] = (prev[current] || 0) + 1;
    return prev;
  }, {});

  const mostBlogsAuthor = Object.entries(authorCounts).reduce((prev, [author, count]) => {
    if (count > prev.count) {
      return { author, count };
    }
    return prev;
  }, { author: '', count: 0 });

  return mostBlogsAuthor.author;
}

const mostLikes = (blogs) => {
  const likesByAuthor = blogs.reduce((acc, blog) => {
    const { author, likes } = blog;
    acc[author] = (acc[author] || 0) + likes;
    return acc;
  }, {});

  const authorWithMostLikes = Object.entries(likesByAuthor).reduce((prev, [author, likes]) => {
    if (likes > prev.likes) {
      return { author, likes };
    }
    return prev;
  }, { author: '', likes: 0 });

  return authorWithMostLikes.author;
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb,
}