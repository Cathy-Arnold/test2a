/// <reference types="cypress" />
///<reference types="cypress-iframe" />



import { databaseQueryFunctions } from "../../support/page_objects/database/databaseQueryFunctions"




describe('Create a cart using a Post statement', () => {
  it('Create a cart using a Post Statment, Checkout, Partial Refund', () => {
  
  //get Refund table info
    const refundQuery = ("select * from refund where SellerOrderid = 173797")
    const refundFile = "cypress/fixtures/filesDuringTestRun/databaseExample.json"
    databaseQueryFunctions.queryDBWriteToFile(refundQuery, refundFile)
  
    cy.readFile(refundFile).then((readFile) => {
      //RefundId
      expect(readFile[0]).to.eql(8)
      //SellerOrderId
      expect(readFile[1]).to.eql("173797")
    })
      
 
  const orderNumber = "F417072D-5F1AD4-5BA3D"

  //verifying fees
  const feeQuery = ("Select sof.amt "
      + " from dbo.SellerOrderFee sof  "
      + "Inner Join dbo.SellerOrder so on sof.SellerOrderId = so.SellerOrderId "
      + "Inner Join dbo.FeeType f on sof.FeeTypeId = f.FeeTypeId "
      + "Where so.OrderNumber = '" + orderNumber + "' "
      + "and sof.RateProcessingTypeId = 2 "
      + "Order by f.Name")
    const feeFile = "cypress/fixtures/filesDuringTestRun/feeTablePartialRefundProStoreTcgTaxCC.json"
    databaseQueryFunctions.queryDBWriteToFile(feeQuery, feeFile)

    cy.readFile(feeFile).then((readFile) => {
        expect(readFile[0].[0]).to.eql(1.46)
        expect(readFile[1].[0]).to.eql(1.67)
          })
       
   
 

 
  
    cy.sqlServer("SELECT 2 * 3")
        .as('number')



        cy.get('@number').then(number => {
          //do whatever you want with that variable
        })

      })
})
