export class DatabaseQueryFunctions {


    queryDBWriteToFile(query, fileName) {
        cy.sqlServer(query).then((response) => {
            cy.writeFile(fileName, response)
        })
    }

    queryDBSingleResult(query) {
        cy.sqlServer(query).then((response) => {
            const result = (response)
        })
    }



}

export const databaseQueryFunctions = new DatabaseQueryFunctions()