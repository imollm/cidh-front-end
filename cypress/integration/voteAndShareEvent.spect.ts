describe('VOTE AND SHARE EVENT', () => {
    const urlPanelSearcher = '/event/dashboard/event/search'
    it('Should vote an event', () => {
        cy.uiLoginUser()
        cy.searchEventByName(urlPanelSearcher)
        cy.voteAnEvent()
    })
    it('Should share an event', () => {
        cy.searchEventByName(urlPanelSearcher)
        cy.shareAnEvent()
    })
})