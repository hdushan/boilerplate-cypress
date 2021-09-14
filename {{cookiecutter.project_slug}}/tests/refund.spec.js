const ecLoginPage = require('./pageObjects/ECLoginPage')
const ecManageTransactionsPage = require('./pageObjects/ECManageTransactionsPage')
const testData = require('./testData/testData')

// const transactions = [
//   { transactionId: '27612-P-114OLJGX' },
//   { transactionId: '27612-P-LV09X7L8' }
// ]

const transactions = Cypress.env('transactions')

describe('Refund transactions', function() {
  beforeEach(() => {
    ecLoginPage.visit()
    ecLoginPage.login(testData.ecUser)
  })

  transactions.forEach((transaction) => {
    it(`${transaction.transactionId}`, function() {
      ecManageTransactionsPage.visit()
      ecManageTransactionsPage.searchForTransaction(transaction.transactionId)
      const ecClientTransactionsPage = ecManageTransactionsPage.goToClientPage()
      ecClientTransactionsPage.refundTransaction(transaction.transactionId)
    })
  })
})