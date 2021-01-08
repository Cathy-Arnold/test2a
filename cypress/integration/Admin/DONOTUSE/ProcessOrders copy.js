/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"
import { internalApiJobs } from "../../support/page_objects/admin/adminSettings/internalApiJobs"



describe('Process Orders', () => {
    const validateOrders = 'VALIDATEORDERSV2'
    const processAllFees = 'PROCESSALLFEES'
    const runningValidateOrders = 'Validate Orders'
    const runningProcessAllFees = 'Process All Fees'

    var adminData = require('../../fixtures/admin/admin')
    var passwordData = require('../../fixtures/password/standardPassword')

    //Remove later. For demo purposes only
    const productsAlsoPurchasedDiceMasters = 'PRODUCTSALSOPURCHASEDDICEMASTERS'
    const runningProductsAlsoPurchasedDiceMasters = 'Products Also Purchased - Dice Masters'

    it('Process Orders', () => {
        admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
        cy.visit('https://store.tcgplayer-'+(Cypress.env("env"))+'.com/admin/InternalApi/StartJob')
        admin.verifyAdminLogin()
        
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-' + Cypress.env("env") + '.com/internalapi' + Cypress.env("envUpper") + '/job/start?jn=PROCESSALLFEES&u=1'
        })
        const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        //cy.get('#runningJobs').contains('There are no jobs currently running.', { timeout: 180000 })   //Will look for up to 3 minutes
        cy.get('#runningJobs').should('not.contain', 'Process All Fees')
    
        
            // //Log in as Admin headlessly and run order jobs
    const validateOrders = 'VALIDATEORDERSV2'
    const value1 = "Validate Orders"
    const processAllFees = 'PROCESSALLFEES'
    const value2 = "Process All Fees"
    admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
    cy.visit('https://store.tcgplayer-' + (Cypress.env("env")) + '.com/admin/InternalApi/StartJob')
    admin.verifyAdminLogin()
    internalApiJobs.runApiJob(validateOrders, value1)
    internalApiJobs.runSendOrders()
    internalApiJobs.runApiJob(processAllFees, value2)
        
        
        
        
        
        // cy.get('.formRow')
        // cy.wait(10000)

        // //Run 3 order prrocessing jobs
        // internalApi.runApiJobn(validateOrders, runningValidateOrders)
        // //internalApi.runSendOrdersn()
        // internalApi.runApiJobn(processAllFees, runningProcessAllFees)

        // //Remove later. For demo purposes only
        // internalApi.runApiJobn(productsAlsoPurchasedDiceMasters, runningProductsAlsoPurchasedDiceMasters)


    })
})