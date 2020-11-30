/// <reference types="cypress" />

describe('Testes de API', () => {

    let token
    before(() => {
        cy.getToken('TA@', '123').then(tkn => { token = tkn })

    });

    beforeEach(() => {
        cy.resetarBaseDados();
    })

    it('Deve inserir uma conta', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: "Conta testes API"
            }
        }).as('response')

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