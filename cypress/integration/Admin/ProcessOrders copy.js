/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"
import { internalApi } from "../../support/page_objects/admin/adminSettings/internalApiJobs"





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
        cy.get('.formRow')
        cy.wait(10000)

        //Run 3 order prrocessing jobs
        internalApi.runApiJobn(validateOrders, runningValidateOrders)
        //internalApi.runSendOrdersn()
        internalApi.runApiJobn(processAllFees, runningProcessAllFees)

        //Remove later. For demo purposes only
        internalApi.runApiJobn(productsAlsoPurchasedDiceMasters, runningProductsAlsoPurchasedDiceMasters)


    })
})