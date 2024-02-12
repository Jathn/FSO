import { useSelector, useDispatch } from "react-redux";

import Blog from "./Blog";

import { upVote } from "../reducers/blogReducer";

const BlogView = ({user}) => {
    const blogs = useSelector((state) => state.blogs);
    const dispatch = useDispatch();
    
    const like = (blog) => {
        dispatch(upVote(blog));
    }

    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} increaseLikes={like} user={user} />
            ))}
        </div>
    );
}

export default BlogView