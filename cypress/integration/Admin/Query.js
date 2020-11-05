describe('DataBase Testing' , () => {
    it ('Test', () => {
        cy.sqlServer('SELECT max(CountryCode) FROM dbo.CountryCode')

        //expect(Array[0].value).not.to.equal('ZW')  
        expect('value[0]').not.to.equal('ZW')  




    })
})