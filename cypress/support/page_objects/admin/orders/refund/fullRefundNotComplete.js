
export class FullRefundPageFunctions {

    enterFullRefundDetails() {
        cy.get('#Message').type("Automation Test: Cancel OrderNumber")  //Will replace 'OrderNumber' with a variable
        cy.get("#refundOrigin").select(['Buyer Initiated']).should('have.value', '2')
        cy.get("#refundReason").select('Product - Inventory Issue').should('have.value', 'Product - Inventory Issue')
        cy.get('#inventoryChanges').select('Adjust Inventory').should('have.value', 'True')
        //cy.get('#RefundProducts_0__AddToInventoryQuantity').type('1') //replace with a variable
        cy.get('[data-val-numericcompare-otherproperty="MaxRefundAmt"]').type('.01') //replace with a variable
        //cy.get('#ShippingRefundAmt').type('.01') //replace with a variable
        
    }

    clickFullRefundButton() {
        cy.get('[value="Refund Order"]').click()
    }

  
}

export const FullRefundPage = new FullRefundPageFunctions ()



export class VerifyFullRefundItems {

    verifyFullRefundNote() {
        cy.get('.nNote-container').then(($systemNote) => {
        const systemNote = $systemNote.text()
        expect(systemNote).to.contain('Full Refund Processed.')
      })
    }

}

export const VerifyFullRefund = new VerifyFullRefundItems ()