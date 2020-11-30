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

    it.only('Deve inserir uma conta', () => {
        cy.request({
            method: 'POST',
            url: 'http://barrigarest.wcaquino.me/signin',
            body: {
                email: "TA@",
                redirecionar: false,
                senha: "123"
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
            cy.request({
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                url: 'http://barrigarest.wcaquino.me/contas',
                body: {
                    nome: "Conta testes API"
                }
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta testes API')
        })
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