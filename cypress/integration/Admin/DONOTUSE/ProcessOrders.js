/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"
import { internalApiJobs } from "../../support/page_objects/admin/adminSettings/internalApiJobs"





describe('Process Orders', () => {
    const validateOrders = 'VALIDATEORDERSV2'
    const processAllFees = 'PROCESSALLFEES'

    var adminData = require('../../fixtures/admin/admin')
    var passwordData = require('../../fixtures/password/standardPassword')

    //Remove later. For demo purposes only
    const productsAlsoPurchasedDiceMasters = 'PRODUCTSALSOPURCHASEDDICEMASTERS'

    it('Process Orders', () => {
        admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
        cy.visit('https://store.tcgplayer-'+(Cypress.env("env"))+'.com/admin/InternalApi/StartJob')
        admin.verifyAdminLogin()
        cy.get('.formRow')
        cy.wait(10000)

        //Run 3 order prrocessing jobs
        internalApiJobs.runApiJob(validateOrders)
        internalApiJobs.runSendOrders()
        internalApiJobs.runApiJob(processAllFees)

        //Remove later. For demo purposes only
        internalApiJobs.runApiJob(productsAlsoPurchasedDiceMasters)


    })
})