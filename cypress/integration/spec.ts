describe("Tests E2E CIDH Front End", () => {
  describe.skip('Home page', () => {
    it('Should be these texts on home page', () => {
      cy.checkHomePage()
    })
    it('Should be menu buttons', () => {
      cy.checkHomePageMenuButtons()
    })
    it('Should be auth buttons', () => {
      cy.checkLoginPageButtons()
    })
  })

  describe.skip('Signup page', () => {
    it('Should be these things on signup page', () => {
      cy.checkSignupPage()
    })
    
    it.skip('Should be successfully signup', () => {
      cy.uiSignup()
    })
  })

  describe.skip('Login and logout', () => {
    it('Should be these things on login page', () => {
      cy.checkLoginPage()
    })

    it.skip('Should be logged in', () => {
      cy.uiLogin()
      cy.checkJWTOnSessionStorage()
    })

    it.skip("Should be logout", () => {
      cy.uiLogout()
    })
  })

  describe('Testing API', () => {

    beforeEach(() => {
      cy.task('db:teardown')
      cy.task('db:seed')
    })

    it('Should created a new user', () => {
      cy.apiSignupReq()
    })

    it('Should created a new user', () => {
      // This resets the database through SSH
      cy.apiSignupReq()
    })

    it("Should login with new user and get the JWT", () => {
      cy.apiLoginReq()
    })

    it.skip("Should create a new category", () => {
      cy.apiCreateNewCategoryReq()
    })
  })
})
