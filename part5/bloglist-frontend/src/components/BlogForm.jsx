import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('');

    const handleBlogChange = (event) => {
        setNewBlog(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createBlog({
            content: newBlog,
            important: true,
        });
        setNewBlog('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={newBlog} onChange={handleBlogChange} />
            <button type="submit">save</button>
        </form>
    );
};

export default BlogForm;
