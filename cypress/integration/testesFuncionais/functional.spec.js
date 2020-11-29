/// <reference types="cypress" />

describe('Testes Funcionais', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me');
        cy.get('.input-group > .form-control').type('TA@');
        cy.get(':nth-child(2) > .form-control').type('123');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('...', () => {
    })
});