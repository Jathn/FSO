const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const blog = require('../models/blog.js');
const helper = require('../utils/list_helper.js');
const api = supertest(app);

describe('Blog API', () => {
    beforeAll(async () => {
        await blog.insertMany(helper.initialBlogs);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Get Request Testing', () => {    test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        test('id is defined', async () => {
            const response = await api.get('/api/blogs');
            expect(response.body[0].id).toBeDefined();
        });})

    describe('Post Request Testing', () => {
        test('a valid blog can be added', async () => {
            const length = await api.get('/api/blogs').then((res) => res.body.length);

            const newBlog = {
                title: 'test',
                author: 'apptester',
                url: 'www.testiesdonttrythis.com',
                likes: 0,
            };

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .expect((res) => {
                    delete res.body.id;
                    expect(res.body).toEqual(newBlog);
                });
            await api.get('/api/blogs').expect((res) => res.body.length === length + 1);
        });

        test('likes default to 0', async () => {
            const newBlog = {
                title: 'test',
                author: 'apptester',
                url: 'www.testiesdonttrythis.com',
            };

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect((res) => {
                    expect(res.body.likes).toEqual(0);
                });
        });

        test('blog without title or url is not added', async () => {
            const newBlog1 = {
                url: 'www.testiesdonttrythis.com',
                author: 'Unkown',
                likes: 2,
            };

            const newBlog2 = {
                title: 'test',
                author: 'Unkown2',
            };

            await api.post('/api/blogs').send(newBlog1).expect(400);
            await api.post('/api/blogs').send(newBlog2).expect(400);
        });
    });

    describe('Put Request Testing', () => {
        test('a blog can be updated', async () => {
            const blogs = await api.get('/api/blogs');
            const blogToUpdate = blogs.body[0];

            const updatedBlog = {
                ...blogToUpdate,
                likes: blogToUpdate.likes + 1,
            };

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)
                .expect(204);
        });
    });

    describe('Delete Request Testing', () => {
        test('a blog can be deleted', async () => {
            const blogs = await api.get('/api/blogs');
            const blogToDelete = blogs.body[0];

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

            const updatedBlogs = await api.get('/api/blogs');
            expect(updatedBlogs.body).not.toContainEqual(blogToDelete);
        });
    });
}, 15000);