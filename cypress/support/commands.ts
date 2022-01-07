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
const newEventOrganizer = {
    name: 'Empresa Test',
    description: 'Es una empresa per realitzar test'
}
const newAdministrator = {
    name: 'AdminTest',
    surname: 'Testing',
    email: 'adminTest@indahou.se',
    password: 'AdminTestPass2021!' 
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

    cy.get('body > div > div > div.swal2-actions > button.swal2-confirm.swal2-styled').click()
})

// CATEGORIES
Cypress.Commands.add('createNewCategory', () => {
    cy.visit('/administration/dashboard/category/create')

    cy.get('#categoryName').type('New category test')
    cy.get('#categoryDescription').type('Description of new category test')

    cy.get('button.form-control').click()

    cy.url().should('contain', '/administration/dashboard/category/list')
})
Cypress.Commands.add('getCategory', () => {
    
})

// EVENT ORGANIZERS
Cypress.Commands.add('createNewEventOrganizer', () => {
    cy.visit('/administration/dashboard/event-organizer/create')
  
    cy.get('#eventOrganizerName').type(newEventOrganizer.name)
    cy.get('#eventOrganizerDescription').type(newEventOrganizer.description)
    cy.get('select').select('Admin Admin')
  
    cy.get('div.form-group > button.form-control').click()
  
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
  
    cy.url().should('contain', '/administration/dashboard/event-organizer/list')
    cy.contains(newEventOrganizer.name)
    cy.contains(newEventOrganizer.description)
  });
  
Cypress.Commands.add('editEventOrganizer', () => {
    cy.visit('/administration/dashboard/event-organizer/list');
  
    cy.get('tbody > tr:nth-last-child(1) > td:nth-last-child(1) > div > div > a').click()
  
    cy.get('#eventOrganizerName').clear().type(newEventOrganizer.name + ' modificat')
    cy.get('#eventOrganizerDescription').clear().type(newEventOrganizer.description + ' modificat')
  
    cy.get('div.form-group > button.form-control').click()
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    
    cy.url().should('contain', '/administration/dashboard/event-organizer/list')
    cy.contains(newEventOrganizer.name + ' modificat')
    cy.contains(newEventOrganizer.description + ' modificat')
});

// ADMINISTRATORS
Cypress.Commands.add('createNewAdministrator', () => {
    cy.visit('/administration/dashboard/administrator/create')
    
    cy.get('#inputName').type(newAdministrator.name)
    cy.get('#inputSurname').type(newAdministrator.surname)
    cy.get('#inputEmail').type(newAdministrator.email)
    cy.get('#inputPass1').type(newAdministrator.password)
    cy.get('#inputPass2').type(newAdministrator.password)
    
    cy.get('button.btn.btn-dark').click()
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.url().should('contain', '/administration/dashboard/administrator/list')
    cy.contains(newAdministrator.name)
    cy.contains(newAdministrator.surname)
    cy.contains(newAdministrator.email)    
  })

Cypress.Commands.add('editAdministrator', () => {
    cy.visit('/administration/dashboard/administrator/list')

    cy.get('tbody > tr:nth-last-child(1) > td:nth-last-child(1) > div > div > a').click()

    cy.get('#inputName').clear().type(newAdministrator.name + ' modificat')
    cy.get('#inputSurname').clear().type(newAdministrator.surname + ' modificat')

    cy.get('button.btn.btn-dark').click()
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.url().should('contain', '/administration/dashboard/administrator/list')
    cy.contains(newAdministrator.name + ' modificat')
    cy.contains(newAdministrator.surname + ' modificat')
  })

Cypress.Commands.add('associateAdministratorToEventOrganizer', () => {
      cy.visit('/administration/dashboard/event-organizer/list')

      cy.get('tbody > tr:nth-last-child(1) > td:nth-last-child(1) > div > div > a').click()

      cy.get('select').select(newAdministrator.name + ' modificat ' + newAdministrator.surname + ' modificat')
  
      cy.get('div.form-group > button.form-control').click()
    
      cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()

  })

// SEARCHER
Cypress.Commands.add('searchEventByName', (url) => {
    cy.visit(url)

    cy.get('#inputName').type('Event 2')

    cy.get('button.btn.btn-dark').click()

    cy.contains('Event 2')
})

Cypress.Commands.add('searchEventByLabel', (url) => {
    cy.visit(url)

    cy.get('#selectLabel').select('Label 6')

    cy.get('button.btn.btn-dark').click()

    cy.contains('Event 3')
    cy.contains('Event 6')
})

Cypress.Commands.add('searchEventByCategory', (url) => {
    cy.visit(url)

    cy.get('#selectCategory').select('Category 2')

    cy.get('button.btn.btn-dark').click()

    cy.contains('Event 2')
})

// FAVORITES
Cypress.Commands.add('addToFavoriteAnEvent', () => {

    cy.get('div.results-container.col-12 > div.results-container-wrapper > div.row > div:nth-child(1) > app-event-card > a').click()
    cy.get('div.event-detail-container > div.event-title-wrapper > fa-icon').click({force: true})

    cy.contains('Afegit als favorits')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.get('div.event-detail-container > div.event-title-wrapper > fa-icon').should('have.class', 'isFavorite')
})

Cypress.Commands.add('showFavoriteEvents', () => {
    cy.visit('/media/dashboard/favorite/list')

    cy.contains('Event 2')
})

Cypress.Commands.add('deleteToFavoriteAnEvent', () => {

    cy.get('div.results-container.col-12 > div.results-container-wrapper > div.row > div:nth-child(1) > app-event-card > a').click()
    cy.get('div.event-detail-container > div.event-title-wrapper > fa-icon').click({force: true})

    cy.contains('Eliminat dels favorits')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.get('div.event-detail-container > div.event-title-wrapper > fa-icon').should('have.class', 'isNotFavorite')
})

// SUBSCRIBE
Cypress.Commands.add('subscribeAnEvent', () => {

    cy.get('div.results-container.col-12 > div.results-container-wrapper > div.row > div:nth-child(1) > app-event-card > a').click()
    cy.get('div.actions > div.ng-star-inserted > button.btn.btn-dark').click()
    cy.contains('Te has subscrit')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.contains("Dona't de baixa")
})
Cypress.Commands.add('unsubscribeAnEvent', () => {

    cy.get('div.results-container.col-12 > div.results-container-wrapper > div.row > div:nth-child(1) > app-event-card > a').click()
    cy.get('div.actions > div.ng-star-inserted > button.btn.btn-danger').click()
    cy.contains('Te has donat de baixa')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.contains("Subscriu-te")
})

Cypress.Commands.add('showSubscribedEvents', () => {
    cy.visit('/event/dashboard/event/subscription-event-list')
    cy.contains('Event 2')
})

//VOTE AND SHARE
Cypress.Commands.add('voteAnEvent', () => {
    cy.get('div.results-container.col-12 > div.results-container-wrapper > div.row > div:nth-child(1) > app-event-card > a').click()
    cy.get('div.actions > div:nth-child(3) > button.btn.btn-dark').click()
    cy.get('select.swal2-select').select('5')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.contains('Puntuació enviada')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
})

Cypress.Commands.add('shareAnEvent', () => {
    cy.get('div.results-container.col-12 > div.results-container-wrapper > div.row > div:nth-child(1) > app-event-card > a').click()
    cy.get('div.actions > div:nth-child(4) > button.btn.btn-dark').click()
    cy.get('#swal2-input').type('test@indahou.se')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
    cy.contains('Enviada correctament')
    cy.get('div.swal2-actions > button.swal2-confirm.swal2-styled').click()
})