
export class InternalApiJobs {

    runApiJob(jobNameValue, jobName) {
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-' + Cypress.env("env") + '.com/internalapi' + Cypress.env("envUpper") + '/job/start?jn=' + jobNameValue + '&u=1'
        })
        const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        //cy.get('#runningJobs').contains('There are no jobs currently running.', { timeout: 180000 })   //Will look for up to 3 minutes
        cy.get('#runningJobs').should('not.contain', jobName, { timeout: 180000 })   //Will look for up to 3 minutes
    }

    runSendOrders() {
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-' + Cypress.env("env") + '.com/internalapi' + Cypress.env("envUpper") + '/job/start?u=1&p=' + Cypress.env("sellerId") + ',,,,&jn=SENDORDER'
        })
        const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        //cy.get('#runningJobs').contains('There are no jobs currently running.', { timeout: 100000 })
        cy.get('#runningJobs').should('not.contain', 'Send Orders', { timeout: 180000 })   //Will look for up to 3 minutes
    }

    runOrderJobs() {
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-' + Cypress.env("env") + '.com/internalapi' + Cypress.env("envUpper") + '/job/start?jn=VALIDATEORDERSV2&u=1'
        })
        const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        cy.get('#runningJobs').should('not.contain', 'Validate Orders', { timeout: 180000 })   //Will look for up to 3 minutes

        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-' + Cypress.env("env") + '.com/internalapi' + Cypress.env("envUpper") + '/job/start?u=1&p=' + Cypress.env("sellerId") + ',,,,&jn=SENDORDER'
        })
       // const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        cy.get('#runningJobs').should('not.contain', 'Send Orders', { timeout: 180000 })   //Will look for up to 3 minutes

        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-' + Cypress.env("env") + '.com/internalapi' + Cypress.env("envUpper") + '/job/start?jn=PROCESSALLFEES&u=1'
        })
        //const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        cy.get('#runningJobs').should('not.contain', 'Process All Fees', { timeout: 180000 })   //Will look for up to 3 minutes
    }

}
export const internalApiJobs = new InternalApiJobs()


