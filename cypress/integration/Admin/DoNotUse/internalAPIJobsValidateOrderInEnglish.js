/// <reference types="cypress" />

import { admin } from "../../../support/page_objects/admin/adminFunctions"



describe('Internal API Jobs', () => {


    it('Validate Orders Internal API Job', () => {
        const job = 'VALIDATEORDERSV2'
        
              cy.server()
                cy.request({
                    method: 'POST',
                    url: 'http://services.tcgplayer-stg.com/internalapiSTG/job/start?jn='+job+'&u=1'
                })
                const isJobRunning = true

                //while start
                const i = 0
                const loop = 2
                while (i < loop) {
                    i++
                    if ($RunningJobs.text().not.include(job)) {
                        cy.log(Job+' has finished running.')
                        const isJobRunning = false
                        // cy.break()
                            else if ($RunningJobs.text().include(job)) {
                            cy.log(Job+' is still running, waiting 10 sec.')  
                            cy.wait(10000)  
                            } else {
                              cy.log('Something went wrong.')
                              fail test
                              }
                    }
                    while end
                }  if isJobRunning = true {
                    cy.log(Job+' is still running.  Failing test.')
                    fail test
                }
        






    })
})
