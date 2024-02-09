import { useState } from 'react'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('text')
  
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        resetAll()
    }

    const resetAll = () => {
        resetContent()
        resetAuthor()
        resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="button" onClick={resetAll}>reset</button>
          <button type="submit">create</button>
        </form>
      </div>
    )
  
}

export default CreateNew