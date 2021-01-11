/// <reference types="cypress" />

describe('DataBase Testing', () => {
    it('Query Test', () => {

        cy.sqlServer('select SellerId,StoreName,StreetAddress,City,[State],Zip from dbo.SellerProServicesSettings where SellerId = ' + Cypress.env("sellerId")).then((response) => {
            cy.writeFile('cypress/fixtures/filesDuringTestRun/SellerProServicesSettings.json', response)
        })


        cy.readFile('cypress/fixtures/filesDuringTestRun/SellerProServicesSettings.json').then((readFile) => {
            const state = (readFile[4])
            cy.log(state)
        })


        cy.readFile('cypress/fixtures/filesDuringTestRun/SellerProServicesSettings.json').then((readFile) => {
            const zip = (readFile[5])
            cy.log(zip)
        })


    })
})
