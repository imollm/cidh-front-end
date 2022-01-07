describe('EVENT TESTS', () => {
    it('Should create, read, update events', () => {
        cy.uiLoginAdmin()
        cy.createEvent()
        cy.updateEvent()
        cy.getEvent()
        cy.uiLogoutAdminAndSuperAdmin()
    })
    it('Should user access an event', () => {
        cy.uiLoginUser()
        cy.accessToEventUser()
        cy.uiLogoutUser()
    })
})
