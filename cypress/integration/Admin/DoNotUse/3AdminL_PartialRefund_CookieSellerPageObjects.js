/// <reference types="cypress" />

import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/partialRefund"
import { VerifyPartialRefund } from "../../support/page_objects/admin/partialRefund"
import { admin } from "../../support/page_objects/admin/adminFunctions"




describe('Login Headless Authorization By Creating Cookie_Not using any Post at this time. Processing a partial refund.', () => {

  //var data = require('../../fixtures/Admin')

  it('Access the PartialRefundPage Start to verify the Refund Origin Dropdown', () => {
    admin.setSellerAuthCookie()
    admin.visitPartialRefundPage()
    admin.verifySellerLogin()
    PartialRefundPage.enterPartialRefundDetails()
    PartialRefundPage.clickPartialRefundButton()
    VerifyPartialRefund.verifyPartialRefundNote()
    VerifyPartialRefund.verifyPartialRefundButton()


  
  })
})



