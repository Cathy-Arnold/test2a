describe('DataBase Testing' , () => {
    it ('Test', () => {
       // cy.sqlServer('SELECT max(CountryCode) FROM dbo.CountryCode')
        //cy.log(Cypress.env("createCartUrl"))


        //cy.sqlServer('select * from dbo.SellerProServicesSettings where SellerId = '+Cypress.env("sellerId"))



        cy.sqlServer('select SellerId,StoreName,StreetAddress,City,[State],Zip from dbo.SellerProServicesSettings where SellerId = '+Cypress.env("sellerId")).then((response) => {
            // const sellerId = (response[0])
            // const storeName = (response[1]) 
            // const streetAddress = (response[2])
            // const city = (response[3])
            // const state = (response[4])
            // const zip = (response[5])
            // cy.log(sellerId)
            // cy.log(storeName)
            // cy.log(streetAddress)
            // cy.log(city)
            // cy.log(state)
            // cy.log(zip)
            
           
             cy.writeFile('cypress/fixtures/filesDuringTestRun/SellerProServicesSettings.json', response)
            // //const stateFile = (response[4])
            // cy.log(stateFile)

          
        
            cy.readFile('cypress/fixtures//filesDuringTestRun/readFile.json').then((readFile) => {
            const stateReadFile = (readFile[4])
            cy.log(stateReadFile)
        })

    })

       //const state = (response.contents[4])
       //const state = (response[4])
      //cy.log(state)

        //expect(Array[0].value).not.to.equal('ZW')  
        //expect('value[0]').not.to.equal('ZW')  




    })
})

// cy.sqlServer('select  SellerId,	StoreName,StreetAddress,City,[State],Zip,EmailAddress,Phone,LogoUrl,IsInitialized,IsPayNowEnabled,IsPayLaterEnabled,AutoRemoveInventoryForPayLater,HideSetsWithoutInventory,HideProductsWithoutInventory,ChannelId from dbo.SellerProServicesSettings where SellerId = '+Cypress.env("sellerId")).then((response) => {
//     SellerId
//     StoreName
//     StreetAddress
//     City
//     State
//     Zip
//     EmailAddress
//     Phone
//     LogoUrlIsInitialized
//     IsPayNowEnabled
//     IsPayLaterEnabled
//     AutoRemoveInventoryForPayLater
//     HideSetsWithoutInventory
//     HideProductsWithoutInventory
//     ChannelId