/// <reference types="cypress" />

describe('Testes de API', () => {
    before(() => {
        // cy.login('TA@', '123');

    });

    beforeEach(() => {
        // cy.resetApp();
    })

    it('Login', () => {
        //Metodos de requisições para API
        cy.request({
            method: 'POST',
            url: 'http://barrigarest.wcaquino.me/signin',
            body: {
                email: "TA@",
                redirecionar: false,
                senha: "123"
            }
        }).its('body.token').should('not.be.empty');
    })

    it('Deve inserir uma conta', () => {
    });

    it('Deve alterar uma conta', () => {
    });

    it('Não deve inserir conta com mesmo nome!.', () => {
    });

    it('Deve inserir movimentacao', () => {
    });

    it('Deve obter o saldo', () => {
    });

    it('Deve remover movimentacao', () => {
    })
});