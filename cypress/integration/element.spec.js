/// <reference types="cypress" />

describe('Trabalhando com elementos', () => {

    //Executado antes de todos os testes
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    //Executado antes de cada um dos testes
    beforeEach(() => {
        //cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        cy.reload()
    })

    it('Textos', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

    });

    it('Links e Botões', () => {
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');

        //Atualiza a pagina
        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
    })
})