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

    it('Deve fazer retrys', () => {

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            //    .should('not.exist')
            .should('exist')
            .type('funciona')

    })

    it.only('Usar busca', () => {

        cy.get('#buttonList').click();
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1');

        cy.get('#lista li')
            .should('contain', 'Item 2');
    });

    it.only('Usando o Timeout', () => {

        cy.get('#buttonDelay')
            .click();

        cy.get('#novoCampo')
            .should('exist');
    });
})
