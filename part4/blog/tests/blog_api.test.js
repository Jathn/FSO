const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const supertest = require('supertest');
const app = require('../app.js');
const blog = require('../models/blog.js');
const helper = require('../utils/list_helper.js');
const api = supertest(app);
const User = require('../models/user')

describe('Blog API', () => {
    beforeAll(async () => {
        await blog.deleteMany({});
        await blog.insertMany(helper.initialBlogs);

        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    describe('User handling', () => {
        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb();

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            };

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await helper.usersInDb();
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

            const usernames = usersAtEnd.map(u => u.username);
            expect(usernames).toContain(newUser.username);
        });

        test('creation fails with proper statuscode and message if username or password is too short', async () => {
            const usersAtStart = await helper.usersInDb();
            
            const newUser = {
                username: 'ro',
                name: 'Superuser',
                password: 'sa',
            };

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await helper.usersInDb();
            expect(usersAtEnd).toHaveLength(usersAtStart.length);
        });

        describe('Login', () => {
            test('login succeeds with correct credentials', async () => {
                const response = await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'sekret' })
                    .expect(200)
                    .expect('Content-Type', /application\/json/);

                expect(response.body.token).toBeDefined();
            });

            test('login fails with incorrect credentials', async () => {
                await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'wrongpassword' })
                    .expect(401)
                    .expect('Content-Type', /application\/json/);
            });
        }, 10000);
    }, 20000);

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Get Request Testing', () => {
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        test('id is defined', async () => {
            const response = await api.get('/api/blogs');
            expect(response.body[0].id).toBeDefined();
        });
    });

    describe('Post Request Testing', () => {
        describe('Authorization Testing', () => {     
            test('authorization succeeds with a valid token', async () => {
                const token = await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'sekret' })
                    .then((res) => res.body.token);
                const user = await User.findOne({ username: 'root' });  
                
                const newBlog = {
                    title: 'test',
                    author: 'apptester',
                    url: 'www.testiesdonttrythis.com',
                    likes: 0,
                    user: user.id,
                };
    
                await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newBlog)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
            });
    
            test('authorization fails with an invalid token', async () => {
                const token = await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'sekret' })
                    .then((res) => res.body.token);
                const user = await User.findOne({ username: 'root' });  
                const newBlog = {
                    title: 'test',
                    author: 'apptester',
                    url: 'www.testiesdonttrythis.com',
                    likes: 0,
                    user: user.id,
                };
    
                await api
                    .post('/api/blogs')
                    .set('Authorization', 'Bearer invalidtoken')
                    .send(newBlog)
                    .expect(401)
                    .expect('Content-Type', /application\/json/);
            });
            
        });

        test('a valid blog can be added', async () => {
            const token = await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'sekret' })
                    .then((res) => res.body.token);
            const user = await User.findOne({ username: 'root' });  
            const length = await api.get('/api/blogs').then((res) => res.body.length);
            const newBlog = {
                title: 'test',
                author: 'apptester',
                url: 'www.testiesdonttrythis.com',
                likes: 0,
                user: user.id,
            };

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
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
            const token = await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'sekret' })
                    .then((res) => res.body.token);
            const user = await User.findOne({ username: 'root' });  
            const newBlog = {
                title: 'test',
                author: 'apptester',
                url: 'www.testiesdonttrythis.com',
                user: user.id,
            };

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(200)
                .expect((res) => {
                    expect(res.body.likes).toEqual(0);
                });
        });

        test('blog without title or url or user is not added', async () => {
            const token = await api
                    .post('/api/login')
                    .send({ username: 'root', password: 'sekret' })
                    .then((res) => res.body.token);
            const user = await User.findOne({ username: 'root' });
            const newBlog1 = {
                url: 'www.testiesdonttrythis.com',
                author: 'Unkown',
                likes: 2,
                user: user.id,
            };

            const newBlog2 = {
                title: 'test',
                author: 'Unkown2',
                user: user.id,
            };
            const newBlog3 = {
                title: 'test3',
                author: 'Unkown3',
                likes: 2,
                url: 'www.testiesdonttrythis2.com',
            }

            await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog1).expect(400);
            await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog2).expect(400);
            await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog3).expect(400);
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
}, 30000);
