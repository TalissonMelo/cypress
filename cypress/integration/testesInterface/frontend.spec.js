/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildRoute from '../../support/buildRoute'

describe('Testes Interface', () => {

    after(() => {
        cy.clearLocalStorage();
    })


    beforeEach(() => {
        buildRoute()
        cy.login('USU@', '123');
    });

    it('Deve inserir uma conta', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: { id: 3, nome: "Conta Teste Cypress", visivel: true, usuario_id: 1 }
        }).as('SalvarConta')

        cy.acessarMenuConta();

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{ id: 1, nome: "Conta falsa movimentação", visivel: true, usuario_id: 1 },
            { id: 2, nome: "Conta falsa", visivel: true, usuario_id: 1 },
            { id: 3, nome: "Conta Teste Cypress", visivel: true, usuario_id: 1 }]
        }).as('ListarContasSalvas');

        cy.inserirConta('Conta Teste Cypress');
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('Deve alterar uma conta', () => {

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{ id: 1, nome: "Conta falsa movimentação", visivel: true, usuario_id: 1 },
            { id: 2, nome: "Conta falsa", visivel: true, usuario_id: 1 },
            { id: 3, nome: "Conta Teste Cypress", visivel: true, usuario_id: 1 }]
        }).as('ListarContasSalvas');

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: { id: 3, nome: "Conta Alterada com sucesso", visivel: true, usuario_id: 1 }
        }).as('SalvarConta')

        cy.acessarMenuConta();
        cy.xpath(loc.CONTAS.XP_BTN_EDT).click();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada com sucesso');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    });

    it('Não deve inserir conta com mesmo nome!.', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response: { error: "Já existe uma conta com esse nome!" },
            status: 400
        }).as('SalvarContaMesmoNome');

        cy.acessarMenuConta();
        cy.get(loc.CONTAS.NOME).type('Conta falsa movimentação');
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    });

    it('Deve inserir movimentacao', () => {

        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: { "id": 311145, "descricao": "Movimentação Falsa", "envolvido": "Interessado Falso", "observacao": null, "tipo": "REC", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "23.00", "status": true, "conta_id": 341198, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null }
        }).as('SalvarMovimentação');

        cy.get(loc.MENU.MOVIMENTACAO).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('1.99');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter');
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta falsa')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click();
        cy.get(loc.MESSAGE).should('contain', 'sucesso');

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7);

    });

    it('Deve obter o saldo', () => {

        cy.route({
            method: 'GET',
            url: '/transacoes',
            response: {
                "conta": "Conta para extrato",
                "id": 311151,
                "descricao": "Movimentacao para extrato",
                "envolvido": "FFF",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2020-12-06T03:00:00.000Z",
                "data_pagamento": "2020-12-06T03:00:00.000Z",
                "valor": "-220.00",
                "status": true,
                "conta_id": 342189,
                "usuario_id": 12501,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.get(loc.MENU.HOME).click()
    });

    it('Deve remover movimentacao', () => {

        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('Del')

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_EMENTO('Desc')).click();
    })
});