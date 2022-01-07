
describe('ADMINISTRATORS', () => {
    it('Should createa new Administrator', () => {
      cy.uiLoginSuperAdmin()
      cy.createNewAdministrator()
    })
    it('Should edit an Administrator', () => {
      cy.editAdministrator()
    })
    it('Should associate an Administrator to an Event organizer', () => {
      cy.associateAdministratorToEventOrganizer()
    })
  })