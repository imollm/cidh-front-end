// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let jwt = ''

const newUser = {
    email: 'test@indahou.se',
    password: 'MyTestingPassword123!',
    firstName: 'Test user',
    lastName: 'Test user',
    fiscalId: 'NOTVALIDATED',
    address: 'Some address on test street, 123',
    preferredLanguage: 'English'
};
const userUser = {
    email: 'user@indahou.se',
    password: 'UserPass2021!'
}
const adminUser = {
    email: 'admin@indahou.se',
    password: 'AdminPass2021!'
};
const superAdminUser = {
    email: 'superadmin@indahou.se',
    password: 'SuperAdminPass2021!'
}

// SSH exec CMD
Cypress.Commands.add('sshExecCmd', (command: string, keyPath: string) => {
    const sshCredentials = {
        username: 'root',
        host: 'culture.indahou.se',
        remoteCommand: command,
        privateKey: keyPath,
        projectFolder: '/root/dev/pdp/cidh-back-end/'
    }

    cy.task('ssh', sshCredentials, { timeout: 30000 })
})

/*****************************/
/* TEST E2E FUNCTIONALITIES */
/*****************************/
Cypress.Commands.add('uiSignupUser', () => {
    cy.visit('/profile/signup')

    cy.get('form input#inputName').type(newUser.firstName)
    cy.get('form input#inputSurname').type(newUser.lastName)
    cy.get('form input#inputFiscalId').type(newUser.fiscalId)
    cy.get('form input#inputAddress').type(newUser.address)
    cy.get('form select#preferredLanguage').select(newUser.preferredLanguage)
    cy.get('form input#inputEmail').type(newUser.email)
    cy.get('form input#inputPass1').type(newUser.password)
    cy.get('form input#inputPass2').type(newUser.password)

    cy.get('form button').click()

    cy.url().should('contain', '/profile/login')

    cy.contains('Inicia sessió')
    cy.get('form input').eq(0).should('not.be.disabled').should('have.attr', 'placeholder', 'Email')
    cy.get('form input').eq(1).should('not.be.disabled').should('have.attr', 'placeholder', 'Contrasenya')
    cy.get('form button').eq(0).should('not.be.disabled').contains('Inicia')
    cy.get('form button').eq(1).should('not.be.disabled').contains('Registra\'t')
})
Cypress.Commands.add('uiLoginUser', () => {
    cy.visit('/profile/login')

    cy.get('form input#inputEmail').type(userUser.email)
    cy.get('form input#inputPass').type(userUser.password)

    cy.get('form button').eq(0).click()

    cy.url().should('contain', '/profile/dashboard/home')

    cy.contains('Dasz Events Panel')
})
Cypress.Commands.add('uiLogoutUser', () => {
    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > fa-icon').click()

    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > button > ul > li:nth-child(2) > a').click()

    cy.url().should('contain', '/home')
})
Cypress.Commands.add('uiLoginAdmin', () => {
    cy.visit('/profile/login')

    cy.get('form input#inputEmail').type(adminUser.email)
    cy.get('form input#inputPass').type(adminUser.password)

    cy.get('form button').eq(0).click()

    cy.url().should('contain', '/profile/dashboard/home')

    cy.contains('Dasz Events Panel')

    cy.contains('Panell ADMIN')
})
Cypress.Commands.add('uiLoginSuperAdmin', () => {
    cy.visit('/profile/login')

    cy.get('form input#inputEmail').type(superAdminUser.email)
    cy.get('form input#inputPass').type(superAdminUser.password)

    cy.get('form button').eq(0).click()

    cy.url().should('contain', '/profile/dashboard/home')

    cy.contains('Dasz Events Panel')

    cy.contains('Panell SUPERADMIN')
})
Cypress.Commands.add('uiLogoutAdminAndSuperAdmin', () => {
    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > fa-icon').click()

    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > button > ul > li > a').click()

    cy.url().should('contain', '/home')
})
Cypress.Commands.add('checkJWTOnSessionStorage', () => {
    cy.window().then((window) => {
        window.sessionStorage.getItem('ACCESS_TOKEN')
    }).should('exist')
})
Cypress.Commands.add('modifyPersonalDataAsAUser', () => {
    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > fa-icon').click()

    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > button > ul > li:nth-child(1) > a').click()

    cy.url().should('contain', '/profile/dashboard/userprofile')

    cy.get('#inputName').clear().type('My new name')
    cy.get('#inputSurname').clear().type('My new surname')
    cy.get('#inputFiscalId').clear().type('11111111A')
    cy.get('#inputAddress').clear().type('My new address')
    cy.get('#preferredLanguage').select('Spanish')

    cy.get('#userprofile-page button.btn.btn-dark').click()

    cy.url().should('contain', '/event/dashboard/event/search')

    cy.get('button.swal2-confirm.swal2-styled').click()
})

