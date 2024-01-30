import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: user
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        Title: <input value={title} onChange={handleTitleChange} /><br />
        Author: <input value={author} onChange={handleAuthorChange} /><br />
        Url: <input value={url} onChange={handleUrlChange} /><br />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
