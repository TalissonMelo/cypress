/// <reference types="cypress" />

describe('Testes basicos de uma pagina web', () => {
    it('Visitar a pagina', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        //Verificando o titulo da pagina
        cy.title().should('be.equal', "Campo de Treinamento");

        //Verifica se contem Campo
        cy.title().should('contain', "Campo");

        cy.title()
            .should('contain', "Campo")
            .should('be.equal', "Campo de Treinamento");

        cy.title()
            .should('contain', "Campo")
            .and('contain', 'de')
    });

    it.only('Encontrar e interagir com elemento', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple').click();
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')

    })

});

