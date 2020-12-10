/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"





describe('Headless Authorization Admin No Cookies', () => {

  var adminData = require('../../fixtures/admin/admin')
  var passwordData = require('../../fixtures/password/standardPassword')


  it('Headless Authorization Admin No Cookies', () => {
    admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
    cy.visit('https://store.tcgplayer-'+(Cypress.env("env"))+'.com/admin/Home/AdminIndex')

    // to prove we have a session   This was the example.  May have to format differently.  Does not work
    //cy.getCookie('cypress-session-cookie').should('exist')

  })
})

