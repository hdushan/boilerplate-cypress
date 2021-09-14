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
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('text', { prevSubject: true }, (subject, options) => {
  return subject.text()
})

Cypress.Commands.add('iframe', (iframeSelector, elSelector) => {
  return cy
    .get(`iframe${iframeSelector || ''}`, { timeout: 10000 })
    .should($iframe => {
      expect($iframe.contents().find(elSelector||'body')).to.exist
    })
    .then($iframe => {
      return cy.wrap($iframe.contents().find('body'))
    })
})
// To use iframes in test,
// cy.iframe('[title="Calendar"]').as('calenderIframe') // create alias
// cy.get('@calenderIframe') // use alias to efficiently chain commands
//       .find('.Calendar__day')
//       .eq(0)
//       .click()