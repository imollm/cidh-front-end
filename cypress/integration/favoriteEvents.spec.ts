describe('FAVORITE EVENTS', () => {
    const urlPanelSearcher = '/event/dashboard/event/search'
    it('Should add to favorites an event', () => {
        cy.uiLoginUser()
        cy.searchEventByName(urlPanelSearcher)
        cy.addToFavoriteAnEvent()
    })
    it('Should show favorite events', () => {
        cy.showFavoriteEvents()
    })
    it('Should delete a favorite event', () => {
        cy.searchEventByName(urlPanelSearcher)
        cy.deleteToFavoriteAnEvent()
    })
})