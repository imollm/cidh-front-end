describe('SUBSCRIBE', () => {
    const urlPanelSearcher = '/event/dashboard/event/search'
    it('Should subscribe an event', () => {
        cy.uiLoginUser()
        cy.searchEventByName(urlPanelSearcher)
        cy.subscribeAnEvent()
    })
    it('Should show subscribed events', () => {
        cy.showSubscribedEvents()
    })
    it('Should unsubscribe an event', () => {
        cy.searchEventByName(urlPanelSearcher)
        cy.unsubscribeAnEvent()
    })
})