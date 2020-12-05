/// <reference types="cypress" />

import '../../support/commandsContas'

describe('Testes Funcionais', () => {
    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'Usuário Falso',
                token: 'Uma string muito grande que não pode ser aceita, entretanto vai ser aceita'
            }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 8999,
                conta : "Conta falsa movimentação",
                saldo: 1000
            },
            {
                conta_id: 90000,
                conta : "Conta falsa",
                saldo: 1
            }]
        }).as('saldo')
        cy.login('USU@', '123');
    });

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