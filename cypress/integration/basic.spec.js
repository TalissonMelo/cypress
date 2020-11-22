/// <reference types="cypress" />

describe('Testes basicos de uma pagina web', () => {
    it.only('Visitar a pagina', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        //cy.pause()

        //Verificando o titulo da pagina
        cy.title().should('be.equal', "Campo de Treinamento");

        //Verifica se contem Campo
        cy.title().should('contain', "Campo"); //.debug();

        cy.title()
            .should('contain', "Campo")
            .should('be.equal', "Campo de Treinamento");

        cy.title()
            .should('contain', "Campo")
            .and('contain', 'de');

        //Imprimir log no console
        cy.title().then(title => {
            console.log(title);
        });

        let syncTitle;

        cy.title().then(title => {
            cy.get('#formNome').type(title);
            syncTitle = title;
        });

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle);
        });

        //Quando tem ( : 2 pontos) colocar duas barras antes dele 
        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    });

    it('Encontrar e interagir com elemento', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple').click();
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')

        //escrevendo em campo de texto 
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    });
});

