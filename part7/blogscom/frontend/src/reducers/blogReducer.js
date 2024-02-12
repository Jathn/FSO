import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs.js'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        voteUpBlog: (state, action) => {
            const id = action.payload.id
            const blogToChange = state.find(n => n.id === id)
            const changedBlog = {
                ...blogToChange,
                votes: blogToChange.votes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
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
        const newBlog = { ...blog, votes: blog.votes + 1 }
        const updatedBlog = await blogService.update(newBlog)
        dispatch(voteUpBlog(updatedBlog))
    }
}

export default blogSlice.reducer