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

    it.only('Its', () => {
        const obj = { nome: 'Talisson', idade: 25 }
        cy.wrap(obj).should('have.property', 'nome', 'Talisson');
        cy.wrap(obj).its('nome').should('be.equal', 'Talisson');

        const obj2 = { nome: 'Talisson', idade: 25 , endereco: {rua: 'Rua 02' , bairro : 'Ouro Verde'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'bairro', 'Ouro Verde');
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'Rua 02' );

        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        cy.title().its('length').should('be.equal', 20);
    });
})