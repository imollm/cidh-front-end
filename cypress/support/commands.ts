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
    cy.visit('/administration/dashboard/category/list')

    cy.contains('Gestiona les categories')

    cy.get('a.btn.btn-outline-dark').click()

    cy.contains('Crear una nova categoria')

    cy.get('input#categoryName').type(newCategory.name)
    cy.get('input#categoryDescription').type(newCategory.description)

    cy.get('button.form-control').click()

    cy.url().should('contain', '/administration/dashboard/category/list')

    cy.get('button.swal2-confirm.swal2-styled').click()
})
Cypress.Commands.add('getCategory', () => {
    cy.visit('/administration/dashboard/category/list')

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

    cy.get('button.swal2-confirm.swal2-styled').click({force: true})
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

    cy.get('button.swal2-confirm.swal2-styled').click({force: true})
    cy.url().should('contain', '/administration/dashboard/labels/list')

    cy.contains(`${newLabel.name} modified`)
    cy.contains(`${newLabel.description} modified`)
})
Cypress.Commands.add('deleteLabel', () => {
    cy.get('tbody tr:nth-child(7) td:nth-child(4) > div > div:nth-child(2) a').click()

    cy.get('#swal2-title').contains('Estas segur de voler eliminar?')
    cy.get('button.swal2-cancel.swal2-styled.swal2-default-outline').contains('Cancel')
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').contains('Si, elimina!').click()

    cy.get('button.swal2-confirm.swal2-styled').click({force: true})

    cy.get('app-dashboard-table').should('not.contain', `${newLabel.name} modified`)
    cy.get('app-dashboard-table').should('not.contain', `${newLabel.description} modified`)
})

// EVENTS
const newEvent = {
    name: "New event test",
    description: "Another Event created via Cypress",
    headerImage: "https://i.pinimg.com/originals/50/c5/1e/50c51e02a205b44c3449fc128400ff20.jpg",
    startDate: '2022-01-01',
    endDate: '2022-01-02',
    category: "Category 1",
    eventUrl: "https://youtu.be/embed/JWukx3HGBKI",
    organizerId: "1: d578fae9-d376-4e37-a5b0-46f9128beb4f",
}
Cypress.Commands.add('createEvent', () => {
    cy.viewport(700, 1700)
    cy.visit('/profile/dashboard/events/list')

    cy.contains('Gestiona els actes')

    cy.get('a.btn.btn-outline-dark').click({force: true})

    cy.contains('Crea un nou acte')

    cy.get('input#eventName').type(newEvent.name, {force: true})
    cy.get('input#eventDescription').type(newEvent.description, {force: true})
    cy.get('input#eventHeaderImage').type(newEvent.headerImage, {force: true})
    cy.get('input#eventUrl').type(newEvent.eventUrl, {force: true})
    cy.get('input#eventInitDate').type(newEvent.startDate, {force: true})
    cy.get('input#eventEndDate').type(newEvent.endDate, {force: true})
    cy.get('select#eventCategory').select(newEvent.category, {force: true})
    cy.get('select#eventOrganizerId').select(newEvent.organizerId, {force: true})
    cy.get('[type="checkbox"]').first().check({force: true})

    cy.get('button.form-control.btn.btn-dark.text-white').click()

    cy.url().should('contain', '/profile/dashboard/events/list')

    cy.get('#swal2-title').contains('Creat correctament')
    cy.get('button.swal2-confirm.swal2-styled').click()
})
Cypress.Commands.add('updateEvent', () => {
    cy.viewport(700, 1700)

    cy.get('#dataTable > tbody > tr:nth-child(1) > td:nth-child(3) > div > div > a').click({force: true})

    cy.wait(1000)

    cy.contains('Edita l\'acte')

    cy.get('input#eventName')
        .should('have.value', newEvent.name)
        .clear()
        .type(`${newEvent.name} modified`, {force: true})
    cy.get('input#eventDescription')
        .should('have.value', newEvent.description)
        .clear()
        .type(`${newEvent.description} modified`, {force: true})
    cy.get('input#eventHeaderImage')
        .should('have.value', newEvent.headerImage)
    cy.get('input#eventUrl')
        .should('have.value', newEvent.eventUrl)
    cy.get('input#eventInitDate')
        .should('have.value', newEvent.startDate)
        .type('2022-01-05', {force: true})
    cy.get('input#eventEndDate')
        .should('have.value', newEvent.endDate)
        .type('2022-01-06', {force: true})
    cy.get('select#eventCategory')
        .should('have.value', `1: ${newEvent.category}`)
        .select('Category 2', {force: true})
    cy.get('select#eventOrganizerId')
        .should('have.value', newEvent.organizerId)
        .select('2: d578fae9-d376-4e37-a5b0-46f9128beb41', {force: true})

    cy.get('button.btn.btn-dark.text-white').click()

    cy.get('#swal2-title').contains('Editat correctament!')
    cy.get('button.swal2-confirm.swal2-styled').click()
    cy.url().should('contain', '/profile/dashboard/events/list')

    cy.contains(`${newEvent.name} modified`)
    cy.contains(`${newEvent.description} modified`)
})
Cypress.Commands.add('getEvent', () => {
    cy.visit('/profile/dashboard/home')

    cy.contains(`${newEvent.name} modified`)
    cy.contains(`${newEvent.description} modified`)
})
Cypress.Commands.add('accessToEventUser', () => {
    cy.visit('/media/dashboard/favorite/list')

    cy.get('#dataTable > tbody > tr:nth-child(1) > td:nth-child(6) > div > div > a').click({force: true})

    cy.wait(1000)

    cy.get('button.btn.btn-warning').click({force: true})

    cy.url().should('contain', '/event/dashboard/event/access')

    cy.get('iframe').should('have.attr', 'src')

    cy.get('button.btn').contains('Torna al detall').click({force: true})
})

