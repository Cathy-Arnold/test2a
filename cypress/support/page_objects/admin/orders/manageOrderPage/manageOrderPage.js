export class ManageOrderPage {




    visitManageOrderPage(orderNumber) {
        const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
        const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
        cy.visit(partialRefundPageUrl1 + orderNumber + partialRefundPageUrl2)
    }

    

        
}

export const manageOrderPage = new ManageOrderPage()