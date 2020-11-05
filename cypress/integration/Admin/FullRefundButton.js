/// <reference types="cypress" />

describe('Refund Partial', () => {
    //var data=require('../../../fixtures/Admin')
    it('Opens the Partial Refund Page URL', () => {
      cy.visit('https://store.tcgplayer-stg.com/admin/account/logon?ReturnUrl=%2fadmin')
      cy.xpath('//input[@id="UserName"]').type('admin@auto.com');
      cy.xpath('//input[@id="Password"]').type('P@ssw0rd!');
      cy.xpath('//input[@id="logonButton"]').click();
      cy.wait(5000)
      cy.visit('https://store.tcgplayer-stg.com/admin/orders/manageorder/54E9B97E-8B7BC6-25016')
      cy.wait(5000)
      cy.xpath('/descendant::span[@class="users"][4]').click()//click on Full refund 
      cy.wait(5000)
    })
})