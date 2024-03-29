import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, increaseLikes, user }) => {

  const [view, setView] = useState(false)

  const simpleView = () => {
    return (<div>
      {blog.title} {blog.author} <button onClick={() => setView(true)}>view</button>
    </div>
    )}

  const expandedView = () => {
    return (<div>
      {blog.title} {blog.author} <button onClick={() => setView(false)}>hide</button><br />
      {blog.url}<br />
      likes {blog.likes} <button onClick={() => increaseLikes(blog)}>like</button><br />
      {user.username === blog.user.username ? <button onClick={() => blogService.remove(blog.id)}>delete</button>: <p></p>}
    </div>
    )}
  return(
    <div className="box">
      {!view && simpleView()}
      {view && expandedView()}
    </div>
  )}

export default Blog