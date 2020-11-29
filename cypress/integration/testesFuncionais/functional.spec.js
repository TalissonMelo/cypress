/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes Funcionais', () => {
    before(() => {
        cy.login('TA@', '123');
        cy.resetApp();
    });

    it('Deve inserir uma conta', () => {
        cy.acessarMenuConta();
        cy.inserirConta('Conta Teste Cypress');
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('Deve alterar uma conta', () => {
        cy.acessarMenuConta();
        cy.xpath(loc.CONTAS.XP_BTN_EDT).click();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada com sucesso');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    });

    it('Não deve inserir conta com mesmo nome!.', () => {
        cy.acessarMenuConta();
        cy.get(loc.CONTAS.NOME).type('Conta Alterada com sucesso');
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    });

    it('Deve inserir movimentacao', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('1.99');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter');
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta Alterada com sucesso')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click();
        cy.get(loc.MESSAGE).should('contain', 'sucesso');

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7);
    });

    it('Deve obter o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta Alterada com sucesso')).should('contain', '1')
    });

    it('Deve remover movimentacao', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_EMENTO('Desc')).click();
        cy.get(loc.MESSAGE).should('contain', 'sucesso');

    })
});