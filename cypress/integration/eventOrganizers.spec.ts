
describe('EVENT ORGANIZERS', () => {
    it('Should create a new Event organizer', () => {
      cy.uiLoginSuperAdmin()
      cy.createNewEventOrganizer()
    })
    it('Should edit an Event organizer', () => {
      cy.editEventOrganizer()
    })
  });