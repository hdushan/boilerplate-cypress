const BasePage = require('./basePage')

class ECEnterTransactionPopupPage extends BasePage {
  constructor() {
    super()
    this.returnURL = null
    this.enterTransactionForm = 'form[name="payment_form"]'
    this.amountField = 'input#amountpaid'
    this.transactionTypeCredit = 'input[value="3a"]'
    this.selectPhoneElement = 'select#phoneSelect'
    this.selectReasonElement = 'select[name="bill_typecode"]'
    this.reason = {
      text: 'Correction - System Error',
      code: '52',
    }
    this.chequeField = 'input[name="chequeno"]'
    this.comment = 'Amaysim test transaction'
    this.submitPaymentButton = 'input[name="submit"]'
  }

  visit(url, returnURL) {
    this.returnURL = returnURL
    cy.visit(url)
    cy.get(this.enterTransactionForm).should('be.visible')
  }

  giveCredit(creditAmount) {
    cy.get(this.enterTransactionForm).should('be.visible')
    this.enterAmount(creditAmount)
    this.chooseCredit()
    this.selectPhone()
    this.selectReason()
    this.enterComment()
    this.submitPayment()
    cy.visit(this.returnURL)
  }

  enterAmount(amount) {
    cy.get(this.enterTransactionForm).get(this.amountField).should('be.visible')
    cy.get(this.enterTransactionForm).get(this.amountField).type(amount).should('have.value', amount)
  }

  chooseCredit() {
    cy.get(this.enterTransactionForm).get(this.transactionTypeCredit).should('be.visible')
    cy.get(this.enterTransactionForm).get(this.transactionTypeCredit).click()
  }

  selectPhone() {
    cy.get(this.enterTransactionForm).get(this.selectPhoneElement).should('be.visible')
    cy.get(this.enterTransactionForm)
      .get(this.selectPhoneElement)
      .find('option')
      .last()
      .then((element) => cy.get(this.selectPhoneElement).select(element.val()))
  }

  selectReason() {
    cy.get(this.enterTransactionForm).get(this.selectReasonElement).should('be.visible')
    cy.get(this.enterTransactionForm).get(this.selectReasonElement).select(this.reason.text).should('have.value', this.reason.code)
  }

  enterComment() {
    cy.get(this.enterTransactionForm).get(this.chequeField).should('be.visible')
    cy.get(this.enterTransactionForm).get(this.chequeField).type(this.comment).should('have.value', this.comment)
  }

  submitPayment() {
    cy.get(this.enterTransactionForm).get(this.submitPaymentButton).should('be.visible')
    cy.get(this.enterTransactionForm).get(this.submitPaymentButton).click()
  }
}

module.exports = new ECEnterTransactionPopupPage()