// FORUM
Cypress.Commands.add('unregisteredUserCanViewForum', () => {
    cy.visit('/home')
    cy.get('div.nav-links > ul > li:nth-child(4) > a').click({force: true})

    cy.contains('FORUM')
    cy.get('button.forum-header-add.btn').contains('Fer pregunta')
    cy.contains('Darrers missatges')
    cy.contains('Missatge de un usuari anonim')
    cy.contains('Missatge de un usuari registrat')
    cy.contains('Aqui tens la teva contesta')
    cy.contains('Resposta:')
    cy.contains('Event 1')
})
Cypress.Commands.add('registeredUserCanViewForum', () => {
    cy.visit('/media/dashboard/forum')

    cy.contains('Fòrum')
    cy.contains('Darrers missatges')
    cy.get('button.forum-header-add.btn').contains('Fer pregunta')
    cy.contains('Darrers missatges')
    cy.contains('Usuari: Anonymous')
    cy.contains('Usuari: User User')
    cy.contains('Missatge de un usuari anonim')
    cy.contains('Missatge de un usuari registrat')
    cy.contains('Aqui tens la teva contesta')
    cy.contains('Resposta:')
    cy.contains('Event 1')
})
Cypress.Commands.add('adminCanViewForumQuestions', () => {
    cy.contains('Anonymous')
    cy.contains('User User')
    cy.contains('Missatge de un usuari anonim')
    cy.contains('Missatge de un usuari registrat')

    cy.visit('/media/dashboard/forum')

    cy.contains('Fòrum')
    cy.contains('Darrers missatges')
    cy.contains('Darrers missatges')
    cy.contains('Usuari: Anonymous')
    cy.contains('Usuari: User User')
    cy.contains('Missatge de un usuari anonim')
    cy.contains('Missatge de un usuari registrat')
    cy.contains('Aqui tens la teva contesta')
    cy.contains('Resposta:')
    cy.contains('Event 1')
})
Cypress.Commands.add('superAdminCanViewForumQuestions', () => {
    cy.visit('/media/dashboard/forum')

    cy.contains('Fòrum')
    cy.contains('Darrers missatges')
    cy.contains('Darrers missatges')
    cy.contains('Usuari: Anonymous')
    cy.contains('Usuari: User User')
    cy.contains('Missatge de un usuari anonim')
    cy.contains('Missatge de un usuari registrat')
    cy.contains('Aqui tens la teva contesta')
    cy.contains('Resposta:')
    cy.contains('Event 1')
})
Cypress.Commands.add('makeAQuestionOnForumAUnregisteredUser', () => {
    const eventId = 'd578fae9-d376-4e37-a5b0-46f9128beb40'

    cy.visit('/media/forum')

    cy.wait(1000)

    cy.get('button.forum-header-add.btn').click({force: true})

    cy.get('select.swal2-select').select(eventId)
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').click({force: true})
    cy.get('textarea.swal2-textarea').type('Un missatge des de Cypress')
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').click({force: true})

    cy.get('button.swal2-confirm.swal2-styled').click({force: true})

    cy.contains('Un missatge des de Cypress')

    cy.url().should('contain', '/media/forum')
})
Cypress.Commands.add('makeAQuestionOnForumARegisteredUser', () => {
    const eventId = 'd578fae9-d376-4e37-a5b0-46f9128beb40'

    cy.visit('/media/dashboard/forum')

    cy.get('button.forum-header-add.btn').click({force: true})

    cy.get('select.swal2-select').select(eventId)
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').click({force: true})
    cy.get('textarea.swal2-textarea').type('Un missatge des de Cypress')
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').click({force: true})

    cy.wait(500)

    cy.get('button.swal2-confirm.swal2-styled').click({force: true})

    cy.contains('Un missatge des de Cypress')

    cy.url().should('contain', '/media/dashboard/forum')
})
Cypress.Commands.add('answerAQuestionAdminAndSuperAdmin', () => {
    cy.viewport(2000, 2000)

    cy.visit('/media/dashboard/forum')

    cy.wait(1000)

    cy.get('button.btn.btn-sm.btn-danger').first().contains('Respon').click({force: true})

    cy.get('textarea.swal2-textarea').type('Una resposta des de Cypress')
    cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').click({force: true})

    cy.get('button.swal2-confirm.swal2-styled').click({force: true})

    cy.url().should('contain', '/media/dashboard/forum')

    cy.contains('Una resposta des de Cypress')
})

