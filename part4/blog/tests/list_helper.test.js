const listHelper = require('../utils/list_helper');

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a555234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger P. Dickstra',
        }
    ];

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(2);
    });
});

describe('favorite blog', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a555234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger P. Dickstra',
            likes: 10,
            __v: 0
        }
    ];

    test('returns the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(blogs[1]);
    });
});

describe('most blogs', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a555234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger P. Dickstra',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a555234d17f0',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger P. Dickstra',
            likes: 15,
            __v: 0
        }
    ];

    test('returns the author with the most blogs', () => {
        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual('Edsger P. Dickstra');
    });
});

describe('most likes', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a555234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger P. Dickstra',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a555234d17f0',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger P. Dickstra',
            likes: 15,
            __v: 0
        }
    ];

    test('returns the author with the most likes', () => {
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual('Edsger P. Dickstra');
    });
});
