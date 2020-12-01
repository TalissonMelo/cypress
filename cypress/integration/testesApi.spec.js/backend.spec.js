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
        cy.request({
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            qs: "Conta testes API",
            body: {
                nome: "Conta alterada via Rest testes API"
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                url: `/contas/${res.body[0].id}`,
                body: {
                    nome: "Conta alterada via Rest testes API"
                }
            }).as('response')
        });
    });

    it.only('Não deve inserir conta com mesmo nome!.', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    });

    it('Deve inserir movimentacao', () => {
    });

    it('Deve obter o saldo', () => {
    });

    it('Deve remover movimentacao', () => {
    })
});