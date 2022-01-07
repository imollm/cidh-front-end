describe('LABELS TESTS', () => {
    it('Should create, read, update and delete labels', () => {
        cy.uiLoginSuperAdmin()
        cy.createLabel()
        cy.getLabel()
        cy.updateLabel()
        cy.deleteLabel()
        cy.uiLogoutAdminAndSuperAdmin()
    })
})
