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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
let jwt = ''
const newUser = {
    email: "test@test.com",
    password: "MyTestingPassword123!",
    firstName: "Test user",
    lastName: "Test user",
    fiscalId: "NOTVALIDATED",
    address: "Some address on test street, 123",
    preferredLanguage: "english"
};
const url = 'http://culture.indahou.se:8080/api/v1'

// SSH exec CMD
Cypress.Commands.add("sshExecCmd", (command: string, keyPath: string) => {
    const sshCredentials = {
        username: 'root',
        host: 'culture.indahou.se',
        remoteCommand: command,
        privateKey: keyPath,
        projectFolder: '/root/dev/pdp/cidh-back-end/'
    }

    cy.task('ssh', sshCredentials, { timeout: 30000 })
})

//  TEST API
Cypress.Commands.add("apiSignupReq", () => {
    cy.request(
        'POST',
        `${url}/users`,
        newUser,
    ).then(res => {
        expect(res.status).to.eq(201)
        expect(res.body).to.have.property("id")
        expect(res.body).to.have.property("email")
        expect(res.body).to.have.property("firstName")
        expect(res.body).to.have.property("lastName")
        expect(res.body).to.have.property("fiscalId")
        expect(res.body).to.have.property("address")
        expect(res.body).to.have.property("isValidEmail")
        expect(res.body).to.have.property("createdAt")
        expect(res.body).to.have.property("preferredLanguage")
    })
})
Cypress.Commands.add("apiLoginReq", () => {
    cy.request(
        'POST',
        `${url}/users/login`,
        {
            email: newUser.email,
            password: newUser.password
        }
    ).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property("jwt")
        expect(res.body).to.have.property("refreshToken")
        expect(res.body).to.have.property("tokenType")
        expect(res.body).to.have.property("role")
        jwt = res.body["jwt"]
    })
})
Cypress.Commands.add("apiCreateNewCategoryReq", () => {
    cy.request({
        method: 'POST',
        url: `${url}/categories`,
        headers: {
            authorization: `Bearer ${jwt}`
        },
        body: {
            "name": "Category from Cypress",
            "description": "TestCategory"
        }
    }).then(res => {
        expect(res.status).to.eq(201)
        expect(res.body).to.have.property("id")
        expect(res.body).to.have.property("name")
        expect(res.body).to.have.property("description")
        expect(res.body).to.have.property("createdAt")
    })
})

