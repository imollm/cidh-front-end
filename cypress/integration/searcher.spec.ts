describe('SEARCHER', () => {
    describe('Unregistered User', () => {
        const urlHomeSearcher = '/search'
        it('Should search an event by Name', () => {
            cy.searchEventByName(urlHomeSearcher)
        })
        it('Should search an event by Label', () => {
            cy.searchEventByLabel(urlHomeSearcher)
        })
        it('Should search events by Category', () => {
            cy.searchEventByCategory(urlHomeSearcher)
        })
    })
    describe('Registered User', () => {
        const urlPanelSearcher = '/event/dashboard/event/search'
        it('Should search an event by Name', () => {
            cy.uiLoginUser()
            cy.searchEventByName(urlPanelSearcher)
        })
        it('Should search an event by Label', () => {
            cy.searchEventByLabel(urlPanelSearcher)
        })
        it('Should search events by Category', () => {
            cy.searchEventByCategory(urlPanelSearcher)
        })
    })
})