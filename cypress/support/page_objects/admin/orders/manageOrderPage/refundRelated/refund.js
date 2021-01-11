

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

    uIChecksAfterPartialRefund(totalRefundAmountRequested, categoryName, setName, productName, conditionName, refundShippingAmount, orderNumber, refundProductAmount, remainingInventory, quantityAfterRefund) {
        expect(remainingInventory).to.eql(quantityAfterRefund)
        cy.get(':nth-child(9) > .widget > .title > h6').contains('Refunds')
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(1)').contains('Date')
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(2)').contains('Type')
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(2)').contains('Partial')
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(3)').contains('Amount')
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(3)').contains(totalRefundAmountRequested)
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(4)').contains('Refund Origin')
        cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(4)').contains('Buyer Initiated')
        cy.get(':nth-child(1) > tr > :nth-child(5)').contains('Refund Reason')
        cy.get('.gradeA > :nth-child(5)').contains('Product - Inventory Issue')
        cy.get(':nth-child(1) > tr > :nth-child(6)').contains('Detail')
        cy.get(':nth-child(6) > table > thead > tr > :nth-child(1)').contains('ID')
        //placeholder for produict ID for MP refunds (Need to add actual code)
        cy.get(':nth-child(6) > table > tbody > tr > :nth-child(2)').contains(categoryName + " - " + setName + " - " + productName + " - " + conditionName)
        cy.get(':nth-child(6) > div > span').contains("Refunded Shipping Cost: $" + refundShippingAmount)
        cy.get(':nth-child(6) > :nth-child(3)').contains("Refund Reason: Automation Test: Refund " + orderNumber)
        cy.get('.refundedQuantityHeader').contains('Refunded Qty')
        cy.get('tr > :nth-child(3) > span').contains('0')
        cy.get(':nth-child(6) > table > thead > tr > :nth-child(4)').contains('Refunded Amount')
        cy.get(':nth-child(6) > table > tbody > tr > :nth-child(4)').contains("$" + refundProductAmount)
    }

}
export const verifyPartialRefundItems = new VerifyPartialRefundItems()