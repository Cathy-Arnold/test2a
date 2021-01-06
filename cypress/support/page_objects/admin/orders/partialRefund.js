
export class PartialRefundPageFunctions {

    enterPartialRefundDetails(refundTextValue, quantityToRefundValue, refundProductAmountValue, refundShippingAmountValue) {
        cy.get('#Message').type(refundTextValue)
        cy.get("#refundOrigin").select(['Buyer Initiated']).should('have.value', '2')
        cy.get("#refundReason").select('Product - Inventory Issue').should('have.value', 'Product - Inventory Issue')
        cy.get('#inventoryChanges').select('Adjust Inventory').should('have.value', 'True')
        cy.get('#RefundProducts_0__AddToInventoryQuantity').type(quantityToRefundValue)
        cy.get('[data-val-numericcompare-otherproperty="MaxRefundAmt"]').type(refundProductAmountValue) //replace with a variable
            / cy.get('#ShippingRefundAmt').type(refundShippingAmountValue) //replace with a variable

    }

    clickPartialRefundButton() {
        cy.get('[value="Give Refund"]').click()
    }

}

export const partialRefundPageFunctions = new PartialRefundPageFunctions()



export class VerifyPartialRefundItems {

    verifyPartialRefundNote() {
        cy.get('.nNote-container').then(($systemNote) => {
            const systemNote = $systemNote.text()
            expect(systemNote).to.contain('Partial Refund Processed.')
        })
    }

    verifyPartialRefundButton() {
        cy.get('.widget-content .mUser').eq(1).then(($button) => {     //will be the 2nd button for the seller view
            const button = $button.text().trim()
            expect(button).to.contain('Partial Refund')
        })
    }

}
    export const verifyPartialRefundItems = new VerifyPartialRefundItems()


export class Assert {

    refundTable(readFile, totalRefundAmount, refundedTax, totalRefundAmountRequested, refundShippingAmount, refundText, totalRefundAmountValue) {
    cy.readFile(readFile).then((file) => {
        //OrderStatusId
        expect(file[0]).to.eql(3)
        //SellerOrderStatusId
        expect(file[1]).to.eql(13)
        //RefundTypeId
        expect(file[2]).to.eql(2)
        //RefundStatusId
        expect(file[3]).to.eql(2)
        //totalRefundAmount
        // cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
        //  cy.get('@refundedTax').then(refundedTax => {
        //    refundQueries.calculateTotalRefundAmount(totalRefundAmountRequested, refundedTax)
        //    cy.get('@totalRefundAmount').then(totalRefundAmount => {
        //      cy.log('totalRefundAmount')
              expect(file[4]).to.eql(totalRefundAmount)
    //        })
    //      })
    //    })
        //VendorSalesTaxAmt
        expect(file[5]).to.eql('0.00')
        //refundedTax
        //cy.get('@refundedTax').then(refundedTax => {
          expect(file[6]).to.eql(refundedTax)
       // })
        //RequestedAmt
      // cy.log('totalRefundAmountRequested')
        //cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
          expect(file[7]).to.eql(totalRefundAmountRequested)
       // })
        //refundShippingAmount
       //cy.log('refundShippingAmount')
       // cy.get('@refundShippingAmount').then(refundShippingAmount => {
          expect(file[8]).to.eql(refundShippingAmount)
       // })
        //CancellationReason
       // cy.log('CancellationReason')
        //cy.get('@refundText').then(refundText => {
          expect(file[9]).to.eql(refundText)
       // })
        //  //IsTransactionProcessed
        //expect(file[10]).to.eql('false')
        //TotalAmtAfterStoreCredit
       // cy.get('@totalRefundAmount').then(totalRefundAmount => {
          expect(file[11]).to.eql(totalRefundAmountValue)
        //})
    })
      }
    }


      export const assert = new Assert()








    // verifyPartialRefundSection(categoryName, setName, productName, conditionName,refundShippingAmount,orderNumber, refundProductAmount, quantity, refundProductAmount) {
    //     cy.get(':nth-child(9) > .widget > .title > h6').contains('Refunds')
    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(1)').contains('Date')
    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(2)').contains('Type')
    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(2)').contains('Partial')
    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(3)').contains('Amount')

    //     //cy.get('@refundProductAmount').then(refundProductAmount => {
    //     //cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(3)').contains(refundProductAmount)
    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(3)').contains('62.00')
    //     // })

    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(4)').contains('Refund Origin')
    //     cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(4)').contains('Buyer Initiated')
    //     cy.get(':nth-child(1) > tr > :nth-child(5)').contains('Refund Reason')
    //     cy.get('.gradeA > :nth-child(5)').contains('Product - Inventory Issue')
    //     cy.get(':nth-child(1) > tr > :nth-child(6)').contains('Detail')
    //     cy.get(':nth-child(6) > table > thead > tr > :nth-child(1)').contains('ID')
    //     //placeholder for produict ID for MP refunds (Need to add actual code)
    //     cy.get(':nth-child(6) > table > tbody > tr > :nth-child(2)').contains(categoryName + " - " + setName + " - " + productName + " - " +conditionName)

    //     cy.get('@refundShippingAmount').then(refundShippingAmount => {
    //         cy.get(':nth-child(6) > div > span').contains("Refunded Shipping Cost: $" + refundShippingAmount)
    //         //cy.get(':nth-child(6) > div > span').contains("Refunded Shipping Cost: $3.50")
    //     })

    //     cy.get('@orderNumber').then(orderNumber => {
    //         cy.get(':nth-child(6) > :nth-child(3)').contains("Refund Reason: Automation Test: Refund " + orderNumber)
    //     })

    //     cy.get('.refundedQuantityHeader').contains('Refunded Qty')
    //     cy.get('tr > :nth-child(3) > span').contains('0')

    //     cy.get(':nth-child(6) > table > thead > tr > :nth-child(4)').contains('Refunded Amount')
    //     cy.get('@refundProductAmount').then(refundProductAmount => {
    //         cy.get(':nth-child(6) > :nth-child(3)').contains("$" + refundProductAmount)
    //         //cy.get(':nth-child(6) > table > tbody > tr > :nth-child(4)').contains("$58.50")
    //     })
    //     cy.get('@refundProductAmount').then(refundProductAmount => {
    //         refundQueries.calculateRemainingInventory(productData.quantity, refundProductAmount)
    //         refundQueries.calculateQuantityAfterRefund(Cypress.env("sellerId"), productData.productConditionId)
    //         cy.get('@remainingInventory').then(remainingInventory => {
    //             cy.get('@quantityAfterRefund').then(quantityAfterRefund => {
    //                 expect(remainingInventory.to.eql(quantityAfterRefund))
    //             })
    //         })
    //     })






