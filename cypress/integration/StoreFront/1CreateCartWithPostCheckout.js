/// <reference types="cypress" />


describe('Create a cart using a Post statement and checkout', () => {

  it('Create a cart using a Post Statment', () => {
    cy.server()
    cy.request({
      method: 'POST',
      url: (Cypress.env("createCartUrl")),
      headers: { 'Authorization': 'bearer ' + (Cypress.env("bearerToken")) },
      //body: 'fixture:createCartPartialRefund.json'   //does not work like it does in section 5 lesson 27 ts: 3:33
      body:
      {
        "skuId": "3238310",
        "quantity": 1,
        "channelId": 1,
        "user": "storefrontlogin6@auto.com"
      }
    }).then(response => {
      expect(response.status).to.equal(200)
      cy.get(response)
      cy.get(response.body.results)
      cy.get(response.body.results[0]) 
      expect(response.body.results[0].cartKey).to.equal("6573d4d1289743178d251d1a530a56af")
      // cy.get(response.body.results[0].cartKey)    //How do I get this value?  I need to use it in the URL so I can get to the cart URL.
      // const cartKey = cy.get(response.body.results[0].cartKey)
      // cy.log(cartKey)
      
      //cy.writeFile('cypress/fixtures/cartKey.json', response.body.results[0].cartKey)
          
      
      cy.writeFile('cypress/fixtures/cartKey.json', response.body.results[0])
      const cartKey = cy.readFile('cypress/fixtures/cartKey.json').its('cartKey').should('eq',"6573d4d1289743178d251d1a530a56af")
      cy.log(cartKey)
      cy.visit('https://cart.tcgplayer-stg.com/shoppingcart?sf=F417072D&ck='+cartKey)
    })

    
   
  })

})

//Tried the folloing at different points.


// cy.get(response.body.results[0].cartKey).then(($cartKey) => {
//   const cartKey = $cartKey.text()
//   })
//   cy.log(cartKey)

      //cy.get(response.body.results[0].cartKey).should(($cartKey) => {
      //  const cartKey = $cartKey.text()
      //  })
      //cy.log(cartKey)

     

      //const cartKey = cy.get(response.body.results[0].cartKey)
      // cy.log(cartKey)

      // cy.get(response.body.results[0]).then(response => {
      //   its('response').then(body => {
      //     const cartKey = response
      //   })

      // })

   // const cartKey = cy.get(response.body.results[0].cartKey)

    // cy.get(response.body.results[0].cartKey).then(response => {
    //   const cartKey = response
    //  })
   // cy.log(cartKey)
    //cy.get(response.body.results.yielded)
    //cy.get(response.body.results.[0].cartKey)

    // }).then(response => {
    //   its('response').then( body => {
    //     const cartKey = body.results.cartKey
    //    })

    //cy.log(cartKey)
    // cy.setCookie("TcgStorefrontsCartKey", cartKey)
    // cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueAdmin"), { httpOnly: true })
    // cy.visit('https://cart.tcgplayer-stg.com/shoppingcart?sf=F417072D&ck=' + cartKey)



