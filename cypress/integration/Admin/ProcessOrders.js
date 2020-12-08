/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"
import { internalApi } from "../../support/page_objects/admin/internalApiJobs"



describe('Process Orders', () => {
    const validateOrders = 'VALIDATEORDERSV2'
    const processAllFees = 'PROCESSALLFEES'

    //Remove later. For demo purposes only
    const productsAlsoPurchasedDiceMasters = 'PRODUCTSALSOPURCHASEDDICEMASTERS'

    it('Process Orders', () => {
        //login headlessly as Admin and verify login
        admin.setAdminAuthCookie()
        cy.visit('https://store.tcgplayer-stg.com/admin/InternalApi/StartJob')
        admin.verifyAdminLogin()
        cy.get('.formRow')
        cy.wait(10000)

        //Run 3 order prrocessing jobs
        internalApi.runApiJob(validateOrders)
        internalApi.runSendOrders()
        internalApi.runApiJob(processAllFees)

        //Remove later. For demo purposes only
        internalApi.runApiJob(productsAlsoPurchasedDiceMasters)


    })
})