/// <reference types="cypress" />

describe('Trabalhando com elementos', () => {
    it('Textos', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')

        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

    });

    it.only('Links ou Botões', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text' , 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text' , 'Voltou!')
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text' , 'Voltou!');

    })
})