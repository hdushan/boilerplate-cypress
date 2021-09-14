const BasePage = require('./basePage')

class ECLoginPage extends BasePage {
  constructor() {
    super()
    this.url = '/ecgateway/login.cfm'
    this.loginForm = 'form#form1'
    this.loginFormUsernameField = 'input#Username'
    this.loginFormPasswordField = 'input#Password'
    this.loginFormLoginButton = 'a#submit'
  }

  login(user) {
    this.fillUsername(user.username)
    this.fillPassword(user.password)
    this.clickLogin(user.username)
  }

  fillUsername(username) {
    cy.get(this.loginForm).get(this.loginFormUsernameField).should('be.visible')
    cy.get(this.loginForm).get(this.loginFormUsernameField).type(username).should('have.value', username)
  }

  fillPassword(password) {
    cy.get(this.loginForm).get(this.loginFormPasswordField).should('be.visible')
    cy.get(this.loginForm).get(this.loginFormPasswordField).type(password).should('have.value', password)
  }

  clickLogin(expectedUsername) {
    cy.get(this.loginForm).get(this.loginFormLoginButton).should('be.visible')
    cy.get(this.loginForm).get(this.loginFormLoginButton).click()
    cy.contains(`logged in as ${expectedUsername}`)
  }
}

module.exports = new ECLoginPage()
