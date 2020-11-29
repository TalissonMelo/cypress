/// <reference types="cypress" />

describe('Testes Funcionais', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me');
        cy.get('.input-group > .form-control').type('TA@');
        cy.get(':nth-child(2) > .form-control').type('123');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Deve inserir uma conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]')
            .type('Conta Teste Cypress')
            .should('have.value', 'Conta Teste Cypress');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    })
});