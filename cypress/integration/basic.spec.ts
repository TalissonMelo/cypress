/// <reference types="cypress" />

describe('Testes basicos de uma pagina web', () => {
    it('Visitar a pagina', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        //Verificando o titulo da pagina
        // const titulo = cy.title();
        // console.log(titulo);
        cy.title().should('be.equal', "Campo de Treinamento");

        //Verifica se contem Campo
        cy.title().should('contain', "Campo");

        cy.title()
            .should('contain', "Campo")
            .should('be.equal', "Campo de Treinamento");

        cy.title()
            .should('contain', "Campo")
            .and('contain' , 'de')
    });
});