// CATEGORIES
const newCategory = {
    name: 'New category test',
    description: 'Description of new category test'
}
Cypress.Commands.add('createCategory', () => {
    cy.get('li.sidebar-menu-content-items-item:nth-child(3)').click()

    cy.contains('Gestiona les categories')

    cy.get('a.btn.btn-outline-dark').click()

    cy.contains('Crear una nova categoria')

    cy.get('input#categoryName').type(newCategory.name)
    cy.get('input#categoryDescription').type(newCategory.description)

    cy.get('button.form-control').click()

    cy.url().should('contain', '/administration/dashboard/category/list')

    cy.get('#swal2-title').contains('Creat correctament')
    cy.get('button.swal2-confirm.swal2-styled').click()
})
Cypress.Commands.add('getCategory', () => {
    cy.get('li.sidebar-menu-content-items-item:nth-child(3)').click()

    cy.contains(newCategory.name)
    cy.contains(newCategory.description)
})
Cypress.Commands.add('updateCategory', () => {
    cy.get('tbody tr:nth-child(7) td:nth-child(4) > div > div > a').click()

    cy.url().should('contain', '/administration/dashboard/category/edit')

    cy.get('input#categoryName')
        .should('have.value', newCategory.name)
        .clear()
        .type(`${newCategory.name} modified`)
    cy.get('input#categoryDescription')
        .should('have.value', newCategory.description)
        .clear()
        .type(`${newCategory.description} modified`)

    cy.get('button.form-control.btn.btn-dark.text-white').click()

    cy.get('#swal2-title').contains('Editat correctament!')
    cy.get('button.swal2-confirm.swal2-styled').click()
    cy.url().should('contain', '/administration/dashboard/category/list')

    cy.contains(`${newCategory.name} modified`)
    cy.contains(`${newCategory.description} modified`)
})

// LABELS
const newLabel = {
    name: 'New label test',
    description: 'Description of new label test'
}
Cypress.Commands.add('createLabel', () => {
    cy.get('li.sidebar-menu-content-items-item:nth-child(4)').click()

    cy.contains('Gestiona les etiquetes')

    cy.get('a.btn.btn-outline-dark').click()

    cy.contains('Crear nova etiqueta')

    cy.get('input#labelName').type(newLabel.name)
    cy.get('input#labelDescription').type(newLabel.description)

    cy.get('button.form-control.btn.btn-dark.text-white').click()

    cy.url().should('contain', '/administration/dashboard/labels/list')

    cy.get('#swal2-title').contains('Creat correctament')
    cy.get('button.swal2-confirm.swal2-styled').click()
})
Cypress.Commands.add('getLabel', () => {
    cy.get('li.sidebar-menu-content-items-item:nth-child(4)').click()

    cy.contains(newLabel.name)
    cy.contains(newLabel.description)
})
Cypress.Commands.add('updateLabel', () => {
    cy.get('tbody tr:nth-child(7) td:nth-child(4) > div > div:nth-child(1) a').click()

    cy.url().should('contain', '/administration/dashboard/labels/edit')

    cy.get('input#labelName')
        .should('have.value', newLabel.name)
        .clear()
        .type(`${newLabel.name} modified`)
    cy.get('input#labelDescription')
        .should('have.value', newLabel.description)
        .clear()
        .type(`${newLabel.description} modified`)

    cy.get('button.form-control.btn.btn-dark.text-white').click()

    cy.get('#swal2-title').contains('Editat correctament!')
    cy.get('button.swal2-confirm.swal2-styled').click()
    cy.url().should('contain', '/administration/dashboard/labels/list')

    cy.contains(`${newLabel.name} modified`)
    cy.contains(`${newLabel.description} modified`)
})
Cypress.Commands.add('deleteLabel', () => {
    cy.get('tbody tr:nth-child(7) td:nth-child(4) > div > div:nth-child(2) a').click()

    cy.get('#swal2-title').contains('Estas segur de voler eliminar?')
    cy.get('button.swal2-cancel.swal2-styled.swal2-default-outline').contains('Cancel')
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').contains('Si, elimina!').click()

    cy.get('#swal2-title').contains('Eliminat correctament!')

    cy.get('app-dashboard-table').should('not.contain', `${newLabel.name} modified`)
    cy.get('app-dashboard-table').should('not.contain', `${newLabel.description} modified`)
})


