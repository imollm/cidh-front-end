describe('FOURM TESTS', () => {
    it('Should view forum an unregistered user', () => {
        cy.unregisteredUserCanViewForum();
    })
    it('Should view forum a registered user', () => {
        cy.uiLoginUser()
        cy.registeredUserCanViewForum()
        cy.uiLogoutUser()
    })
    it('Should view admin questions on forum', () => {
        cy.uiLoginAdmin()
        cy.adminCanViewForumQuestions()
        cy.uiLogoutAdminAndSuperAdmin()
    })
    it('Should view superadmin questions on forum', () => {
        cy.uiLoginSuperAdmin()
        cy.superAdminCanViewForumQuestions()
        cy.uiLogoutAdminAndSuperAdmin()
    })
    it('Should make a question on forum a unregistered user', () => {
        cy.makeAQuestionOnForumAUnregisteredUser()
    })
    it('Should make a question on forum a registered user', () => {
        cy.uiLoginUser()
        cy.makeAQuestionOnForumARegisteredUser()
        cy.uiLogoutUser()
    })
    it('Should admin answer a question', () => {
        cy.makeAQuestionOnForumAUnregisteredUser()
        cy.uiLoginAdmin()
        cy.answerAQuestionAdminAndSuperAdmin()
        cy.uiLogoutAdminAndSuperAdmin()
    })
    it('Should superAdmin answer a question', () => {
        cy.makeAQuestionOnForumAUnregisteredUser()
        cy.uiLoginSuperAdmin()
        cy.answerAQuestionAdminAndSuperAdmin()
        cy.uiLogoutAdminAndSuperAdmin()
    })
})
