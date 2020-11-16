/// <reference types="cypress" />

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = { nome: 'Talisson', idade: 25 }
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property', 'nome');

        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        // cy.get('#formNome').then($el => {
        //    // $el.val('Funciona Jquery')
        //    cy.wrap($el).type('Funciona Cypress');
        // });

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500);
        });

        cy.get('#buttonSimple').then(() => console.log('Encontrei primeiro botão!.'));
        //promise.then(num => console.log(num));  //promise apenas com then ou should
        cy.wrap(promise).then(ret => console.log(ret));
        cy.get('#buttonList').then(() => console.log('Encontrei segundo botão!.'));

        cy.wrap(1).then(num => {
            return 2;
        }).should('be.equal', 2);

        //Erro devido should sempre ignorar o retorno
        // cy.wrap(1).should(num => {
        //     return 2;
        // }).should('be.equal', 2);
    });
})