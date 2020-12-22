export class RefundQueries {


    // queryDBWriteToFile(query, fileName) {
    //     cy.sqlServer(query).then((response) => {
    //         cy.writeFile(fileName, response)
    //     })
    // }

    // queryDBSingleResult(query) {
    //     cy.sqlServer(query).then((response) => {
    //         const result = (response)
    //     })
    // }




    calculateProductTotalPrice(purchasedQuantity, price ) {
        cy.sqlServer("select cast((Round((SELECT "+purchasedQuantity+" * "+price+"), 2, 0)) as decimal(10,2))").as('productTotalPrice').then((response) => {
            cy.get('@productTotalPrice').then(productTotalPrice => {
              cy.log(productTotalPrice)  
            })
        
    })
    }


    calculateRefundProductAmount(productTotal) {
        cy.sqlServer("select cast((Round((SELECT "+productTotal+" / 2 ), 2, 0)) as decimal(10,2))")
        .as('refundProductAmount')
    }


    calculateRefundShippingAmount(expeditedShipping) {
        cy.sqlServer("select cast((Round((SELECT "+expeditedShipping+" / 2 ), 2, 0)) as decimal(10,2))")
        .as('refundShippingAmount')
    }

    calculateRefundAmountRequested(refundProductAmount, refundShippingAmount) {
        cy.sqlServer("select cast((Round((SELECT "+refundProductAmount+" + "+refundShippingAmount+"), 2, 0)) as decimal(10,2))")
      .as('refundAmountRequested')
      }

    calculateQuantityToRefund(purchasedQuantity) {
        cy.sqlServer("select ("+purchasedQuantity+" / 2 ) ")
        .as('quantityToRefund')
    }



}

export const refundQueries = new RefundQueries()



