
export class internalApiJobs {

    runApiJob(jobName) {
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-'+Cypress.env("env")+'.com/internalapi'+Cypress.env("envUpper")+'/job/start?jn=' + jobName + '&u=1'
        })
        const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        cy.get('#runningJobs').contains('There are no jobs currently running.', { timeout: 180000 })   //Will look for up to 3 minutes
    }



    runSendOrders() {
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://services.tcgplayer-'+Cypress.env("env")+'.com/internalapi'+Cypress.env("envUpper")+'/job/start?u=1&p='+Cypress.env("sellerId")+',,,,&jn=SENDORDER'
        })
        const isJobRunning = true
        cy.log(isJobRunning)
        cy.wait(5000)  //page refreshes every 5 seconds
        //Wait until job is complete
        cy.get('#runningJobs').contains('There are no jobs currently running.', { timeout: 100000 })
    }



}
export const internalApi = new internalApiJobs()


