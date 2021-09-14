/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fsx = require('fs-extra')
const path = require('path')
const fs = require('fs')
const neatCSV = require('neat-csv')

async function getConfigurationByEnvinronmentFile(environment) {
  const pathToConfigFile = path.resolve('tests', 'testConfig', `cypress.${environment}.json`)

  return fsx.readJson(pathToConfigFile)
}

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  require('cypress-terminal-report/src/installLogsPrinter')(on)

  on('task', {
    log(message) {
      console.log(message)
      return null
    },
  })

  const transactionsFile = path.resolve('.', 'transactions.csv')
  const text = fs.readFileSync(transactionsFile, 'utf8')
  const csv = await neatCSV(text)

  const environment = process.env.ENV || 'production'
  var envConfig = await getConfigurationByEnvinronmentFile(environment)
  
  envConfig.env.transactions = csv

  return envConfig
}
