/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"
import { validateOrders } from "../../support/page_objects/admin/internalAPIValidateOrders"



describe('Process Orders', () => {


    it('Process Orders', () => {

        //while (i < loop) {
        //steps to get SellerOrderStatusId from DB
        const sellerOrderStatusId = '11'
        //if sellerOrderStatusId is not = '17' 


        //notEqual(actual, expected, [message])	assert.notEqual(3, 4, 'vals not equal')
        assert.notEqual(sellerOrderStatusId, 17, 'vals not equal')


        // {
        //     // const isJobRunning = false
        //     // const i = 0
        //     // const loop = 2
        //     // // while (i < loop) {
        //     // //     i++


        admin.setAdminAuthCookie()
        cy.visit('https://store.tcgplayer-stg.com/admin/InternalApi/StartJob')
        admin.verifyAdminLogin()
        cy.get('.formRow')
        cy.wait(10000)


        cy.get('#runningJobs').then(($RunningJobs) => {
            const RunningJobs = $RunningJobs.text()  //may be able to delete later
            cy.log(RunningJobs)   //delete later
            if ($RunningJobs.text().includes("There are no jobs currently running.")) {
                cy.log('No API jobs are currently running')
            }
        })
  
// https://docs.cypress.io/api/commands/should.html#Requirements
// Timeouts 
// .should() will continue to retry its specified assertions until it times out.
// cy.get('input', { timeout: 10000 }).should('have.value', '10')


        //     //run the 3 jobs here
        validateOrders.runValidateOrders()
        // } else if div[@id="runningJobs"]/table exists {
        // cy.log('An API job is running')  
        // //run the 3 jobs here
        //  } else if { 
        //      ($RunningJobs.text().includes("There was an error getting the list of running API jobs")) {
        //         cy.log('here was an error getting the list of running API jobs - verify internal API is running.')
        //     assert.isNotOk(true, 'There was an error getting the list of running API jobs - verify internal API is running.')

        //      } else {
        //     cy.log('Something went wrong during test.')
        //     fail test = assert 

        //     else {
        //         break
        //     }
        //     //while end



        // //steps to get SellerOrderStatusId from DB
        // if not equal to 17 {
        //     cy.log('SellerOrderStatusId is not = 17 AND have fees processed.  Exiting test project.')
        //     //exit test
        // }

    })
})