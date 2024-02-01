describe('Blog app', function() {
  describe('Front end tests', function(){  
    it('front page can be opened', function() {
      cy.visit('http://localhost:5173')
      cy.contains('Blogs')
      cy.contains('log in')
    })

    it('login form can be opened', function() {
      cy.visit('http://localhost:5173')
      cy.contains('log in').click()
      cy.contains('username')
      cy.contains('password')
    })

    it('user can login', function() {
      cy.visit('http://localhost:5173')
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('After login, user can create a new blog', function() {
      cy.visit('http://localhost:5173')
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:5173')
      cy.get('#create-button').click()
      cy.contains('New blog posted')
    })

    it('After login, user can like a blog', function() {
      cy.visit('http://localhost:5173')
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes')
    })

    it('Only own blogs can be deleted', function() {
      cy.visit('http://localhost:5173')
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
      cy.contains('a blog created by cypress cypress view').click()
      cy.contains('remove').click()
      cy.contains('Blog removed')
    })
  })
})