// TEST DOM ELEMENTS 
Cypress.Commands.add("checkHomePage", () => {
    cy.visit('/home')
    cy.contains('Dasz Events')
    cy.contains('CULTURE IN DA HOUSE')
    cy.contains('Home')
    cy.contains('Categories')
    cy.contains('Etiquetes')
    cy.contains('Forum')
    cy.contains('Pròxims events')
    cy.contains('Nom')
    cy.contains('Etiqueta')
    cy.contains('cultureindahouse@gmail.com')
    cy.contains('©2021 Dasz Events S.L')
})
Cypress.Commands.add("checkHomePageMenuButtons", () => {
    cy.get('#main-header > nav > div.logo-wrapper > div.nav-links > ul > li > a').eq(0).should('have.attr', 'href', '/home').contains('Home')
    cy.get('#main-header > nav > div.logo-wrapper > div.nav-links > ul > li > a').eq(1).should('have.attr', 'href', '/categories').contains('Categories')
    cy.get('#main-header > nav > div.logo-wrapper > div.nav-links > ul > li > a').eq(2).should('have.attr', 'href', '/labels').contains('Etiquetes')
    cy.get('#main-header > nav > div.logo-wrapper > div.nav-links > ul > li > a').eq(3).should('have.attr', 'href', '/media/forum').contains('Forum')
})
Cypress.Commands.add("checkLoginPage", () => {
    cy.visit('profile/login')

    cy.contains('Inicia sessió')
    cy.contains('Email')
    cy.contains('Contrasenya')
    cy.contains('Inicia')

    cy.get('form input').eq(0).should('not.be.disabled').should('have.attr', 'placeholder', 'Email')
    cy.get('form input').eq(1).should('not.be.disabled').should('have.attr', 'placeholder', 'Contrasenya')
    cy.get('form button').eq(0).should('not.be.disabled').contains('Inicia')
    cy.get('form button').eq(1).should('not.be.disabled').contains('Registra\'t')
})
Cypress.Commands.add("checkLoginPageButtons", () => {
    cy.get('#main-header > nav > div.auth-wrapper > ul > li > a').eq(0).should('have.attr', 'href', '/profile/signup').contains('Registra\'t')
    cy.get('#main-header > nav > div.auth-wrapper > ul > li > a').eq(1).should('have.attr', 'href', '/profile/login').contains('Inicia sessió')
})
Cypress.Commands.add("checkSignupPage", () => {
    cy.visit('/profile/signup')

    cy.contains('Registre nou usuari')
    cy.get('form label').eq(0).should('not.be.disabled').contains('Nom')
    cy.get('form label').eq(1).should('not.be.disabled').contains('Cognom')
    cy.get('form label').eq(2).should('not.be.disabled').contains('Nif')
    cy.get('form label').eq(3).should('not.be.disabled').contains('Domicili')
    cy.get('form label').eq(4).should('not.be.disabled').contains('Idioma pref.')
    cy.get('form label').eq(5).should('not.be.disabled').contains('Email')
    cy.get('form label').eq(6).should('not.be.disabled').contains('Contrasenya')

    cy.get('form input').eq(0).should('not.be.disabled').should('have.attr', 'placeholder', 'Nom').should('have.attr', 'formcontrolname', 'firstName')
    cy.get('form input').eq(1).should('not.be.disabled').should('have.attr', 'placeholder', 'Cognom').should('have.attr', 'formcontrolname', 'lastName')
    cy.get('form input').eq(2).should('not.be.disabled').should('have.attr', 'placeholder', 'Nif').should('have.attr', 'formcontrolname', 'fiscalId')
    cy.get('form input').eq(3).should('not.be.disabled').should('have.attr', 'placeholder', 'Domicili').should('have.attr', 'formcontrolname', 'address')
    cy.get('form input').eq(4).should('not.be.disabled').should('have.attr', 'placeholder', 'Idioma pref.').should('have.attr', 'formcontrolname', 'preferredLanguage')
    cy.get('form input').eq(5).should('not.be.disabled').should('have.attr', 'placeholder', 'Email').should('have.attr', 'formcontrolname', 'email')
    cy.get('form input').eq(6).should('not.be.disabled').should('have.attr', 'placeholder', 'Contrasenya').should('have.attr', 'formcontrolname', 'password')

    cy.get('form button').should('not.be.disabled').contains('Envia')
})

// TEST E2E FUNCTIONALITIES
Cypress.Commands.add("uiSignup", () => {
    cy.visit('/profile/signup')

    cy.get('form input#inputName').type('Name test')
    cy.get('form input#inputSurname').type('Surname test')
    cy.get('form input#inputFiscalId').type('NOTVALIDATED')
    cy.get('form input#inputAddress').type('Address Test, 123')
    cy.get('form input#inputLanguage').type('English')
    cy.get('form input#inputEmail').type('test@test.com')
    cy.get('form input#inputPassword').type('MyTestingPassword123!')

    cy.get('form button').click()

    cy.url().should('contain', '/profile/login')

    cy.contains('Inicia sessió')
    cy.get('form input').eq(0).should('not.be.disabled').should('have.attr', 'placeholder', 'Email')
    cy.get('form input').eq(1).should('not.be.disabled').should('have.attr', 'placeholder', 'Contrasenya')
    cy.get('form button').eq(0).should('not.be.disabled').contains('Inicia')
    cy.get('form button').eq(1).should('not.be.disabled').contains('Registra\'t')
})
Cypress.Commands.add("uiLogin", () => {
    cy.visit('/profile/login')

    cy.get('form input#inputEmail').type('test@test.com')
    cy.get('form input#inputPass').type('MyTestingPassword123!')

    cy.get('form button').eq(0).click()

    cy.url().should('contain', '/profile/dashboard/home')

    cy.contains('Dasz Events Panel')
})
Cypress.Commands.add("checkJWTOnSessionStorage", () => {
    cy.window().then((window) => {
        window.sessionStorage.getItem('ACCESS_TOKEN')
    }).should('exist')
})
Cypress.Commands.add("uiLogout", () => {
    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > fa-icon').click()

    cy.get('app-dashboard > app-dashboard-header > header > nav > div.dashboard-header-navbar-profile > button > ul > li:nth-child(3) > a').click()

    cy.url().should('contain', '/home')
})




