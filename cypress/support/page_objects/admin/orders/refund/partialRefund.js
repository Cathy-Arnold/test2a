
export class PartialRefundPageFunctions {

    enterPartialRefundDetails(messageText, quantityToRefundValue, refundProductAmountValue, refundShippingAmountValue) {
        cy.get('#Message').type(messageText)
        cy.get("#refundOrigin").select(['Buyer Initiated']).should('have.value', '2')
        cy.get("#refundReason").select('Product - Inventory Issue').should('have.value', 'Product - Inventory Issue')
        cy.get('#inventoryChanges').select('Adjust Inventory').should('have.value', 'True')
        cy.get('#RefundProducts_0__AddToInventoryQuantity').type(quantityToRefundValue)
        cy.get('[data-val-numericcompare-otherproperty="MaxRefundAmt"]').type(refundProductAmountValue)
        cy.get('#ShippingRefundAmt').type(refundShippingAmountValue)

    }

    clickPartialRefundButton() {
        cy.get('[value="Give Refund"]').click()
    }

}

export const partialRefundPageFunctions = new PartialRefundPageFunctions()





export class Assert {

    verifyRefundTable(readFile, totalRefundAmount, refundedTax, totalRefundAmountRequested, refundShippingAmount, messageText) {
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
            expect(file[4]).to.eql(totalRefundAmount)
            //VendorSalesTaxAmt
            expect(file[5]).to.eql('0.00')
            //refundedTax
            expect(file[6]).to.eql(refundedTax)
            //RequestedAmt
            expect(file[7]).to.eql(totalRefundAmountRequested)
            //refundShippingAmount
            expect(file[8]).to.eql(refundShippingAmount)
            //CancellationReason
            expect(file[9]).to.eql(messageText)
            //IsTransactionProcessed
            //expect(file[10]).to.eql(false)
            //TotalAmtAfterStoreCredit
            expect(file[11]).to.eql(totalRefundAmount)
        })
    }


    verifyFees(readFile, commissionFees, creditCardUSFees, shippingFees) {
        cy.readFile(readFile).then((file) => {
            const cf = parseFloat(commissionFees)
            expect(file[0].[0]).to.eql(cf)

            const ccf = parseFloat(creditCardUSFees)
            expect(file[1].[0]).to.eql(ccf)

            const sf = parseFloat(shippingFees)
            expect(file[2].[0]).to.eql(sf)


        })


    }
}

    export const assert = new Assert()