import blogs from "../../src/services/blogs"

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'testusername',
          password: 'testpassword',
          name: 'testname'
      })
      cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'testusername2',
          password: 'testpassword2',
          name: 'testname2'
      })
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
      cy.get('#loginDisplay').contains('Login')
    })

    describe('Login', function (){
        it('succeeds with correct credentials', function (){
            cy.get('#usernameField').type('testusername')
            cy.get('#passwordField').type('testpassword')
            cy.get('#loginButton').click()

            cy.get('#notif').contains('Welcome testname')
        })

        it('fails with wrong credentials', function() {
            cy.get('#usernameField').type('wronguser')
            cy.get('#passwordField').type('testpassword')
            cy.get('#loginButton').click()

            cy.get('#notif').contains('invalid username or password')
            cy.get('#notif').should('have.css', 'color', 'rgb(255, 0, 0)')
          })
    })

    describe('When logged in', function() {
        beforeEach(function() {
          cy.login({
            username: 'testusername',
            password: 'testpassword'
        })
        })
    
        it('A blog can be created', function() {
            cy.get('#show').click()
            cy.get('#title').type('Sample title')
            cy.get('#author').type('Sample author')
            cy.get('#url').type('Sample url')

            cy.get('#create').click()
            cy.contains('Sample title by Sample author')
        })

        describe('One blog belongs to the user, one does not', function(){

            beforeEach(function(){
                cy.createBlog({
                    title: 'Sample title',
                    author: 'Sample author',
                    url: 'Sample url'
                    })
                cy.login({
                    username: 'testusername2',
                    password: 'testpassword2'
                })
                cy.createBlog({
                    title: 'Sample Title2',
                    author: 'Sample author2',
                    url: 'Sample url2'
                })
            })

            it('user can like a Blog', function(){
                cy.contains('Sample title').find('button').click()
                cy.contains('likes: 0')
                cy.contains('Sample title').get('.likeButton').click()
                cy.contains('likes: 1')
            })

            it('user can delete his blog', function(){
                cy.contains('Sample Title2').find('.viewButton').click()
                cy.get('#blogs').get('li').should('have.length', 2)
                cy.contains('Delete').click()
                cy.get('#blogs').get('li').should('have.length', 1)
            })

            it('user cannot delete blogs by others', function(){
                cy.contains('Sample Title').find('button').click()
                cy.get('#deleteButton').should('not.exist')
            })

            it.only('blogs are sorted according to likes', function(){
                cy.contains('Sample Title2').find('button').click()
                cy.contains('Sample Title2').get('.likeButton').click()
                cy.contains('Sample Title2').get('.likeButton').click()
                cy.get('li:first').contains('Sample Title2')
            })

        })
        

      })
  })