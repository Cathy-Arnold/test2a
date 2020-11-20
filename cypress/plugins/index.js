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

//add per class for environmental variable
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
  if(!fs.existsSync(pathToConfigFile)){
    return {};
  }
  return fs.readJson(pathToConfigFile)
}
//end of add per class for environmental variable


/**
 * @type {Cypress.PluginConfig}
 */





const sqlServer = require('cypress-sql-server')
const dbConfig = require('C:/Users/Work HP PC/Cypress/cypress.json')
// module.exports = (on, config) => {
//   tasks = sqlServer.loadDBPlugin(config.env.db)
//   on('task', tasks)
//   return tasks

  //add per class for environmental variable
  module.exports = (on, config) => {
  const file = config.env.configFile
  return getConfigurationByFile(file)
  //end of add per class for environmental variable
}