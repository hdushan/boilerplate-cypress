const BasePage = require('./basePage')

class ECRefundTransactionPopupPage extends BasePage {
  constructor() {
    super()
    this.returnURL = null
    this.refundForm = 'form[name="doRefund"]'
    this.refundLink = 'a'
    this.alreadyRefundedErrorMessage = 'transaction already refunded'
  }

  visit(url, returnURL) {
    this.returnURL = returnURL
    cy.visit(url)
  }

  refund() {
    cy.get(this.refundForm).should('be.visible')
    cy.get(this.refundForm).get(this.refundLink).contains('refund', { matchCase: false }).should('be.visible')
    cy.get(this.refundForm).get(this.refundLink).contains('refund', { matchCase: false }).click()
    cy.contains(this.alreadyRefundedErrorMessage).should('not.exist')
    cy.visit(this.returnURL)
  }
}

module.exports = new ECRefundTransactionPopupPage()
