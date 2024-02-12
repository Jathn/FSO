import { notificationTimeout } from '../reducers/notificationReducer.js'
import { createBlog, upVote } from '../reducers/blogReducer.js'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './Notification.jsx'

const BlogForm = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notification)

    const addBlog = async (event) => {
        event.preventDefault()
        const content = {
            title: event.target.elements.name.value,
            author: event.target.elements.author.value,
            url: event.target.elements.url.value,
        }
        try {
            dispatch(createBlog(content))
            dispatch(notificationTimeout(`a new blog ${content.title} by ${content.author} added`, 5))
        } catch (exception) {
            console.log(exception)
            dispatch(notificationTimeout('failed to add blog', 5))
        }
    }

    return (
        <div>
            <Notification message={message} />
            <h2>Create new</h2>
            <p>Check out our forum rules, as to prevent yourself from doing booboos</p>
            <form onSubmit={addBlog}>
                <p>Name: <input name="name"/></p>
                <p>Author: <input name="author"/></p>
                <p>URL: <input name="url"/></p>
                <button type="submit">add</button>
            </form>

        </div>
)}   

export default BlogForm