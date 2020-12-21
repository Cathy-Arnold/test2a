/// <reference types="cypress" />


import { databaseQueryFunctions } from "../../support/page_objects/database/databaseQueryFunctions"

//const sellerProServicesSettingsQuery = "select SellerId,StoreName,StreetAddress,City,[State],Zip from dbo.SellerProServicesSettings where SellerId = ' + Cypress.env("sellerId")"
const sellerProServicesSettingsQuery = "select SellerId,StoreName,StreetAddress,City,[State],Zip from dbo.SellerProServicesSettings where SellerId = 62"
const sellerProServicesSettingsFile = "cypress/fixtures/filesDuringTestRun/SellerProServicesSettings.json"



describe('DataBase Testing', () => {
    it('Query Test', () => {



        databaseQueryFunctions.queryDBWriteToFile(sellerProServicesSettingsQuery, sellerProServicesSettingsFile)
        cy.readFile(sellerProServicesSettingsFile).then((readFile) => {
            const state = (readFile[4])
            cy.log(state)
        })
        cy.readFile(sellerProServicesSettingsFile).then((readFile) => {
            const zip = (readFile[5])
            cy.log(zip)
        })

        ////This is a logner way of doing what is listed below.
        // const singleQuery =  "select DisplayName from dbo.Seller where SellerId = 62"
        // cy.sqlServer(singleQuery).then((response) => {
        //     const displayName = (response)
        //     cy.log(displayName)
        //     cy.wrap(displayName).as('displayName');
        // })


        const singleQuery = "select DisplayName from dbo.Seller where SellerId = 62"
        cy.sqlServer(singleQuery)
            .as('displayName')



        //using the results from .as above to call this as a variable later in the test.
        cy.get('@displayName').then(displayName => {
            cy.log(displayName)  //or do anything else that you need to with this variable.
        })


    })
})
