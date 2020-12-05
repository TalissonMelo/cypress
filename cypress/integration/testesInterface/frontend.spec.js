/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes Funcionais', () => {

    after(() => {
        cy.clearLocalStorage();
    })


    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {id: 1000, nome: 'Usuário Falso', token: 'Uma string muito grande que não pode ser aceita, entretanto vai ser aceita' }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{ conta_id: 8999, conta: "Conta falsa movimentação", saldo: 1000 },
            { conta_id: 90000, conta: "Conta falsa", saldo: 1}]
        }).as('saldo')
        cy.login('USU@', '123');
    });

    it.only('Deve inserir uma conta', () => {

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{ id: 1, nome: "Conta falsa movimentação", visivel: true, usuario_id: 1 },
            { id: 2, nome: "Conta falsa", visivel: true, usuario_id: 1 }]
        }).as('contas');

        cy.route({
            method: 'POST',
            url: '/contas',
            response: { id: 3, nome: "Conta Teste Cypress", visivel: true, usuario_id: 1}
        }).as('SalvarConta')

        cy.acessarMenuConta();

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{id: 1,nome: "Conta falsa movimentação", visivel: true, usuario_id: 1 },
            {id: 2, nome: "Conta falsa", visivel: true, usuario_id: 1 },
            { id: 3, nome: "Conta Teste Cypress",  visivel: true,  usuario_id: 1}]
        }).as('ListarContasSalvas');

        cy.inserirConta('Conta Teste Cypress');
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it.only('Deve alterar uma conta', () => {
        
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{id: 1,nome: "Conta falsa movimentação", visivel: true, usuario_id: 1 },
            {id: 2, nome: "Conta falsa", visivel: true, usuario_id: 1 },
            { id: 3, nome: "Conta Teste Cypress",  visivel: true,  usuario_id: 1}]
        }).as('ListarContasSalvas');

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: { id: 3, nome: "Conta Alterada com sucesso", visivel: true, usuario_id: 1}
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