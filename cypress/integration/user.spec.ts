describe('USER TESTS', () => {
    describe('Signup page USER', () => {
        it('Should be successfully signup', () => {
            cy.uiSignupUser()
        })
    })

    describe('Login and logout', () => {
        describe('USER ROLE', () => {
            it('Should be logged in', () => {
                cy.uiLoginUser()
                cy.checkJWTOnSessionStorage()
            })
            it('Should modify my personal data', () => {
                cy.modifyPersonalDataAsAUser()
            })
            it('Should be logout', () => {
                cy.uiLogoutUser()
            })
        })
        describe('ADMIN ROLE', () => {
            it('Should be logged in', () => {
                cy.uiLoginAdmin()
                cy.checkJWTOnSessionStorage()
            })
            it('Should be logout', () => {
                cy.uiLogoutAdminAndSuperAdmin()
            })
        })
        describe('SUPERADMIN ROLE', () => {
            it('Should be logged in', () => {
                cy.uiLoginSuperAdmin()
                cy.checkJWTOnSessionStorage()
            })
            it('Should be logout', () => {
                cy.uiLogoutAdminAndSuperAdmin()
            })
        })
    })
})
