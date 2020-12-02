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
        cy.getContaNome('Conta alterada via Rest testes API').then(contaId => {
            cy.request({
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                url: `/contas/${contaId}`,
                body: {
                    nome: "Conta alterada via Rest testes API"
                }
            }).as('response')
        });
    });

    it('Não deve inserir conta com mesmo nome!.', () => {
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

        cy.getContaNome('Conta para movimentações').then(contaId => {
            cy.request({
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                url: '/transacoes',
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "Descrição ",
                    envolvido: "Interessado...",
                    status: true,
                    tipo: "REC",
                    valor: "100",
                },
                failOnStatusCode: false
            }).as('response')
        });

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')

    });

    it.only('Deve obter o saldo', () => {
        cy.request({
            url: '/contas',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(conta => {
                if(conta.conta === 'Conta para saldo'){
                    saldoConta = conta.saldo
                }
            });
        })
    });

    it('Deve remover movimentacao', () => {
    })
});