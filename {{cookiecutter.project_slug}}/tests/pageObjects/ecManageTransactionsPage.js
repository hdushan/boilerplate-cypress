const BasePage = require('./basePage')
const ecClientTransactionsPage = require('./ecClientTransactionsPage')

class ECManageTransactionsPage extends BasePage {
  constructor() {
    super()
    this.url = '/ecgateway/manage_cc_trans.cfm?option=view_trans'
    this.transactionIdField = 'input#transid'
    this.transactionIdSearchButton = 'input[value="Check Trans"]'
    this.transactionIdSearchResult = 'div#transCodeRsp'
    this.transactionIdSearchResultLink = 'div#transCodeRsp a'
  }

  searchForTransaction(transactionId) {
    this.fillTransactionId(transactionId)
    this.clickSearch()
  }

  fillTransactionId(transactionId) {
    cy.get(this.transactionIdField).should('be.visible')
    cy.get(this.transactionIdField).type(transactionId).should('have.value', transactionId)
  }

  clickSearch() {
    cy.get(this.transactionIdSearchButton).should('be.visible')
    cy.get(this.transactionIdSearchButton).click()
    cy.get(this.transactionIdSearchResult).should('be.visible')
    cy.get(this.transactionIdSearchResultLink).should('be.visible')
    cy.get(this.transactionIdSearchResultLink).should('have.attr', 'href')
  }

  goToClientPage() {
    cy.get(this.transactionIdSearchResultLink).should('be.visible')
    cy.get(this.transactionIdSearchResultLink).invoke('removeAttr', 'target').click()
    return ecClientTransactionsPage
  }
}

module.exports = new ECManageTransactionsPage()
