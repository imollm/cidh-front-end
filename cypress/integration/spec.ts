describe('Tests E2E CIDH Front End', () => {

  describe.skip('Signup page USER', () => {
    it('Should be successfully signup', () => {
      cy.uiSignupUser()
    })
  })

  describe.skip('Login and logout', () => {
    describe('USER ROLE', () => {
      it('Should be logged in', () => {
        cy.uiLoginUser()
        cy.checkJWTOnSessionStorage()
      })
      it('Should modify my personal data', () => {
        cy.modifyPersonalDataAsAUser()
      })
      it('Should be logout', () => {
        cy.uiLogoutUser()
      })
    })
    describe.skip('ADMIN ROLE', () => {
      it('Should be logged in', () => {
        cy.uiLoginAdmin()
        cy.checkJWTOnSessionStorage()
      })
      it('Should be logout', () => {
        cy.uiLogoutAdminAndSuperAdmin()
      })
    })
    describe.skip('SUPERADMIN ROLE', () => {
      it('Should be logged in', () => {
        cy.uiLoginSuperAdmin()
        cy.checkJWTOnSessionStorage()
      })
      it('Should be logout', () => {
        cy.uiLogoutAdminAndSuperAdmin()
      })
    })
  })

  describe.skip('Categories', () => {
    it('Should create, read and update categories', () => {
      cy.uiLoginSuperAdmin()
      cy.createNewCategory()
      cy.getCategory()
      cy.updateCategory()
    })
  })

  describe('Labels', () => {
    it('Should create, read, update and delete labels', () => {
      cy.uiLoginSuperAdmin()
      cy.createLabel()
      cy.getLabel()
      cy.updateLabel()
      cy.deleteLabel()
    })
  })
})
