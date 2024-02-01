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
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        <label htmlFor="url">Url:</label>
        <input type="text" id="url" value={url} onChange={handleUrlChange} />
      </div>
      <button type="submit" id="create-button">save</button>
    </form>
  )
}

export default BlogForm
