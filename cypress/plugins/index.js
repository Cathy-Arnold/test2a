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


/**
 * @type {Cypress.PluginConfig}
 */

const sqlServer = require('cypress-sql-server');
//const dbConfig = require('/Users/trishabatchoo/Repos/cypress-experimental/cypress.json');
const dbConfig = require("C:/Users/Work HP PC/Documents/Repositories/WorkingFolder/QE_Core_Automation/cypress.json");
                       
const fs = require('fs-extra')
const path = require('path')
function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
  if(!fs.existsSync(pathToConfigFile)){
    return {};
  }
  return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
  tasks = sqlServer.loadDBPlugin(config.env.db);
  const file = config.env.configFile;
  
  on('task', tasks);
  
  
  return tasks, getConfigurationByFile(file)
}