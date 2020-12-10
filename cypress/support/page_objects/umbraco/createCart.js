export class CreateCart {

    createCartVistShoppingCartPage(buyer) {
        cy.server()
        cy.request({
            method: 'POST',
            url: (Cypress.env("createCartUrl")),
            headers: { 'Authorization': 'bearer ' + (Cypress.env("bearerToken")) },
            //body: 'fixture:createCartPartialRefund.json'   //does not work like it does in section 5 lesson 27 ts: 3:33
            body:
            {
                "skuId": (Cypress.env("partialRefundSkuId")),
                "quantity": 1,
                "channelId": 1,
                "user": Cypress.env(buyer)
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            cy.get(response)
            cy.get(response.body.results)
            cy.get(response.body.results[0])
            const cartKey = (response.body.results[0].cartKey)
            cy.log(cartKey)
            cy.visit('https://cart.tcgplayer-'+Cypress.env("env")+'.com/shoppingcart?sf='+Cypress.env("sellerKey")+'&ck='+cartKey)
        })

    }

}

export const createCart = new CreateCart()