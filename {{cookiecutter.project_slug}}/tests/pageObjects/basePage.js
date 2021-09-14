class BasePage {
  constructor() {
    this.logoutLink = 'a[href="logout.cfm"]'
    this.loginForm = 'form#form1'
    this.loginFormLoginButton = 'a#submit'
    this.accountBalancePrefix = '$'
  }

  visit() {
    cy.visit(this.url)
  }

  /* eslint-disable class-methods-use-this */
  extractPopupURL(onclick) {
    const onclickURL = onclick.match(/window\.open\("(.*?)"/)[1]
    return onclickURL
  }
  /* eslint-enable class-methods-use-this */

  amount(amountString) {
    return parseFloat(amountString.replace(/\s+/g, '').replace(this.accountBalancePrefix, ''))
  }

  logout() {
    cy.get(this.logoutLink).click()
    cy.get(this.loginForm).get(this.loginFormLoginButton).should('be.visible')
  }
}

module.exports = BasePage
