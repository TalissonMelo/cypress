/// <reference types="cypress" />

describe('Entendendo a espera do Cypress', () => {

    //Executado antes de todos os testes
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    it('Deve aguardar elemento disponivel', () => {

        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('not.exist');

        cy.get('#novoCampo')
            .should('exist')

        cy.get('#novoCampo')
            .type('funciona')

    });

    it.only('Deve fazer retrys', () => {

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
        //    .should('not.exist')
            .should('exist')
            .type('funciona')

    })
})
