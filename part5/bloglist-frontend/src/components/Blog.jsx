import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, increaseLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [view, setView] = useState(false)

  const simpleView = () => {
    return (<div>
            {blog.title} {blog.author} <button onClick={() => setView(true)}>view</button>
            </div>
  )};
  
  const expandedView = () => {
    return (<div>
            {blog.title} {blog.author} <button onClick={() => setView(false)}>hide</button><br />
            {blog.url}<br />
            likes {blog.likes} <button onClick={() => increaseLikes(blog.id)}>like</button><br />
            {blog.user.name ? blog.user.name : "No user"}<br />
            <button onClick={() => blogService.delete(blog.id)}>delete</button>
            </div>
  )};
  return(
    <div style={blogStyle}>
      {!view && simpleView()}
      {view && expandedView()}
    </div>  
)};

export default Blog