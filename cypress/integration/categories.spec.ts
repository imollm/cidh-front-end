describe('CATEGORIES TESTS', () => {
    it('Should create, read and update categories', () => {
      cy.uiLoginSuperAdmin()
      cy.createCategory()
      cy.getCategory()
      cy.updateCategory()
      cy.uiLogoutAdminAndSuperAdmin()
    })
  })
