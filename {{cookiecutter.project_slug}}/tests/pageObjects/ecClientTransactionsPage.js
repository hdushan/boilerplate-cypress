const BasePage = require('./basePage')
const ecRefundTransactionPopupPage = require('./ecRefundTransactionPopupPage')
const ecEnterTransactionPopupPage = require('./ecEnterTransactionPopupPage')

class ECClientTransactionsPage extends BasePage {
  constructor() {
    super()
    this.transactionsTable = 'div#loadCCTrans table'
    this.transactionsInTable = 'tbody tr'
    this.indexOfRefundLinkInTransactionsTable = 10
    this.refundWindow = 'form#doRefund'
    this.accountBalanceRowFinder = 'table tbody tr td b'
    this.indexOfAccountBalanceInTable = 1
    this.enterTransactionLink = 'a[title="Enter Transaction."]'
  }

  zeroOutAccountBalance(returnPath) {
    cy.get(this.accountBalanceRowFinder)
      .contains('ACCOUNT BALANCE')
      .parentsUntil('tbody')
      .find('td')
      .eq(this.indexOfAccountBalanceInTable)
      .invoke('text')
      .then((balance) => {
        const accountBalance = this.amount(balance)
        if (accountBalance > 0) {
          this.giveCredit(accountBalance, returnPath)
        } else {
          cy.task('log', `Zero Balance!`)
        }
      })
  }

  giveCredit(amount, returnPath) {
    cy.get(this.enterTransactionLink).should('be.visible')
    cy.task('log', `Non Zero Balance! : ${amount}`)
    cy.get(this.enterTransactionLink)
      .invoke('attr', 'onclick')
      .then((onclick) => {
        const enterTransactionURL = `/ecgateway/ecbill.cfm${this.extractPopupURL(onclick)}`
        this.giveCreditInPopup(enterTransactionURL, returnPath, amount)
      })
  }

  /* eslint-disable class-methods-use-this */
  giveCreditInPopup(popupURL, returnURL, balanceAmount) {
    ecEnterTransactionPopupPage.visit(popupURL, returnURL)
    ecEnterTransactionPopupPage.giveCredit(balanceAmount)
  }
  /* eslint-enable class-methods-use-this */

  refund(transactionId) {
    cy.get(this.transactionsTable)
      .get(this.transactionsInTable)
      .each(($transactionRow) => {
        const text = $transactionRow.text()
        if (text.includes(transactionId)) {
          cy.wrap($transactionRow)
            .find('td')
            .eq(this.indexOfRefundLinkInTransactionsTable)
            .invoke('text')
            .then((refundLinkText) => {
              if (refundLinkText.includes('Refund')) {
                this.refundThisReansactionRow($transactionRow)
              } else {
                cy.task('log', `\nRefund Link not found for transaction ${transactionId}\n`)
              }
            })
        }
      })
  }

  refundThisReansactionRow(transactionRow) {
    cy.wrap(transactionRow)
      .find('td')
      .eq(this.indexOfRefundLinkInTransactionsTable)
      .find('a')
      .invoke('attr', 'onclick')
      .then((onclick) => {
        const refundURL = `/ecgateway/${this.extractPopupURL(onclick)}`
        cy.location().then((returnPath) => {
          this.refundInPopup(refundURL, returnPath.toString())
          this.zeroOutAccountBalance(returnPath.toString())
        })
      })
  }

  /* eslint-disable class-methods-use-this */
  refundInPopup(popupURL, returnURL) {
    ecRefundTransactionPopupPage.visit(popupURL, returnURL)
    ecRefundTransactionPopupPage.refund()
  }
  /* eslint-enable class-methods-use-this */

  refundTransaction(transactionId) {
    cy.get(this.transactionsTable).should('be.visible')
    this.refund(transactionId)
  }
}

module.exports = new ECClientTransactionsPage()
