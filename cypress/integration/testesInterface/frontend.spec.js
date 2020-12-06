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
    });

    it('Deve inserir movimentacao', () => {
    });

    it('Deve obter o saldo', () => {
    });

    it('Deve remover movimentacao', () => {
    })
});