import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs.js'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        voteUpBlog: (state, action) => {
            const updatedBlog = action.payload;
            return state.map(blog =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            );
        },
        appendBlog: (state, action) => {
            state.push(action.payload)
        },
        setBlogs: (state, action) => {
            return action.payload
        }
    }    
})

export const { voteUpBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        if (blogs) {
            dispatch(setBlogs(blogs))
        } else {
            dispatch(setBlogs([]))
        }
    }
}

export const createBlog = (object) => {
    return async dispatch => {
        const newBlog = await blogService.create(object)
        dispatch(appendBlog(newBlog))
    }
}

export const upVote = (blog) => {
    return async dispatch => {
        try {
            const newBlog = { ...blog, likes: blog.likes + 1 }
            const updatedBlog = await blogService.update(newBlog)
            dispatch(voteUpBlog(updatedBlog))
        } catch (error) {
            console.error('Error upvoting blog:', error)
        }
    }
}

export default blogSlice.reducer