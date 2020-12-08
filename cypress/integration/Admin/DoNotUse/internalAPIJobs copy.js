/// <reference types="cypress" />

import { admin } from "../../../support/page_objects/admin/adminFunctions"



describe('Internal API Jobs', () => {


    it('Internal API Jobs', () => {
        admin.setAdminAuthCookie()
        cy.visit('https://store.tcgplayer-stg.com/admin/InternalApi/StartJob')
        admin.verifyAdminLogin()
        cy.get('.formRow')
        cy.wait(5000)

        cy.get('#runningJobs').then(($RunningJobs) => {
            const RunningJobs = $RunningJobs.text()  //may be able to delete later
            cy.log(RunningJobs)   //delete later
            if ($RunningJobs.text().includes("There are no jobs currently running.")) {
                cy.server()
                cy.request({
                    method: 'POST',
                    url: 'http://services.tcgplayer-stg.com/internalapiSTG/job/start?jn=PRODUCTSALSOPURCHASEDDICEMASTERS&u=1'
                })
                cy.wait(5000)
            }
        })

        cy.get('#runningJobs').then(($RunningJobs) => {
            const RunningJobs = $RunningJobs.text()  //may be able to delete later
            cy.log(RunningJobs)   //delete later
            if ($RunningJobs.text().includes("There are no jobs currently running.")) {
                cy.server()
                cy.request({
                    method: 'POST',
                    url: 'http://services.tcgplayer-qa.com/internalapiQA/job/start?u=1&p=8,,,,&jn=SENDORDER'
                })
                cy.wait(5000)
            }
        })

        cy.get('#runningJobs').then(($RunningJobs) => {
            const RunningJobs = $RunningJobs.text()  //may be able to delete later
            cy.log(RunningJobs)   //delete later
            if ($RunningJobs.text().includes("There are no jobs currently running.")) {
                cy.server()
                cy.request({
                    method: 'POST',
                    url: 'http://services.tcgplayer-stg.com/internalapiSTG/job/start?jn=PROCESSALLFEES&u=1'
                })
            }
        })






    })
})
